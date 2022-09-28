const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routers/api/router");


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

app.get("/", (req, res) => {
  res.json({ product: { name: "name" } });
});

app.use('', routes);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log("sever is running port ", PORT);
});
