class Hotel {
    constructor(name, city){
        this.name = name;
        this.city = city
        this.reviewList = [];
        this.reviewCount = 0
        this.averageRating = 0;
        this.urlSlug = this.createUrlSlug();
        //this.averageRatingAsStars = this.averageRatingAsStars();
    }

    addReview(review){
        let tempReview = review
        this.reviewList.push(tempReview)
        this.calculateRating();
        this.reviewCount = this.getReviewCount();
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
    
    averageRatingAsStars(){
        let starString ="";
        for(let i=0; i<this.averageRating; i++){
            starString+="⭐";
        }
        return starString;
    }
    
    createUrlSlug(){
        let tempName = this.name.split(" ").join("_").toLowerCase();
        let tempCity = this.city.split(" ").join("_").toLowerCase();
        return tempName+"_"+tempCity;
        }


    toJSON(){

        return this
    }
}
module.exports = Hotel
