const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const path = require('node:path');
const rollup = require('rollup');
const { existsSync, mkdirSync, writeFileSync } = require('node:fs');

const packages = [
  {
    name: 'react',
    input: path.resolve(__dirname, '../../packages/react/index.ts'),
    output: [
      {
        file: path.resolve(__dirname, '../../dist/react/index.js'),
        format: 'umd',
        name: 'react',
      },
    ],
  },
  {
    name: 'jsx-runtime',
    input: path.resolve(__dirname, '../../packages/react/jsx-runtime.ts'),
    output: [
      {
        file: path.resolve(__dirname, '../../dist/react/jsx-runtime.js'),
        format: 'umd',
        name: 'jsx-runtime',
      },
      {
        file: path.resolve(__dirname, '../../dist/react/jsx-dev-runtime.js'),
        format: 'umd',
        name: 'jsx-dev-runtime',
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
        }),
      ],
    };
    const bundle = await rollup.rollup(config);

    for (const output of pkg.output) {
      await bundle.write(output);
    }
  }
  const packageJson = {
    name: 'react',
    version: '1.0.0',
    main: 'index.js',
  };
  const reactDir = path.resolve(__dirname, '../../dist/react');
  if (!existsSync(reactDir)) {
    mkdirSync(reactDir, { recursive: true });
  }
  writeFileSync(path.join(reactDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');
}

build();
