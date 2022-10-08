const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/asset",express.static("asset"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "login"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})


app.post("/",encoder, function(req,res){
    var username = req.body.stduniqueid ;
    var password = req.body.password;

    connection.query("select * from login_data where student_id = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/index.html");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

app.get("/index.html",function(req,res){
    res.sendFile(__dirname + "/index.html")
})


app.listen(8888);