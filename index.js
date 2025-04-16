const express = require("express");
const app = express();

const db = require("./config/db");
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json());
const cors=require('cors')
app.use(cors());

const adminroutes = require("./routes/apiroutes");
app.use("/api", adminroutes);

const seeder = require("./config/seeder");
seeder.admin();

app.use("/", (req, res) => {
  res.send("Welcome");
});

app.listen(4000, (err) => {
  if (err) console.log("Server error occur!");
  else console.log("Server running at port no. " + 4000);
});
