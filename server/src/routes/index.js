import authRouter from "./auth";
import categoryRouter from "./category";
import productRouter from "./product";
import cartRouter from "./cart";
import orderRouter from "./order";
import reviewRouter from "./review";

const initRoutes = (app) => {
  app.use("/api/user", authRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/review", reviewRouter);

  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
