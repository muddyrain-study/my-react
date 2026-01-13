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
    packageJson: {
      name: 'react',
      version: '1.0.0',
      main: 'index.js',
    },
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
  {
    name: 'react-dom',
    input: path.resolve(__dirname, '../../packages/react-dom/client.ts'),
    output: [
      {
        file: path.resolve(__dirname, '../../dist/react-dom/client.js'),
        format: 'umd',
        name: 'react-dom',
      },
    ],
    packageJson: {
      name: 'react-dom',
      version: '1.0.0',
      main: 'client.js',
    },
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

    if (pkg.packageJson) {
      const packageDir = path.resolve(__dirname, `../../dist/${pkg.name}`);
      if (!existsSync(packageDir)) {
        mkdirSync(packageDir, { recursive: true });
      }
      writeFileSync(
        path.join(packageDir, 'package.json'),
        JSON.stringify(pkg.packageJson, null, 2),
        'utf-8'
      );
    }
  }
}

build();
