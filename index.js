const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
require("dotenv").config();
const PORT = process.env.PORT || 7080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use("/register", require("./router/register"));

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.on("open", error => console.error("connected to mongodb"));

app.use(logger);
app.use(express.static("public"));
app.listen(PORT, () => console.log("server connected on" + PORT));
