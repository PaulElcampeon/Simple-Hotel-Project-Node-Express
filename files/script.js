
document.getElementById("reviewFormDiv").style.display="none";

document.getElementById("btn1").addEventListener("click",()=>{
    getHotels("/hotels");
});

function getHotels(url){//makes a call to the server to get a list of hotels within the hotelCollection obj
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json){
            addHotelsToPage(json);

    });
})
    .catch(function (err) {console.error(err)});
}

function getHotel(url){//makes a call to the server to get a particular hotel in the hotelCollection obj
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {
            addHotelToPage(json);
    });
})
    .catch(function (err) {console.error(err)});
}


function deleteHotel(url){//makes a call to the server to delete  a particular hotel in the hotelCollection obj
     fetch(url, {method: 'DELETE'}).then(function (response) {//response is the data we received from the GET request
         response.json().then(function (json) {
             addHotelsToPage(json)
     });
 })
     .catch(function (err) {console.error(err)});
 }


function addHotelsToPage (data) {//function to append the data received from the response from the getHotels() get call
    document.getElementById("hotel-container").innerHTML="";
    for (let hotel of data.hotels){
            let postDiv         = document.createElement('div');
            let postText        = document.createElement('p');
            let btnGet          = document.createElement("button");
            let btnDELETE       = document.createElement("button");
            let btnAddReview    = document.createElement("button");
            let thumbnail       = document.createElement('img');
            let break1          = document.createElement("br");
            let break2          = document.createElement("br");
            let postContainer   = document.getElementById('hotel-container');

            thumbnail.src = "/images/hotel.gif";
            thumbnail.className = "thumbnail";
            postText.innerHTML = "Name: "+hotel.name+"<br>Location: "+hotel.city;
            
            btnGet.innerHTML = "MORE"
            btnGet.addEventListener("click", ()=>{//adding eventlisteners to the button so that user can retrieve this particular hotel on its own
                getHotel("/hotels/"+hotel.urlSlug)
            });
            
            btnDELETE.innerHTML = "DELETE"
            btnDELETE.addEventListener("click", ()=>{//adding eventlisteners to the button so that user can delete this particular hotel from data base
                let confirmation = confirm("Are you sure you want to delete "+hotel.name+" from database?");
                if(confirmation == true){
                    deleteHotel("/hotels/"+hotel.urlSlug)
                }
            });

            btnAddReview.innerHTML = "ADD REVIEW"
            btnAddReview.addEventListener("click",()=>{//adding eventlisteners to the button so that user can make a review of this particular hotel
                addReview("hotels/"+hotel.urlSlug, postText.innerHTML,hotel.name);
            })

            postDiv.className = "post";
            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postDiv.appendChild(btnGet);
            postDiv.appendChild(break1)
            postDiv.appendChild(btnDELETE);
            postDiv.appendChild(break2)
            postDiv.appendChild(btnAddReview);
            postContainer.appendChild(postDiv);
    }
}

function addHotelToPage (data) {//function to append the data received from the response from the getHotels() get call
    document.getElementById("hotel-container").innerHTML="";
    
    let postDiv         = document.createElement('div');
    let postText        = document.createElement('p');
    // let btnGet          = document.createElement("button");
    // let btnDELETE       = document.createElement("button");
    let thumbnail       = document.createElement('img');
    let postContainer   = document.getElementById('hotel-container');

    thumbnail.src = "/images/hotel.gif";
    thumbnail.className = "thumbnail";
    postText.innerHTML = "Name: "+data.name+"<br>Location: "+data.city;
            
    // btnGet.innerHTML = "MORE"
    // btnGet.addEventListener("click", ()=>{
    //     getHotel("/hotels/"+data.urlSlug)
    // });

    // btnDELETE.innerHTML = "DELETE"
    // btnDELETE.addEventListener("click", ()=>{
    //     deleteHotel("/hotels/"+data.urlSlug)
    // });

    postDiv.className = "post";
    postDiv.appendChild(thumbnail);
    postDiv.appendChild(postText);
    // postDiv.appendChild(btnGet);
    // postDiv.appendChild(btnDELETE);
    postContainer.appendChild(postDiv);
}


function addReview(url,postText,hotelName){
    // console.log(postText);
    let arrOfPosts = document.getElementsByClassName("post");//array of divs with the post class name
    for(let singlePost of arrOfPosts){
        // console.log(y.children[1].innerHTML)
        if(postText != singlePost.children[1].innerHTML){
            // console.log(singlePost);
            singlePost.style.display="none";
        }
    }

    document.getElementById("rateform").style.display="none";//hiding the rateform so the screen doesnt look to cluttered
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


