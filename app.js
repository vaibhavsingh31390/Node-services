const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views/EmailTemplates"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
const emailRoutes = require("./Routes/emailRoutes");

app.use("/api/v1", emailRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Server is running.",
  });
});

module.exports = app;
