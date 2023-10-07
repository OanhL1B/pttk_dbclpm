import authRouter from "./auth";
import categoryRouter from "./category";
import productRouter from "./product";

const initRoutes = (app) => {
  app.use("/api/user", authRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
