const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const path = require('node:path');
const rollup = require('rollup');

const packages = [
  {
    name: 'test',
    input: 'packages/test/index.ts',
    output: [
      {
        file: 'packages/test/dist/index.js',
        format: 'umd',
        name: 'Test',
      },
    ],
  },
];

async function build() {
  for (const pkg of packages) {
    const config = {
      input: pkg.input,
      plugins: [
        babel({
          presets: ['@babel/preset-env'],
        }),
        typescript({
          tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
          exclude: ['**/__tests__/**', '**/*.test.ts'],
          declaration: true,
          declarationDir: path.dirname(pkg.output[0].file),
        }),
      ],
    };
    const bundle = await rollup.rollup(config);

    for (const output of pkg.output) {
      await bundle.write(output);
    }
  }
}

build();
