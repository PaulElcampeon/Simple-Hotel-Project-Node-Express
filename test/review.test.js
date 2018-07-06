const chai = require('chai');
const expect = chai.expect;

var Review = require('../models/Review')

var review1 = new Review(2,"awesome");

describe('Review toJSON Function', function() {

    it("toJSON returns a review as a JSON", function(){
        
        expect(review1.toJSON()).to.eql({"rating":review1.rating, "text":review1.text, "date":review1.date, "ratingAsStars": review1.ratingAsStars});
    });

});


describe('rating as stars', function() {
    it("returns a reviews rating as a string of stars (⭐)", function(){
        expect(review1.ratingAsStars).to.equal("⭐⭐");
    });

});