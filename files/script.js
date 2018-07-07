
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
    for (let hotelsx of data.hotels){
            let postDiv         = document.createElement('div');
            let postText        = document.createElement('p');
            let btnGet          = document.createElement("button");
            let btnDELETE       = document.createElement("button");
            let thumbnail       = document.createElement('img');
            let postContainer   = document.getElementById('hotel-container');

            thumbnail.src = "/images/hotel.gif";
            thumbnail.className = "thumbnail";
            postText.innerHTML = "Name: "+hotelsx.name+"<br>Location: "+hotelsx.city;
            
            btnGet.innerHTML = "MORE"
            btnGet.addEventListener("click", ()=>{
                alert("More"+hotelsx.urlSlug);
                console.log(hotelsx.urlSlug);
                getHotel("/hotels/"+hotelsx.urlSlug)
            });
            
            btnDELETE.innerHTML = "DELETE"
            btnDELETE.addEventListener("click", ()=>{
                alert("DELETE"+hotelsx.urlSlug)
                deleteHotel("/hotels/"+hotelsx.urlSlug)
            });

            postDiv.className = "post";
            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postDiv.appendChild(btnGet);
            postDiv.appendChild(btnDELETE);
            postContainer.appendChild(postDiv);
    }
}

function addHotelToPage (data) {//function to append the data received from the response from the getHotels() get call
    document.getElementById("hotel-container").innerHTML="";
    
    let postDiv         = document.createElement('div');
    let postText        = document.createElement('p');
    let btnGet          = document.createElement("button");
    let btnDELETE       = document.createElement("button");
    let thumbnail       = document.createElement('img');
    let postContainer   = document.getElementById('hotel-container');

    thumbnail.src = "/images/hotel.gif";
    thumbnail.className = "thumbnail";
    postText.innerHTML = "Name: "+data.name+"<br>Location: "+data.city;
            
    btnGet.innerHTML = "MORE"
    btnGet.addEventListener("click", ()=>{
        getHotel("/hotels/"+data.urlSlug)
    });

    btnDELETE.innerHTML = "DELETE"
    btnDELETE.addEventListener("click", ()=>{
        deleteHotel("/hotels/"+data.urlSlug)
    });

    postDiv.className = "post";
    postDiv.appendChild(thumbnail);
    postDiv.appendChild(postText);
    postDiv.appendChild(btnGet);
    postDiv.appendChild(btnDELETE);
    postContainer.appendChild(postDiv);
}


