const chai = require('chai');
const expect = chai.expect;

var Review = require('../models/Review')

var review1 = new Review(2,"awesome");


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////TEST REVIEW RATING AS STARS/////////////////////////////////////////////
describe('Tests the rating as stars', function() {
    it("returns a reviews rating as a string of stars (⭐)", function(){
        let result = review1.ratingAsStars
        expect(result).to.equal("⭐⭐");
    });

});



// describe('Review toJSON Function', function() {
//     it("toJSON returns a review as a JSON", function(){
//         let result = review1.toJSON();
//         expect(result).to.equal({"rating":review1.rating, "text":review1.text, "date":review1.date, "ratingAsStars": review1.ratingAsStars});
//     });

// });
