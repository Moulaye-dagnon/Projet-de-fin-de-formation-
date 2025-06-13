const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const router = require("./routes/userRoutes");

const ProjectRouter = require("./routes/projectRoutes");
const TaskRouter = require("./routes/taskRouter");
const http = require("http");
const { Server } = require("socket.io");

app.use(
  cors({
    origin: "https://gpc-production-2842.up.railway.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://gpc-production-2842.up.railway.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },
});

io.on("connection", (socket) => {
  socket.on("update-role", (updateRoleMessage) => {
    io.emit("update-role", updateRoleMessage);
  });

  socket.on("delete-user", (deleteUser) => {
    io.emit("delete-user", deleteUser);
  });

  socket.on("add-user", (addUser) => {
    io.emit("add-user", addUser);
  });

  socket.on("new-project", (newProject) => {
    io.emit("new-project", newProject);
  });

  socket.on("fetch-notif", (notif) => {
    io.emit("fetch-notif", notif);
  });

  socket.on("new-notif", (notif) => {
    io.emit("new-notif", notif);
  });

  socket.on("disconnect", () => {});
});

app.use("/", router);
app.use("/", ProjectRouter);
app.use("/", TaskRouter);

const path = require('path');

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Serveur sur port ${PORT}`);
});
