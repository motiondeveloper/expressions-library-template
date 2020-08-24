<div align="center">

# Expression Library Template 🐱‍👤

![Typescript to Rollup to After Effects](https://user-images.githubusercontent.com/48076776/89993096-8ec47b80-dcc9-11ea-8b37-1ad911f48bb2.png)

![Editor Preview](https://user-images.githubusercontent.com/48076776/90580450-367f0380-e20c-11ea-8ca2-2db0c7ffe754.png)

---

### A template and example repo for writing expressions with TypeScript.

</div>

---

## Why?

> At [Motion Developer](https://motiondeveloper.com) we maintain a lot of expression (`.jsx`) libraries, such as [`eKeys`](https://github.com/motiondeveloper/eKeys), [`eBox`](https://github.com/motiondeveloper/eBox), and [`aeFunctions`](https://github.com/motiondeveloper/aeFunctionsd).
>
> This allows us to:
>
> - Share code between expressions and projects
> - Edit code in powerful editor (such as [VS Code](https://code.visualstudio.com/))
> - [Improve performance](https://helpx.adobe.com/after-effects/using/legacy-and-extend-script-engine.html#syntax-requirements-expression-libraries)
> - Build abstractions for complex tasks

**This repo is a template for creating After Effects expression libraries, that enables you to:**

- Write in [TypeScript](https://www.typescriptlang.org/) (`.ts` files)
- Write syntactically correct JavaScript, allowing:
  - Testing
  - Linting
  - Automatic formatting

## Requirements

To use this template you need to have the following installed on your system:

- [Node](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Hub](https://github.com/github/hub) (recommended)

> This setup works well for our workflow and requirements, but is still in the early stages. It is most likely unnecessary for smaller projects or beginners

## Using the template

1. **Click the `Use this template` button to create a new GitHub repo from this template**

   ![Use this template](https://user-images.githubusercontent.com/48076776/90580934-5fec5f00-e20d-11ea-9331-ef4d321336a5.png)

2. **Clone the new repo to your local machine**

   ![Cloning the repo](https://user-images.githubusercontent.com/48076776/90581625-0a18b680-e20f-11ea-8708-0fa4948961dd.png)

   ```sh
   git clone repoUrl.git
   ```

3. **Install the dependencies**

   ```sh
   cd repoName
   npm install
   ```

4. **Start Rollup**

   Start Rollup in watch mode to automatically refresh your code as you make changes, by running:

   ```sh
   npm run watch
   ```

   _You can run also run a once off build:_ `npm run build`

5. **Edit the `src` file**

   _The `index.ts` contains an example expression setup._

   Any values exported from this file will be included in your library, for example:

   ```js
   export { someValue };
   ```

6. **Import the `dist` file into After Effects**

   Use the compiled output file as you would any other `.jsx` library. Any changes to the `src` files will be live updated, and After Effects will update the result of your expression.

7. **Distribute releases**

   To distribute your output file using Github releases (via [Hub](https://github.com/github/hub)), use the command:

   ```sh
   npm run release
   ```

   > This will open an editor to add the release title and description

   The release version number is the `"version"` in `package.json`.

## After Effects API

> This template uses the [`expression-globals-typescript`](https://github.com/motiondeveloper/expression-globals-typescript) package to provide types for the expressions API.

### Base Objects

To create layers, compositions and properties, you can create objects from the "Base" objects exported from the library. For example:

```ts
import { CompBase, Comp } from 'expression-globals-typescript';
const thisComp: Comp = Object.create(CompBase);
```

`thisComp` will have it's prototype set to `CompBase`, so you can access any composition property and methods.

### Global Functions and Variables

You can import any global functions available in expressions, fully typed, from the same package:

```ts
import { time, linear } from 'expression-globals-typescript';
```

> VS Code should prompt you to auto import these when you reference them.

### After Effects Types

You can import After Effect's specific types such as `Comp`, `Layer`, `Color` and `Vector` from the package to properly type your expressions.

#### _To see all the Types and Base Objects available, see the [`expression-globals-typescript`](https://github.com/motiondeveloper/expression-globals-typescript) source code._

## Configuration

There a couple of files you may wish to change to reflect the content of your project:

- `README.md`
- `rollup.config.js`: The `output.file` name

  _The release script in `package.json` needs to match the output file name._

- `package.json`: `name`, `description`, `repo`, `author`

## How

- [expression-globals-typescript](https://github.com/motiondeveloper/expression-globals-typescript) mocks the After Effects expressions API in typescript, so you can use global functions and objects such as `linear()` and `time`, while also providing expression specific types such as `Layer`.

- [Rollup](https://rollupjs.org/) is a lightweight module bundler that handles outputting the `.jsx` file via the plugins below.

- The Rollup [Typescript plugin](https://www.npmjs.com/package/@rollup/plugin-typescript) runs the TypeScript compiler

- The Rollup plugin [rollup-plugin-ae-jsx](https://www.npmjs.com/package/rollup-plugin-ae-jsx) transforms the JavaScript output into After Effects JSON (`.jsx`) compliant syntax

  _The rollup plugin is still experimental, and updated regularly. It currently doesn't allow for splitting your expression into multiple files_
