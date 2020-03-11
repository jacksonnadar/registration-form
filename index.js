const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 7080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "adeugdhsvfshjsiwhf0f2f0f25g45h0j5j20"
  })
);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { faculty: false });
});
mongoose.connect(process.env.DATABASE_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

io.on("connection", socket => {
  socket.on("present", name => {
    socket.broadcast.emit("add-present", name);
  });
  socket.on("absent", name => {
    socket.broadcast.emit("add-absent", name);
  });
  // socket.on("disconnect", () => {
  //   const name = users[socket.id];
  //   socket.broadcast.emit("user-disconnected", name);
  //   delete users[socket.id];
  // });
});

app.use("/register", require("./router/register"));

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.on("open", error => console.error("connected to mongodb"));

app.use(logger);
app.use(express.static("public"));
server.listen(PORT, () => console.log("server connected on" + PORT));
