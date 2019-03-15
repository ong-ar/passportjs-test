import * as express from "express";
import * as passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

const app: express.Application = express();

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

passport.use(new FacebookStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: "http://localhost/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile)
  done(null, accessToken);
}
));

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.use(requestTime);

app.get("/", (req: Request, res: express.Response) => {
  console.log(req.requestTime);
  res.send("hello world!");
});

app.listen(8000, () => console.log("example app listening on port 3000!"));
