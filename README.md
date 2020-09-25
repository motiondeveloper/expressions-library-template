<div align="center">

# Expression Library Template 🐱‍👤

![Typescript to Rollup to After Effects](https://user-images.githubusercontent.com/48076776/89993096-8ec47b80-dcc9-11ea-8b37-1ad911f48bb2.png)

![Editor Preview](https://user-images.githubusercontent.com/48076776/90580450-367f0380-e20c-11ea-8ca2-2db0c7ffe754.png)

---

### A template and example repo for writing expressions with TypeScript.

</div>

---

## Why?

At [Motion Developer](https://motiondeveloper.com) we maintain a lot of expression (`.jsx`) libraries, such as [`eKeys`](https://github.com/motiondeveloper/eKeys), [`eBox`](https://github.com/motiondeveloper/eBox), and [`aeFunctions`](https://github.com/motiondeveloper/aeFunctionsd). This allows us to:

- Share code between expressions and projects
- Edit code in powerful editor (such as [VS Code](https://code.visualstudio.com/))
- [Improve performance](https://helpx.adobe.com/after-effects/using/legacy-and-extend-script-engine.html#syntax-requirements-expression-libraries)
- Build abstractions for complex tasks

> For more info on writing expressions in `.jsx` files, see our article:
> [How to write expressions in external jsx files](https://motiondeveloper.com/blog/write-expressions-external-files/)

#### This repo is a template for creating After Effects expression libraries, that enables you to:

- Write in [TypeScript](https://www.typescriptlang.org/) (`.ts` files)
- Split expressions into multiple files, to be bundled at build time
- Write syntactically correct JavaScript, allowing:
  - [Testing](#testing)
  - Linting
  - Automatic formatting

## Requirements

To use this template you need to have the following installed on your system:

- [Node](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [GitHub CLI](https://github.com/cli/cli) (recommended)

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

5. **Edit the `src` files**

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

   This will use the GitHub CLI to create a new tag and release

   The release version number is the `"version"` in `package.json`, and it will attach the `"main"` file to the release.

   > You can add this version to the output file by placing the string `_npmVersion` in your code, which will be replaced with the version number in `package.json` at build time.

## After Effects API

> This template uses the [`expression-globals-typescript`](https://github.com/motiondeveloper/expression-globals-typescript) package to provide types for the expressions API.

### Classes

To create layers, compositions and properties, you can use the classes exported from the library. For example:

```ts
import { Comp, Layer } from 'expression-globals-typescript';
const thisComp = new Comp();
const thisLayer = new Layer();
```

To create properties (such as position or scale), you can use the `Property` class.

```ts
import { Property, Vector } from 'expression-globals-typescript';
const thisProperty = new Property<Vector>([0, 100]);
```

> The `Property` constructor takes a value to set as the property value, and a type (`<>`) to set as the type for the property.

### After Effects Types

You can import After Effect's specific types such as `Color` and `Vector` from the package to properly type your expressions.

#### _To see all the Types and Base Objects available, see the [`expression-globals-typescript`](https://github.com/motiondeveloper/expression-globals-typescript) source code._

## Testing

You can test your expression library code using [Jest](https://jestjs.io/), which comes pre-configured in this template repo.

You write tests in the `index.test.ts` file, importing the code you want to test from `index.ts`, for example:

```ts
import { welcome } from './index';

test('returns correct welcome string', () => {
  expect(welcome('test')).toEqual('Welcome test!');
});
```

And then run the test suite:

```sh
npm run test
```

Which will run Jest in watch mode.

> You can learn more about testing using Jest from the [Jest docs](https://jestjs.io/docs/en/getting-started).

## Configuration

There a couple of files you may wish to change to reflect the content of your project:

- `package.json`:
  - `version`: The current version of the library, which is used for releases and added to `dist` files.
  - `main`: The build output file which will be attached to releases
- `rollup.config.js`:
  - `input`: The source file to be built
  - `typescript()`: Custom typescript compiler options

## How

- [expression-globals-typescript](https://github.com/motiondeveloper/expression-globals-typescript) mocks the After Effects expressions API in typescript, so you can use global functions and objects such as `linear()` and `time`, while also providing expression specific types such as `Layer`.

- [Rollup](https://rollupjs.org/) is a lightweight module bundler that handles outputting the `.jsx` file via the plugins below.

- The Rollup [Typescript plugin](https://www.npmjs.com/package/@rollup/plugin-typescript) runs the TypeScript compiler

- The Rollup plugin [rollup-plugin-ae-jsx](https://www.npmjs.com/package/rollup-plugin-ae-jsx) transforms the JavaScript output into After Effects JSON (`.jsx`) compliant syntax

- Testing via [Jest](https://jestjs.io/), and [ts-jest](https://github.com/kulshekhar/ts-jest)
