const chai = require('chai');
const expect = chai.expect;

var HotelCollection = require('../models/hotelCollection');
var Hotel = require('../models/hotel');
var Review = require('../models/review');

let hotelCollection = new HotelCollection();
let hotel1 = new Hotel("Hilton","London");
let hotel2 = new Hotel("Travelodge","Maidstone");
let hotel3 = new Hotel("Premier Inn","Maidstone");

var review1 = new Review(1,"very good hotel");
var review2 = new Review(6," good hotel");
var review3 = new Review(5,"very good hotel");
var review4 = new Review(4," good hotel");
var review5 = new Review(3,"very good hotel");
var review6 = new Review(7," good hotel");



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////TEST HOTEL ADDED TO HOTELCOLLECTION///////////////////////////////////////////////
describe('Tests adding, removing and getting hotels to hotelCollection', function() {
    it("adds two hotels to hotelCollection", function(){
        hotelCollection.add(hotel1);
        hotelCollection.add(hotel2);
        let result = hotelCollection.hotels.length;
        expect(result).to.equal(2);
    });

    it("removes one hotel from hotelCollection", function(){
        hotelCollection.removeHotel("/hotels/"+hotel1.urlSlug);
        let result = hotelCollection.hotels.length;
        expect(result).to.equal(1);
    });

    it("gets a specified hotel from hotelCollection", function(){
        hotelCollection.add(hotel1);
        let result = hotelCollection.getHotelSpecified("/hotels/"+hotel2.urlSlug)[0]
        expect(result).to.equal(hotel2);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////SORTS ALL THE HOTELS IN HOTELCOLLECTION///////////////////////////////////////////////
describe("Test sorting of the hotels based on their average rating",function(){
    it("its sorts hotels out by their average rating",function(){
        hotel1.addReview(review1);
        hotel1.addReview(review2);
        hotel2.addReview(review3);
        hotel2.addReview(review4);
        hotel2.addReview(review6);
        hotel3.addReview(review5);
        hotelCollection.add(hotel3);
        let result = hotelCollection.sortedHotels();
        expect(result).to.eql([hotel2,hotel1,hotel3]);
    })

})