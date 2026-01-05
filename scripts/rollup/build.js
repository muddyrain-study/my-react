const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const path = require('path');
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
  for (const package of packages) {
    const config = {
      input: package.input,
      plugins: [
        babel({
          presets: ['@babel/preset-env'],
        }),
        typescript({
          tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
          exclude: ['**/__tests__/**', '**/*.test.ts'],
          declaration: true,
          declarationDir: path.dirname(package.output[0].file),
        }),
      ],
    };
    const bundle = await rollup.rollup(config);

    for (const output of package.output) {
      await bundle.write(output);
    }
  }
}

build();