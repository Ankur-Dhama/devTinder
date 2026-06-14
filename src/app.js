const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});

app.use((req, res) => {
  res.send("Hello From the server-1");
});
