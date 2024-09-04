const postsRoutes = require("./posts/routes");

module.exports = (app) => {
  app.use("/posts", postsRoutes);
};
