class Hotel {
    constructor(name, city){
        this.name = name;
        this.city = city
        this.reviewList = [];
        this.reviewCount = 0
        this.averageRating = 0;
        this.urlSlug = this.createUrlSlug();
        this.averageRatingAsStars;
    }

    addReview(review){
        let tempReview = review
        this.reviewList.push(tempReview)
        this.reviewCount = this.getReviewCount();
        this.calculateRating();
        this.getAverageRatingAsStars();
        return tempReview;
    }
    
    getReviewCount(){
        return this.reviewList.length;
    }
    
    calculateRating(){
        let sum =0;
        for(let review of this.reviewList){
            sum+=parseInt(review.rating);
        }
        if(sum == 0){
            this.averageRating = 0
        }else{
            this.averageRating = sum/(this.reviewCount)
            console.log(sum);
            console.log(this.averageRating);
            console.log(this.reviewCount);
        }

    }
    
    getAverageRatingAsStars(){
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
