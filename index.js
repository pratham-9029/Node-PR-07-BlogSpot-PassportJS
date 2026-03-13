import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/index.js";
import db from "./config/databse.js";
import { envConfig } from "./config/dotenv.js";
import session from "express-session";
import passport from "passport";
import "./middleware/passport.js";

const app = express();
const PORT = envConfig.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server Started");
    console.log("http://localhost:" + PORT);
});