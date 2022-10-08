const mysql = require("mysql");
const express = require("express");

const app = express();
app.use(express.urlencoded({extended:false}));

app.use("/asset",express.static("asset"));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "user"
});

con.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/register.html");
})

app.post("/postData", function(req,res){
    var sname = req.body.sfname ;
    var fname = req.body.fname;
    var DOB = req.body.DOB ;
    var pnumber = req.body.pnumber;
    var haddress = req.body.haddress ;
    var aadharnum = req.body.aadharnum;
    var mname = req.body.mname ;
    var gen = req.body.gen;
    var mailid = req.body.mailid;

    console.log(2+3)

    con.query("INSERT INTO student_data(full_name,aadhar,father_name,mother_name,date_of_birth,gender,phone_number,email,home_address) values ('"+sname+"','"+aadharnum+"','"+fname+"','"+mname+"','"+DOB+"','"+gen+"','"+pnumber+"','"+mailid+"','"+haddress+"')",function(error,results,fields){
        console.log("Data inserted successfully")
        res.end();
    })
})

app.listen(8080);