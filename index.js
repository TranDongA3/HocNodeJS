import express from "express";
import cors from "cors";
require("dotenv").config();
import initRoutes from "./src/routes/index";
import { connectDB } from "./connectionDatabase";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = process.env.PORT || 8888;

const listener = app.listen(port, () => {
  console.log("server is on", port);
  connectDB();
});
