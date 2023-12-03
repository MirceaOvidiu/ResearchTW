const axios = require("axios");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("console");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const response = await axios.get("http://localhost:5000/");
  log(response.data);
  res.send(response.data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
