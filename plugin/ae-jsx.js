import { walk } from 'estree-walker';
import MagicString from 'magic-string';

const whitespace = /\s/;

export default function afterEffectsJsx(options = {}) {
  const exports = [];
  return {
    name: 'after-effects-jsx', // this name will show up in warnings and errors
    generateBundle(options = {}, bundle, isWrite) {
      // format each file
      // to be ae-jsx
      for (const file in bundle) {
        // Get the string code of the file
        let code = bundle[file].code;
        let ast;
        try {
          ast = this.parse(code);
        } catch (err) {
          err.message += ` in ${file}`;
          throw err;
        }
        const magicString = new MagicString(code);

        function remove(start, end) {
          while (whitespace.test(code[start - 1])) start -= 1;
          magicString.remove(start, end);
        }

        function isBlock(node) {
          return (
            node && (node.type === 'BlockStatement' || node.type === 'Program')
          );
        }

        function removeStatement(node) {
          const { parent } = node;

          if (isBlock(parent)) {
            remove(node.start, node.end);
          } else {
            magicString.overwrite(node.start, node.end, '(void 0);');
          }
        }
        console.log(ast);
        // Find exports
        walk(ast, {
          enter(node, parent) {
            Object.defineProperty(node, 'parent', {
              value: parent,
              enumerable: false,
              configurable: true,
            });

            if (
              // is un-named export
              node.type === 'ExportNamedDeclaration' &&
              node.declaration === null
            ) {
              node.specifiers.forEach(specifier =>
                exports.push(specifier.local.name)
              );
              remove(node.start, node.end);
              this.skip();
            }
          },
        });

        // Remove non exported nodes
        // walk(ast, {
        //   enter(node, parent) {
        //     Object.defineProperty(node, 'parent', {
        //       value: parent,
        //       enumerable: false,
        //       configurable: true,
        //     });

        //     // Remove non-exported functions
        //     if (node.type === 'FunctionDeclaration') {
        //       const functionName = node.id.name;
        //       if (!exports.includes(functionName)) {
        //         remove(node.start, node.end);
        //       }
        //       this.skip();
        //       // Remove variables that aren't exported
        //     } else if (node.type === 'VariableDeclaration') {
        //       const variableName = node.declarations.map(
        //         declaration => declaration.id.name
        //       )[0];
        //       if (!exports.includes(variableName)) {
        //         remove(node.start, node.end);
        //         this.skip();
        //       }
        //     }
        //   },
        // });

        // Remove expression and debugger statements
        // walk(ast, {
        //   enter(node, parent) {
        //     Object.defineProperty(node, 'parent', {
        //       value: parent,
        //       enumerable: false,
        //       configurable: true,
        //     });
        //     if (node.type === 'ExpressionStatement') {
        //       removeStatement(node);
        //       this.skip();
        //     } else if (node.type === 'DebuggerStatement') {
        //       removeStatement(node);
        //       this.skip();
        //     }
        //   },
        // });

        // // Change declarations to
        // // object property/methods
        // walk(ast, {
        //   enter(node, parent) {
        //     Object.defineProperty(node, 'parent', {
        //       value: parent,
        //       enumerable: false,
        //       configurable: true,
        //     });

        //     if (
        //       // is un-named export
        //       node.type === 'VariableDeclaration'
        //     ) {
        //       // remove(node.start, node.declarations[0].start);
        //       this.skip();
        //     }
        //   },
        // });
        // Log exports to the terminal
        console.log(`Exported JSX:`, exports);
        code = magicString.toString();
        bundle[file].code = code;
      }
    },
  };
}

function removeBundlerCode(code) {
  return code.replace("'use strict';", '');
}

function wrapExportsInQuotes(exports, code) {
  let newCode = code;
  exports.forEach(name => {
    newCode = newCode
      .replace(`function ${name}`, `"${name}": function`)
      .replace(`const ${name} =`, `"${name}": `)
      .replace(`let ${name} =`, `"${name}": `)
      .replace(`var ${name} =`, `"${name}": `)
      .replace(`}\n"${name}"`, `}\n"${name}"`)
      .replace(`;\n"${name}"`, `,\n"${name}"`);
  });
  return newCode;
}

function separateExportsWithCommas(exports, code) {
  let codeLines = code.split('\n');
  const fixedLines = codeLines.map((line, lineIndex) => {
    let newLine = line;
    exports.forEach((name, exportIndex) => {
      if (line.startsWith(`"${name}"`)) {
        newLine = newLine.replace(
          ';',
          exportIndex === exports.length ? ',' : ''
        );
      }
    });
    if (newLine === '}' && lineIndex !== codeLines.length) {
      newLine = '},';
    }
    return newLine;
  });
  return fixedLines.join('\n');
}

function indentAllLines(code) {
  return code
    .split('\n')
    .map(line => `	${line}`)
    .join('\n');
}

function wrapInBrackets(code) {
  return `{\n	${code.trim()}\n}`;
}

function removeComments(code) {
  return code.replace(/^\/\/.+/gm, '');
}
