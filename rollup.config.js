import autoprefixer from "autoprefixer";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import string from "rollup-plugin-string";

const esm = {
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false
    }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extensions: [".css"],
      inject: false
    }),
    string({
      include: "**/template.html"
    })
  ],
  input: "lib/side-drawer.ts",
  output: {
    file: "dist/esm/side-drawer.js",
    format: "esm"
  }
};

const esmMin = {
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false
    }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: false,
      extensions: [".css"],
      inject: false,
      minimize: true
    }),
    string({
      include: "**/template.html"
    }),
    terser({
      compress: { ecma: 6 }
    })
  ],
  input: "lib/side-drawer.ts",
  output: {
    file: "dist/esm/side-drawer.min.js",
    format: "esm"
  }
};

const iife = {
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false
    }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extensions: [".css"],
      inject: false
    }),
    string({
      include: "**/template.html"
    })
  ],
  input: "lib/side-drawer.ts",
  output: {
    file: "dist/iife/side-drawer.js",
    format: "iife",
    name: "SideDrawer"
  }
};

const iifeMin = {
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false
    }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: false,
      extensions: [".css"],
      inject: false,
      minimize: true
    }),
    string({
      include: "**/template.html"
    }),
    terser({
      compress: { ecma: 6 }
    })
  ],
  input: "lib/side-drawer.ts",
  output: {
    file: "dist/iife/side-drawer.min.js",
    format: "iife",
    name: "SideDrawer"
  }
};

export default [esm, esmMin, iife, iifeMin];
