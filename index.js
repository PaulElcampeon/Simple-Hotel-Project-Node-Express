const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");




const repl = require("repl").start({

    useColors:true,
    terminal:true
})

repl.context.Hotel = Hotel;
repl.context.Review = Review;
