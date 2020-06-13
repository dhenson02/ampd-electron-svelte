import svelte from 'rollup-plugin-svelte';
import * as ts from 'typescript';
import typescript from 'rollup-plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
// import url from 'postcss-url';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: production
        ? `src/main.js`
        : `src/main.dev.ts`,
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'topaz',
        file: 'public/build/bundle.js'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(!production ? 'development' : 'production'),
        }),

        typescript(),

        postcss({
            'plugins': [
                postcssImport({ 'addModulesDirectories': [ `node_modules` ] }),
                autoprefixer,
                cssnano(),
            ]
        }),
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css: css => {
                css.write('public/build/bundle.css');
            },

            "preprocess": preprocess({
                "babel": {
                    "plugins": [
                        `@babel/plugin-proposal-optional-chaining`,
                    ],
                    "presets": [
                        `@babel/preset-flow`,
                        [
                            '@babel/preset-env',
                            {
                                "loose": true,
                                // No need for babel to resolve modules
                                "modules": false,
                                "targets": {
                                    // ! Very important. Target es6+
                                    "esmodules": true,
                                },
                            },
                        ],
                    ],
                },
                // script: ( { content } ) => {
                //     return ts.transpileModule(content, {
                //         compilerOptions: {
                //
                //         }
                //     })
                // },
                "typescript": {
                    /**
                     * Optionally specify compiler options.
                     * These will be merged with options from the tsconfig if found.
                     */
                    "compilerOptions": {
                        "module": 'es2020',
                        "strict": false,
                    },

                    /**
                     * Type checking can be skipped by setting 'transpileOnly: true'.
                     * This speeds up your build process.
                     */
                    "transpileOnly": true,
                },
            }),
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        json(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}

