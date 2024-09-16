const express = require("express");
const bodyparses = require("body-parser");
const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=> 
    res.sendFile(_dirname + "/index.html"))


app.listen(3000)