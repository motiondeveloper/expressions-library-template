<div align="center">

# Expression Library Template 🐱‍👤

![Typescript to Rollup to After Effects](https://user-images.githubusercontent.com/48076776/89993096-8ec47b80-dcc9-11ea-8b37-1ad911f48bb2.png)

---

### A template and example repo for writing expressions with TypeScript.

</div>

---

## Why?

> At [Motion Developer](https://motiondeveloper.com) we manage a lot of expression (`.jsx`) libraries, such as [eKeys](https://github.com/motiondeveloper/eKeys), [eBox](https://github.com/motiondeveloper/eBox), and [aeFunctions](https://github.com/motiondeveloper/aeFunctionsd).
>
> This allows us to:
>
> - Share code between expressions and projects
> - Edit code in powerful editor (such as [VS Code](https://code.visualstudio.com/))
> - [Improve performance](https://helpx.adobe.com/after-effects/using/legacy-and-extend-script-engine.html#syntax-requirements-expression-libraries)
> - Build abstractions for complex tasks

**This repo is a template for creating expression libraries, that enables you to:**

- Write in [TypeScript](https://www.typescriptlang.org/) (`.ts` files)
- Write syntactically correct JavaScript, allowing:
  - Testing
  - Linting
  - Automatically formatting

## Requirements

To use this template you need to have the following installed on your system:

- [Node](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Hub](https://github.com/github/hub) (recommended)

> This setup works well for our workflow and requirements, but is still in the early stages. It is most likely unnecessary for smaller projects or beginners

## Using the template

1. Use the `Use this template` button to create a new repo from this template

2. Clone the repo to your local machine

3. Install the dependencies

   ```sh
   npm install
   ```

4. Start Rollup

   Start Rollup in watch mode to automatically refresh your code as you make changes, by running:

   ```sh
   npm run watch
   ```

   _You can run also run a once off build:_ `npm run build`

5. Edit the `src` file

   _The `index.ts` contains an example expression setup._

   Any values exported from this file will be included in your library, for example:

   ```js
   export { someValue };
   ```

6. Import the `dist` file into After Effects

   Use the compiled output file as you would any other `.jsx` library. Any changes to the `src` files will be live updated, and After Effects will update the result of your expression.

7. Distribute releases

   To distribute your output file using Github releases (via Hub), use the command:

   ```sh
   npm run release -- releaseNum
   ```

   > This will open an editor to add the release title and description

   Where `releaseNum` is the tag version number, e.g. `1.0.0`.

## Configuration

There a couple of files you may wish to change to reflect the content of your project:

- `README.md`
- `rollup.config.js`: The `output.file` name

  _The release script in `package.json` needs to match the output file name._

- `package.json`: `name`, `description`, `repo`, `author`

## How

- [Rollup](https://rollupjs.org/) is a lightweight module bundler that handles the bundling of the files into a single `index.jsx`.

- The Rollup [Typescript plugin](https://www.npmjs.com/package/@rollup/plugin-typescript) runs the TypeScript compiler

- The Rollup plugin [rollup-plugin-ae-jsx](https://www.npmjs.com/package/rollup-plugin-ae-jsx) transforms the JavaScript output into After Effects JSON (`.jsx`) compliant syntax

  _The rollup plugin is still experimental, and updated regularly. It currently doesn't allow for splitting your expression into multiple files_
