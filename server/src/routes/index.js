import authRouter from "./auth";
import categoryRouter from "./category";

const initRoutes = (app) => {
  app.use("/api/user", authRouter);
  app.use("/api/category", categoryRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
