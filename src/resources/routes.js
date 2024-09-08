const postsRoutes = require("./posts/routes");
const usersRoutes = require("./users/routes");
const adsRoutes = require("./ads/routes");

module.exports = (app) => {
  app.use("/posts", postsRoutes);
  app.use("/users", usersRoutes);
  app.use("/ads", adsRoutes);
};
