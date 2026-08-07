import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/movie-poster-card.ts',
  output: {
    file: 'dist/movie-poster-card.js',
    format: 'es',
    sourcemap: dev ? 'inline' : false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    !dev && terser({ format: { comments: false } }),
  ].filter(Boolean),
};
