const express = require("express");
const app = express();
const db = require("./config/db");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

const adminroutes = require("./routes/apiroutes");
app.use("/api", adminroutes);

app.use("/", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, (err) => {
  if (err) throw console.log("Server error occur!");
  else console.log("Server running at port no. " + 3000);
});
