const chai = require('chai');
const expect = chai.expect;

var Hotel = require('../models/hotel')
var Review = require('../models/review')

var hotel1 = new Hotel("Jimmys belator","Belfast");
var review1 = new Review(10,"very good hotel");
var review2 = new Review(10," good hotel");


describe('Hotel AddReview Function', function() {

    it("adds a reivew to the review list in the hotel object", function(){
        let result = hotel1.addReview(new Review(10,"adfgg"));
        let sizeReviewList = hotel1.reviewList.length;
        expect(result).to.eql(hotel1.reviewList[sizeReviewList-1])
    });

});

describe('Hotel url Function', function() {
    it("creates a url of the name of the hotel and city", function(){
        let result = hotel1.urlSlug();
        let tempName = hotel1.name.split(" ").join("_").toLowerCase();
        let tempCity = hotel1.city.split(" ").join("_").toLowerCase();
        
        expect(result).to.eql(tempName+"_"+tempCity);
    });

});

// describe('toJSON() returns a hotel as a JSON', function() {
//     it("creates a url of the name of the hotel and city", function(){
//         let result = hotel1.toJSON();
//         expect(result).to.eql({"name":hotel1.name,"city":hotel1.city,});
//     });

// });

describe('average rating functions', function() {
    it("calculates the average rating of all the reviews of the hotel", function(){
        hotel1.addReview(review1);
        hotel1.addReview(review2);
        hotel1.calculateRating();
        //at this momemnt the total rating in for reviews is 30 becuase of previous hotel added in func 2 above
        //let result = hotel1.averageRating;
        let result = hotel1.averageRating;

        expect(result).to.equal(10);
    });

});