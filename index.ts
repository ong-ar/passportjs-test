import * as express from "express";

const app = express();

interface Request extends express.Request {
  requestTime?: String | Number;
}

const requestTime = (
  req: Request,
  _: express.Response,
  next: express.NextFunction
): void => {
  console.log("logged");
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/", (req: Request, res: express.Response) => {
  console.log(req.requestTime);
  res.send("hello world!");
});

app.listen(3000, () => console.log("example app listening on port 3000!"));
