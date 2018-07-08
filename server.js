var express = require("express");
var fs = require("fs");//need this whenwe what to read/write from files
var formidable = require('express-formidable');//using for our middleware
var app = new express();
require('events').EventEmitter.prototype._maxListeners = 100;


app.use("/cssFiles", express.static(__dirname + "/files"));//allows me to use the css files in the files folder
app.use("/images", express.static(__dirname + "/assets"));//allows me to use the images in the assets folder
app.use(formidable());

const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");

var hotelCollection = new HotelCollection()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////GET SINGLE REVIEW/////////////////////////////////////////////////////////////////////
app.get(/\/hotels\/.*\/reviews\/\d+/, function(request,response){//waiting for a get request for a single review from a hotel
    respose.send("GOT Single Hotel Review")
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////DELETE SINGLE REVIEW/////////////////////////////////////////////////////////////////////
app.delete(/\/hotels\/.*\/reviews\/\d+/, function(request,response){//waiting for a delete request to delete a single review from a hotel
    respose.send("DELETED Hotel Review")
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////AMEND SINGLE REVIEW/////////////////////////////////////////////////////////////////////
app.patch(/\/hotels\/.*\/reviews\/\d+/, function(request,response){//waiting for a patch request to amend a single review from a hotel
    respose.send("AMENDED Single Hotel Review")
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////ADD A REVIEW////////////////////////////////////////////////////////////////////////
app.post(/\/hotels\/.*\/reviews/, function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
    console.log(request.fields)
    let ratings = request.fields.rating;
    let comment = request.fields.comment;
    let hotelName = request.fields.hotelname;
   
    let reviewHolder = new Review(ratings,comment);//creating a new review passing on the info received in the post

    hotelCollection.hotels = hotelCollection.hotels.filter(function(obj) {//adding review to the correct hotel
        if(obj.name == hotelName){
            console.log("we have a match");
            obj.addReview(reviewHolder)
            console.log(obj)
        }
        return obj;
      });
    
      response.redirect("/")
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////GET REVIEWS OF A HOTEL/////////////////////////////////////////////////////////////////////
app.get(/\/hotels\/.*\/reviews/, function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
    let arrayOfRequest = request.url.split("/");
    let tempUrlSlug = arrayOfRequest[2]
    console.log(tempUrlSlug);
    let tempReviewList = hotelCollection.getReviewsOfHotel(tempUrlSlug)
    console.log(tempReviewList);
    response.send(tempReviewList);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////GET A SINGLE HOTEL/////////////////////////////////////////////////////////////////////
app.get(/(\/hotels\/[a-z, _]+)([^/]{2})/, function(request,response){//waiting for a get request to the end url (/hotels/hotel.urlslug)
    console.log(request.url)
    let tempHotelHolder = hotelCollection.getHotelSpecified(request.url)
    console.log(tempHotelHolder)
    response.send(tempHotelHolder)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////DELETE A HOTEL/////////////////////////////////////////////////////////////////////////
app.delete(/(\/hotels\/[a-z, _]+)([^/]{2})/, function(request,response){//waiting for a delete request to the end url (/hotels/hotel.urlslug)
    console.log(request.url)
    hotelCollection.removeHotel(request.url);
    console.log("I have just removed "+request.url+" from hotel list")
    response.send(hotelCollection.hotels)
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////GET A LIST OF HOTELS/////////////////////////////////////////////////////////////////////
app.get("/hotels", function(request,response){//waiting for a get request to the end url (/hotels) once it gets a request it sends the hotelCollection obj
   console.log("I have given you a list of the hotels")
    response.send(hotelCollection.hotels);
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////HOME PAGE//////////////////////////////////////////////////////////////////////////////
app.get("/", function(request,response){//waiting for a get request to the home page (/) once it receives the request it responds by sending the home page (index.html)
    response.sendFile("index.html", {root: __dirname+"/files"});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////ADD A HOTEL////////////////////////////////////////////////////////////////////////////
app.post("/", function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
    let tempHotel = new Hotel(request.fields.name, request.fields.city);
    hotelCollection.add(tempHotel);
    console.log("I have just added "+tempHotel.name+" to the List of hotels");
    response.redirect("/")
});



app.listen(3000,function(){//our server is listening on port 3000
    console.log("I am listening on port 3000");
});


//  \/hotels\/.*\/reviews\/\d+  regex for  text similar to /hotels/hilton_metropole_london/reviews/2
