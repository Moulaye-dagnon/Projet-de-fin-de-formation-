const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv").config;
const multer = require("multer");
const path = require("path");
const app = express();

const router = require("./routes/userRoutes");

const ProjectRouter = require("./routes/projectRoutes");
const TaskRouter = require("./routes/taskRouter");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },
});

io.on("connection", (socket) => {
  socket.on("update-role", (updateRoleMessage) => {
    io.emit("update-role", updateRoleMessage);
  });

  socket.on("delete-user", deleteUser=>{
    io.emit("delete-user", deleteUser)
  }) 

  socket.on("add-user", addUser=>{
    io.emit("add-user", addUser)
  })

  socket.on("fetch-notif", notif=>{
    io.emit("fetch-notif", notif)
  })

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });
});

app.use("/", router);
app.use("/", ProjectRouter);
app.use("/", TaskRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Serveur sur port ${PORT}`);
});
