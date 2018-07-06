var express = require("express");
var path = require("path");//alows you to easily deal with retriving paths to files etc
var fs = require("fs");
var app = new express();
const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");




app.get("/", function(request,response){

    //response.send("Welcome to home page from Express")
    response.sendFile("index.html", {root: path.join(__dirname, "./files")});//path.join basically joins paths together
})




app.listen(3000,function(){
    console.log("I am listening on port 3000");
});