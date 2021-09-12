import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'


export default [
  {
    input: 'src/js/index.js',
    output: {
      file: 'dist/js/index-bundle.js',
      sourcemap: 'inline',
      format: 'iife'
    },
    plugins: [nodeResolve(), livereload]
  },
  {
    input: 'src/js/app.js',
    output: {
      file: 'dist/js/app-bundle.js',
      sourcemap: 'inline',
      format: 'iife'
    },
    plugins: [nodeResolve(), livereload, serve('dist')]
  }
];