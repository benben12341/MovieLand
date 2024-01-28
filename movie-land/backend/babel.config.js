export default (api) => {
    const isDevelopment = api.env('dev');
  
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
            modules: isDevelopment ? 'commonjs' : false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
          },
        ],
        isDevelopment && '@babel/plugin-transform-modules-commonjs',
      ].filter(Boolean),
    };
  };
  