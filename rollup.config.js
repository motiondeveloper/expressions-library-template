import typescript from '@rollup/plugin-typescript';
import afterEffectJsx from 'rollup-plugin-ae-jsx';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
  },
  plugins: [
    typescript({
      module: 'esnext',
      target: 'esnext',
      noImplicitAny: true,
      moduleResolution: 'node',
      strict: true,
      lib: ['esnext'],
    }),
    afterEffectJsx(),
  ],
};
