const express = require("express");
const morgan = require("morgan")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { MongoClient } = require("mongodb");
const User = require('./models/user');

require("dotenv").config()

const jwtSecret = process.env.jwtSecret;

const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

let dbName = process.env.dbName;

let url = process.env.mongoDBUrl;

const client = new MongoClient(url);

mongoose.connect(url, {dbName}, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(process.env.port))
  .catch((err) => console.log(err));

  // sjekker cookie token
  function checkAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }

        req.user = decoded;
        next();
    });
}

// sjekker admin
async function checkAdmin(req, res, next) {
    const userEmail = req.user.email;
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.render('error', { errorMessage: "User not found" });
        }
        if (user.role === 'admin') {
            next();
        } else {
            res.render('error', { errorMessage: "Unauthorized access" });
        }
    } catch (error) {
        console.error("Error querying user role:", error);
        res.render('error', { errorMessage: "Internal Server Error" });
    }
}

app.get("/", checkAuth, (req, res) => {
    res.redirect('/main');
});

app.get("/login", (req, res) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (!err) {
                return res.redirect('/main');
            }
        });
    }

    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('register');
});

app.get("/main", checkAuth, (req, res) => {
    res.render('main');
});

app.get("/admin", checkAuth, checkAdmin, (req, res) => {
    res.render('admin');
});

// registrering
app.post("/register", async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        return res.render('error', { errorMessage: "Passwords do not match" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('error', { errorMessage: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, role: "kunde" });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error("Error registering user:", err);
        res.render('error', { errorMessage: "An error occurred while registering the user" });
    }
});

// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('error', { errorMessage: "Invalid email or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.render('error', { errorMessage: "Invalid email or password" });
        }
        const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/main");
    } catch (err) {
        console.error(err);
        res.render('error', { errorMessage: "Internal Server Error" });
    }
});

// logout og sletter http cookie
app.get("/logout", (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/login');
});