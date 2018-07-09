class Review {
    constructor(rating, text){
        this.rating = rating;
        this.text = text;
        var d = new Date();
        var n = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        this.date = n;
        this.ratingAsStars = this.getRatingAsStars();
    }
    
    getRatingAsStars(){
        let starString ="";
        for(let i=0; i<this.rating; i++){
            starString+="⭐";
        }
        return starString;
    }

    toJSON(){
        // return JSON.stringify(this);
        return this;
    }
}

module.exports = Review
