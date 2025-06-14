import user from "./user";
import auth from "./auth";
import insert from "./insert"
import bookRouter from "./book"
const initRoutes = (app) => {
  app.use("/api/v1", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/", insert);
  app.use("/api/v1/book", bookRouter);
  return app.use("/", (req, res) => {
    return res.send("server is ok");
  });
};
module.exports = initRoutes;
