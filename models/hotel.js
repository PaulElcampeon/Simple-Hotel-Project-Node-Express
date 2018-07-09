class Hotel {
    constructor(name, city){
        this.name = name;
        this.city = city
        this.reviewList = [];
        this.reviewCount = 0
        this.averageRating = 0;
        this.urlSlug = this.createUrlSlug();
        this.averageRatingAsStars = this.getAverageRatingAsStars();
    }

    addReview(review){
        let tempReview = review
        this.reviewList.push(tempReview)
        this.calculateRating();
        this.reviewCount = this.getReviewCount();
        this.getAverageRatingAsStars();
        return tempReview;
    }
    
    getReviewCount(){
        return this.reviewList.length;
    }
    
    calculateRating(){
        let avgRate=0;
        if(this.reviewList.length > 0){
            for(let i=0; i<this.reviewList.length; i++){
                avgRate += this.reviewList[i].rating;
                }
                avgRate = avgRate/this.reviewList.length;
        }
        this.averageRating = avgRate;
    }
    
    getAverageRatingAsStars(){
        this.calculateRating();
        let starString ="";
        for(let i=0; i<this.averageRating; i++){
            starString+="⭐";
        }
        this.averageRatingAsStars = starString; 
    }
    
    createUrlSlug(){
        let tempName = this.name.split(" ").join("_").toLowerCase();
        let tempCity = this.city.split(" ").join("_").toLowerCase();
        return tempName+"_"+tempCity;
        }


    toJSON(){
        // return JSON.stringify(this)
        return this;
    }
}


module.exports = Hotel
