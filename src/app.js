import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import postRouter from "./routes/posts.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/user", userRoutes,postRouter);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
