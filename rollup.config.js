import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";


const packageJson = require("./package.json");

export default [
  {
    treeshake: false,
    input: "src/index.ts",
    output: [
      {
        // file: packageJson.main,
        dir: 'dist',
        format: "cjs",
        sourcemap: true,
      },  {
        // file: packageJson.module,
        dir: 'dist',
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
      }),
      terser(),
    ],
    external: ["react", "react-dom",],
    onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
  
];