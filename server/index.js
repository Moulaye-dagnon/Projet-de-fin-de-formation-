const express = require("express");

const cors = require("cors")
const dotenv = require("dotenv").config
const multer = require("multer");
const path = require("path");
const app = express();

const router = require("./routes/userRoutes")

const ProjectRouter = require("./routes/projectRoutes");
const TaskRouter = require("./routes/taskRouter");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/",router)







app.use("/", ProjectRouter);
app.use("/", TaskRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur sur port ${PORT}`);
});
