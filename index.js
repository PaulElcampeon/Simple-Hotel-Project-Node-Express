const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");


hotel1 = new Hotel("Felix dea","London")
var review1 = new Review(6,"very good hotel")
var review2 = new Review(7,"very good hotel")
var review3 = new Review(9,"very good hotel")

hotel1.addReview(review1);
hotel1.addReview(review2);
hotel1.addReview(review3);
hotel1.calculateRating();

hotel2 = new Hotel("TrANNY","Erith")
var review4 = new Review(4,"very good hotel")
var review5 = new Review(3,"very good hotel")
hotel2.addReview(review4);
hotel2.addReview(review5);
//hotel2.calculateRating();

console.log(hotel1)
console.log(hotel2)

hotelCol = new HotelCollection();
console.log(hotelCol)


hotelCol.add(hotel1);
hotelCol.add(hotel2);
console.log(hotelCol)

hotelCol.sortedHotels();
console.log(hotelCol)




//console.log(review1);
// review1.toJSON();
// console.log(review1.toJSON());



const repl = require("repl").start({

    useColors:true,
    terminal:true
})

repl.context.Hotel = Hotel;
repl.context.Review = Review;
