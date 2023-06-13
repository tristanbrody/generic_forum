module.exports = {
  devServer: {
    proxy: {
      devServer: {
        proxy: "http://localhost:5173/",
        host: "0.0.0.0",
      },
    },
  },
};
