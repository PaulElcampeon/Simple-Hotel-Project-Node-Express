var express = require("express");
var fs = require("fs");
var formidable = require('express-formidable');//using for our middleware
var app = new express();

app.use("/cssFiles", express.static(__dirname + "/files"));//allows me to use the css files in the files folder
app.use("/images", express.static(__dirname + "/assets"));//allows me to use the images in the assets folder
app.use(formidable());

const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");

var hotelCollection = new HotelCollection()


app.get("/", function(request,response){//waiting for a get request to the home page (/)
    response.sendFile("index.html", {root: __dirname+"/files"});
});

app.post("/", function(request,response){//waiting for a post request from the end url (/)
    let tempHotel = new Hotel(request.fields.name,request.fields.city);
    hotelCollection.hotels.add(tempHotel);
    //console.log("You have just added "+tempHotel)
    response.sendFile("index.html", {root: __dirname+"/files"});
});

app.get("/hotels", function(request,response){//waiting for a get request to the end url (/hotels) once it gets a request it sends the hotelCollection obj
    response.send(hotelCollection);
})


app.delete(/^\/(hotels)\/(.+)/, function(request,response){
    hotelCollection.hotels = hotelCollection.hotels.filter(function(obj) {
        return obj.urlSlug != request.params[1];
      });
      console.log(hotelCollection.hotels)
      console.log(hotelCollection)
    response.send(hotelCollection)
})

app.get(/^\/(hotels)\/(.+)/, function(request,response){//waiting for a get request to the end url (/hotels)
    for(let hotels of hotelCollection.hotels){
        if(hotels.urlSlug == request.params[1]){
            response.send(hotels)
        }
    }
})



app.listen(3000,function(){//our server is listening on port 3000
    console.log("I am listening on port 3000");
});