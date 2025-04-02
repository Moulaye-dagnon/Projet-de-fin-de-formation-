const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config
const router = require("./routes/userRoutes")
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/",router)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Serveur sur port ${PORT}`);
});
