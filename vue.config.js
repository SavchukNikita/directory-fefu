module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
};
