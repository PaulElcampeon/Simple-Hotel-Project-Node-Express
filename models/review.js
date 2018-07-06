class Review {
    constructor(rating, text){
        this.rating = rating;
        this.text = text;
        var d = new Date();
        var n = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        this.date = n;
        this.ratingAsStars = this.ratingAsStars();
        //var _n = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        //var _date = n;
        // this.getDate = ()=>{
        //     return _n;
        // }
    }
    
    ratingAsStars(){
        let starString ="";
        for(let i=0; i<this.rating; i++){
            starString+="⭐";
        }
        return starString;
    }

    toJSON(){
        return this;
    }
}

module.exports = Review
