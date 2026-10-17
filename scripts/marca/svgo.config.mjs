export default {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          collapseGroups: false,
          mergePaths: false,
          moveElemsAttrsToGroup: false,
          moveGroupAttrsToElems: false,
          convertPathData: { floatPrecision: 1 },
        },
      },
    },
  ],
};
