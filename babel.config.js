module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/app/controllers',
        '@entities': './src/app/entities',
        '@middlewares': './src/app/middlewares',
        '@database': './src/database',
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}