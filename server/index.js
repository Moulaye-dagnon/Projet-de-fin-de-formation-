const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config;
const router = require("./routes/userRoutes");
const app = express();

const ProjectRouter = require("./routes/projectRoutes");
const TaskRouter = require("./routes/taskRouter");
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/", ProjectRouter);
app.use("/", TaskRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur sur port ${PORT}`);
});
