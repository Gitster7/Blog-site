const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

//set ejs as templating engine
app.set("view engine", "ejs");


//date
var options = {
  month: 'long',
  day: 'numeric'
};
var today = new Date();

var date = today.toLocaleDateString("en-US", options);


//Array to save blogs
var blogArray = [];


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//                                  GET REQUESTS
//handle get request on root route
app.get("/", function(req, res) {


  res.render("index", {
    blogArray: blogArray
  });
});

//handle get request on newBlog route
app.get("/newBlog.ejs", function(req, res) {

  res.render("newBlog", {
    blogArray: blogArray
  });
});

//handel get request on blog content
app.get("/blogContent.ejs", function(req, res) {
  res.render("blogContent", {
    blogArray: blogArray
  });
});

//Express routing parameters for dynamic url
app.get("/:blogTitle", function(req, res) {
  //console.log(req.params.blogTitle);
  const requestedTitle = (req.params.blogTitle).toLowerCase();
  blogArray.forEach((blog) => {
    if (requestedTitle == (blog.blogTitle).toLowerCase()) {
    //  console.log("match found");
    //  console.log(blog.blogTitle);
      res.render("blogContent", {
        title: blog.blogTitle,
        content: blog.blogContent
      });
    }
  });

});


//                                  POST REQUESTS
app.post("/", function(req, res) {

  //Blog Object
  const blog = {
    addBlog: true,
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
    blogGenre: req.body.blogGenre,
    date: date
  };

  blogArray.push(blog);

  res.redirect("/");
});



//start listening on port 3000 for requests
app.listen(3000, function() {
  console.log("server started on port 3000");
});
