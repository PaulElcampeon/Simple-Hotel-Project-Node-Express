
document.getElementById("reviewFormDiv").style.display="none";

document.getElementById("btn1").addEventListener("click",()=>{//getting a list of all the hotels
    getHotels("/hotels");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////GETTING LIST OF HOTEL DATA//////////////////////////////////////////////////////////////////
function getHotels(url){
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json){
            // console.log("getting hotels, this is what we recieved back"+json)
            addHotelsToPage(json);
    });
})
    .catch(function (err) {console.error(err)});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////DYNAMICALLY ADDING HOTELS TO PAGE////////////////////////////////////////////////////////////
function addHotelsToPage (data) {
    document.getElementById("hotel-container").innerHTML="";//emptying the div we will be putting our data in
    document.getElementById("reviewList").style.display="none"//hiding the review list less clutter the better

    for (let hotel of data){
            let postDiv         = document.createElement('div');
            let postText        = document.createElement('p');
            let btnGet          = document.createElement("button");
            let btnDELETE       = document.createElement("button");
            let btnReviews      = document.createElement("button");
            let addReview       = document.createElement("button");
            let thumbnail       = document.createElement('img');
            let break1          = document.createElement("br");
            let break2          = document.createElement("br");
            let break3          = document.createElement("br");
            let postContainer   = document.getElementById('hotel-container');

            thumbnail.src = "/images/hotel.gif";
            thumbnail.className = "thumbnail";
            postText.innerHTML = "Name: "+hotel.name+"<br>Location: "+hotel.city+"<br> Review count: "+hotel.reviewCount+"<br> Average Rating: "+hotel.averageRating+"<br> UrlSlug: "+hotel.urlSlug;
            
            btnGet.innerHTML = "MORE"
            btnGet.addEventListener("click", ()=>{//adding eventlisteners to the button so that user can retrieve this particular hotel on its own
                getHotel("/hotels/"+hotel.urlSlug);
            });
            
            btnDELETE.innerHTML = "DELETE"
            btnDELETE.addEventListener("click", ()=>{//adding eventlisteners to the button so that user can delete this particular hotel from data base
                let confirmation = confirm("Are you sure you want to delete "+hotel.name+" from database?");
                if(confirmation == true){
                    deleteHotel("/hotels/"+hotel.urlSlug)
                }
            });

            btnReviews.innerHTML = "REVIEWS"
            btnReviews.addEventListener("click",()=>{//adding eventlisteners to the button so that user can make a review of this particular hotel
                getHotel("/hotels/"+hotel.urlSlug);
                getReviews("/hotels/"+hotel.urlSlug+"/reviews");
            })

            addReview.innerHTML = "ADD REVIEW"
            addReview.addEventListener("click",()=>{//adding eventlisteners to the button so that user can make a review of this particular hotel
                reviewPage("hotels/"+hotel.urlSlug, hotel.name);
            })

            postDiv.className = "post";
            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postDiv.appendChild(btnGet);
            postDiv.appendChild(break1)
            postDiv.appendChild(btnDELETE);
            postDiv.appendChild(break2)
            postDiv.appendChild(btnReviews);
            postDiv.appendChild(break3)
            postDiv.appendChild(addReview);
            postContainer.appendChild(postDiv);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////GET A SINGLE HOTEL FROM LIST AND DISPLAY IT (GET CALL FUNC)//////////////////////////////////
function getHotel(url){
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {
            addHotelsToPage(json);
    });
})
    .catch(function (err) {console.error(err)});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////DELETE HOTEL FROM LIST (DELETE CALL FUNC)/////////////////////////////////////////////////////
function deleteHotel(url){
     fetch(url, {method: 'DELETE'}).then(function (response) {//response is the data we received from the GET request
         response.json().then(function (json) {
             addHotelsToPage(json)
     });
 })
     .catch(function (err) {console.error(err)});
 }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////RETURNS REVIEWS OF A PARTICULAR HOTEL (GET CALL FUNC)/////////////////////////////////////////
function getReviews(url){
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {
        // console.log(json)    
        showReviews(json)
    });
})
    .catch(function (err) {console.error(err)});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////DYNAMICALLY ADDS THE REVIEWS OF A HOTEL TO THE SCREEN///////////////////////////////////////
function showReviews(hotelAndReviews){
    // console.log(hotelAndReviews);
    let reviewListX = hotelAndReviews.reviewList;
    let tempHotel = hotelAndReviews.hotel

    document.getElementById("reviewList").innerHTML = "";
    for(let i=0; i<reviewListX.length; i++){
        let postDiv         = document.createElement('div');
        let postText        = document.createElement('p');
        let detailsButton   = document.createElement('button');
        let review_Form_Div = document.getElementById("reviewList");

        postText.innerHTML = "Rating: "+reviewListX[i].rating+"<br> Comment: "+reviewListX[i].text+"<br> Date: "+reviewListX[i].date+"<br> Rating: "+reviewListX[i].ratingAsStars

        
        detailsButton.innerHTML = "DETAILS";
        detailsButton.addEventListener("click",()=>{
            console.log(tempHotel);
            console.log(tempHotel[0].urlSlug);

            getReviews("/hotels/"+tempHotel[0].urlSlug+"/reviews/"+i);

        })

        postDiv.className = "reviews";
        postDiv.appendChild(postText);
        postDiv.appendChild(detailsButton);
        review_Form_Div.appendChild(postDiv);
    }
    document.getElementById("reviewList").style.display="block"//display the review list
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////DISPLAYS THE REVIEW FORM TO THE SCREEN/////////////////////////////////////////////
function reviewPage(url,hotelName){
    document.getElementById("rateform").style.display="none";//hiding the rateform so the screen doesnt look to cluttered
    document.getElementById("reviewList").style.display="none"//hiding the reviewList so the screen doesnt look to cluttered
    document.getElementById("reviewFormDiv").style.display="block"//exposing the review form div
    let reviewForm_holder = document.getElementById("reviewForm");
    reviewForm_holder.action="";//always reset when someone clicks the review button
    // console.log(reviewForm_holder.action)
    reviewForm_holder.action+=url+"/reviews";//changing the reviewforms action
    // console.log(reviewForm_holder.action)
    let hotel_Name_Holder = document.getElementById("hotelNameHolder");
    // console.log(hotelNameHolder)
    hotel_Name_Holder.value = hotelName//setting the hotelNameHolder input value to the hotel name we are working with so that we can use this in the server
    // console.log(hotelNameHolder);

}





// function hidePostsExcept(postText){
//     //console.log(postText)
//     let arrOfPosts = document.getElementsByClassName("post");//array of divs with the post class name
//     for(let singlePost of arrOfPosts){
//         // console.log(y.children[1].innerHTML)
//         if(postText != singlePost.children[1].innerHTML){
//             // console.log(singlePost);
//             singlePost.style.display="none";
//         }
//     }
// }


// function showPosts(){
//     document.getElementById("rateform").style.display="block";
//     document.getElementById("reviewFormDiv").style.display="none"
//     let arrOfPosts = document.getElementsByClassName("post");//array of divs with the post class name
//     for(let singlePost of arrOfPosts){
//             singlePost.style.display="block";
//     }
// }