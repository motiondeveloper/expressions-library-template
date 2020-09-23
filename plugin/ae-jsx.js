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

        // Find exports by looking for expressions
        // that are exports.[exportName] = [exportName];
        walk(ast, {
          enter(node, parent) {
            Object.defineProperty(node, 'parent', {
              value: parent,
              enumerable: false,
              configurable: true,
            });

            if (
              // it's an export expression statement
              node.type === 'ExpressionStatement' &&
              node.expression.type === 'AssignmentExpression'
            ) {
              if (node.expression.left.object.name === 'exports') {
                exports.push(node.expression.right.name);
              }
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

        //     if (node.type === 'FunctionDeclaration') {
        //       const functionName = node.id.name;
        //       if (!exports.includes(functionName)) {
        //         // Remove non-exported functions
        //         remove(node.start, node.end);
        //       } else {
        //         console.log(node);
        //         magicString.remove(node.start, node.id.start);
        //         magicString.prependRight(node.end, ',');
        //       }
        //       this.skip();
        //     } else if (node.type === 'VariableDeclaration') {
        //       const variableName = node.declarations.map(
        //         declaration => declaration.id.name
        //       )[0];
        //       if (!exports.includes(variableName)) {
        //         // Remove variables that aren't exported
        //         remove(node.start, node.end);
        //       } else {
        //         const valueStart = node.declarations[0].init.start;
        //         const variableName = node.declarations[0].id.name;
        //         magicString.overwrite(
        //           node.start,
        //           valueStart - 1,
        //           `${variableName}:`
        //         );
        //         const endsInSemiColon =
        //           magicString.slice(node.end - 1, node.end) === ';';
        //         if (endsInSemiColon) {
        //           magicString.overwrite(node.end - 1, node.end, ',');
        //         } else {
        //           magicString.prependRight(node.end, ',');
        //         }
        //       }
        //       this.skip();
        //     } else if (node.type === 'ExpressionStatement') {
        //       removeStatement(node);
        //       this.skip();
        //     } else if (node.type === 'DebuggerStatement') {
        //       removeStatement(node);
        //       this.skip();
        //     }
        //   },
        // });
        // // Log exports to the terminal
        // console.log(`Exported JSX:`, exports);
        // // Wrap in braces
        // magicString
        //   .trim()
        //   .indent()
        //   .prepend('{\n')
        //   .append('\n}');
        bundle[file].code = magicString.toString();
      }
    },
  };
}
