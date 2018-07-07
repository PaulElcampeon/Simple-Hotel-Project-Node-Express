var express = require("express");
var fs = require("fs");//need this whenwe what to read/write from files
var formidable = require('express-formidable');//using for our middleware
var app = new express();

app.use("/cssFiles", express.static(__dirname + "/files"));//allows me to use the css files in the files folder
app.use("/images", express.static(__dirname + "/assets"));//allows me to use the images in the assets folder
app.use(formidable());

const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");

var hotelCollection = new HotelCollection()


app.get("/", function(request,response){//waiting for a get request to the home page (/) once it receives the request it responds by sending the home page (index.html)
    response.sendFile("index.html", {root: __dirname+"/files"});
});

app.post("/", function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
    let tempHotel = new Hotel(request.fields.name,request.fields.city);
    hotelCollection.add(tempHotel);
    response.sendFile("index.html", {root: __dirname+"/files"});
});

app.get("/hotels", function(request,response){//waiting for a get request to the end url (/hotels) once it gets a request it sends the hotelCollection obj
    response.send(hotelCollection);
})



app.get(/^\/(hotels)\/(.+)/, function(request,response){//waiting for a get request to the end url (/hotels/hotel.urlslug)
    for(let hotels of hotelCollection.hotels){//once it receives the request it returns that particular hotel
        if(hotels.urlSlug == request.params[1]){
            response.send(hotels)
        }
    }
})

app.delete(/^\/(hotels)\/(.+)/, function(request,response){//waiting for a delete request to the end url (/hotels/hotel.urlslug)
    hotelCollection.hotels = hotelCollection.hotels.filter(function(obj) {//once it receives the request it assigns the hotel list in the hotelCollections obj to a new list without the specified hotel
        return obj.urlSlug != request.params[1];
      });
    response.send(hotelCollection)
})

app.listen(3000,function(){//our server is listening on port 3000
    console.log("I am listening on port 3000");
});