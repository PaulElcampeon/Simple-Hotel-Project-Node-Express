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
}

module.exports = HotelCollection