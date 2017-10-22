// APP CONFIG  
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // must go AFTER bodyParser
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG  
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/reserve/NnDHkyxLTFe7d5UZv9Bk_louvre.jpg?dpr=1&auto=compress,format&fit=crop&w=1199&h=810&q=80&cs=tinysrgb&crop=",
//     body: "This here is my test body for the blog"
// })

// RESTFUL ROUTES

// INDEX
app.get("/", function(req, res){
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
           console.log("ERROR!")
        } else {
            res.render("index", {blogs: blogs});
           
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res){
   res.render("new") ;
});

// CREATE
app.post("/blogs", function(req, res){
    // create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("===================");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("error in create");
           res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
    // then, redirect
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", function(req,res){
    console.log("in edit");
    Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("edit", {blog: foundBlog});
      }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //res.send("testing update");
    Blog.findByIdAndUpdate(
                req.params.id, 
                req.body.blog, 
                function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
    });
});

// DESTROY
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log("DESTROY FAILED");
           res.redirect("/blogs");
       } else {
           console.log("DESTROY SUCCESSFUL");
           res.redirect("/blogs");
       }
       
   }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("RESTFUL BLOG SERVER IS RUNNING");
})