class HotelCollection{
    constructor(){
        this.hotels =[];

    }

    add(hotel){
        this.hotels.push(hotel)

    }

    sortedHotels(){
        this.hotels.sort((a,b)=>{
            return b.averageRating - a.averageRating
        });
        return this.hotels;
    }

    removeHotel(hotelUrl){
        this.hotels = this.hotels.filter(function(obj) {//once it receives the request it assigns the hotel list in the hotelCollections obj to a new list without the specified hotel
            return "/hotels/"+obj.urlSlug != hotelUrl;
          });
    }

    getHotelSpecified(hotelUrl){//we are getting a single hotel returning it as an array with one object within it being the hotel, this is because the addHotelsToPage function takes an array
        let tempHotelHolder;
        tempHotelHolder = this.hotels.filter(function(obj) {//once it receives the request it assigns the hotel list in the hotelCollections obj to a new list without the specified hotel
            // return "/hotels/"+obj.urlSlug == hotelUrl;
            return obj.urlSlug == hotelUrl;

          });

          return tempHotelHolder
    }

    getReviewsOfHotel(hotelurlslug){
        for(let hotel of this.hotels){
            if(hotel.urlSlug == hotelurlslug){
                return hotel.reviewList
            }
        }
    }
}

module.exports = HotelCollection