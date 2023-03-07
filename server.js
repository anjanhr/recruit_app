// For Prod

const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./config/routes");
const cors = require("cors");
const path = require("path");
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log("server is runnig on port 3000");
  console.log(`Open browser and hit url 'localhost:${port}' for the react app`);
});

// For dev

// const express = require("express");
// const app = express();
// require("dotenv").config();
// const router = require("./config/routes");
// const cors = require("cors");
// const path = require("path");
// // const port = process.env.port || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(router);
// // app.use(express.static(path.join(__dirname, "./client/build")));

// // app.get("*", function (req, res) {
// //   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// // });

// app.listen(3000, () => {
//   console.log("server is runnig on port 3000");
//   // console.log(`Open browser and hit url 'localhost:${port}' for the react app`);
// });
