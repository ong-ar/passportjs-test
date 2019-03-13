import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.send("hello world!");
});

app.listen(3000, () => console.log("example app listening on port 3000!"));
