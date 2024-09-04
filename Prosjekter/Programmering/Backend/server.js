const express = require("express");

const morgan = require("morgan")

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const { MongoClient } = require("mongodb");

const Blog = require('./models/blog');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "userDatabase";

mongoose.connect(url, {dbName}, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users");

  // the following code examples can be pasted here...

  return "done.";
}

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get("/", (req, res) => {
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
  .then((result) => {
    res.redirect('/blogs');
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err => {
      console.log(err);
    });
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => {
      console.log(err)
    })
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
