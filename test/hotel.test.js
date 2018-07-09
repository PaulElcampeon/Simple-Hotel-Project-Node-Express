const chai = require('chai');
const expect = chai.expect;

var Hotel = require('../models/hotel')
var Review = require('../models/review')

var hotel1 = new Hotel("Jimmys belator","Belfast");
var review1 = new Review(10,"very good hotel");
var review2 = new Review(10," good hotel");



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////TEST ADD REVIEW TO HOTEL AND REVIEW COUNT//////////////////////////////////////
describe('Hotel AddReview Function and test review count', function() {
    it("adds a reivew to the review list in the hotel object", function(){
        let result = hotel1.addReview(new Review(10,"adfgg"));
        let sizeReviewList = hotel1.reviewList.length;
        expect(result).to.eql(hotel1.reviewList[sizeReviewList-1]);
    });
    
    it("tests the review count is added", function(){
        let revCount = hotel1.reviewCount;
        expect(revCount).to.equal(1);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////TEST HOTEL URLSLUG////////////////////////////////////////////////
describe('Hotel url Function', function() {
    it("creates a url of the name of the hotel and city", function(){
        let result = hotel1.urlSlug;
        let tempName = hotel1.name.split(" ").join("_").toLowerCase();
        let tempCity = hotel1.city.split(" ").join("_").toLowerCase();
        expect(result).to.eql(tempName+"_"+tempCity);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////TEST HOTEL AVERAGE RATING FUNCTION//////////////////////////////////////
describe('Rating Functions', function() {
    it("calculates the average rating of all the reviews of the hotel and also the average rating as stars", function(){
        hotel1.addReview(review1);
        hotel1.addReview(review2);
        //at this momemnt the total rating in for reviews is 30 because of previous hotel added in func 2 above
        let result = hotel1.averageRating;
        expect(result).to.equal(10);
    });
   
    it("calculates the average rating as stars", function(){
        let resultStars = hotel1.averageRatingAsStars;
        expect(resultStars).to.eql("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
    });
});


// describe('toJSON() returns a hotel as a JSON', function() {
//     it("creates a url of the name of the hotel and city", function(){
//         let result = hotel1.toJSON();
//         expect(result).to.eql({"name":hotel1.name,"city":hotel1.city, "reviewList":[], "reviewCount":0 , "averageRating":0, "urlSlug":hotel1.urlSlug,"averageRatingAsStars":hotel1.averageRatingAsStars});
//     });

// });