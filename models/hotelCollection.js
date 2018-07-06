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
}

module.exports = HotelCollection