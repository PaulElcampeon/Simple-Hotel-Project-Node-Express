const chai = require('chai');
const expect = chai.expect;

var HotelCollection = require('../models/hotelCollection');
var Hotel = require('../models/hotel');

let hotelCollection = new HotelCollection();
let hotel1 = new Hotel("Hilton","London");
let hotel2 = new Hotel("Travelodge","Maidstone");



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        let result = hotelCollection.getHotelSpecified(hotel2.urlSlug)[0]
        expect(result).to.equal(hotel2);
    });
});