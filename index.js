const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/routers/router");
const moment = require("moment");

const app = express();

dotenv.config();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

const DB_URL = process.env.DATABASE_MONGO ? process.env.DATABASE_MONGO : "";
mongoose.connect(DB_URL).then(() => {
  console.log("DB Connected");
});
mongoose.connection.on("error", (err) => {
  console.log(`DB Connected error: ${err.message}`);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running port ", PORT);
});
