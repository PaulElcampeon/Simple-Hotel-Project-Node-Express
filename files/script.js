
document.getElementById("btn1").addEventListener("click",()=>{
    getHotels("/hotels");
});

function getHotels(url){//makes a call to the server to get a list of hotels within the hotelCollection obj
    //console.log(url)
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {console.log(json);
            addHotelsToPage(json);
    });
})
    .catch(function (err) {console.error(err)});
}




function addHotelsToPage (data) {//function to append the data received from the response from the getHotels() get call
    console.log(data)
    document.getElementById("hotel-container").innerHTML="";
    for (var hotelsx of data.hotels) {
            var postDiv         = document.createElement('div');
            var postText        = document.createElement('p');
            var btnGet          = document.createElement("button");
            var btnDELETE       = document.createElement("button");
            var thumbnail       = document.createElement('img');
            var postContainer   = document.getElementById('hotel-container');

            thumbnail.src = "/images/hotel.gif";
            thumbnail.className = "thumbnail";
            postText.innerHTML = "Name: "+hotelsx.name+"<br>Location: "+hotelsx.city;
            
            btnGet.innerHTML = "MORE"
            btnGet.addEventListener("click", ()=>{
                getHotel("/hotels/"+hotelsx.urlSlug)
            });

            btnDELETE.innerHTML = "DELETE"
            btnDELETE.addEventListener("click", ()=>{
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
    console.log(data)
    document.getElementById("hotel-container").innerHTML="";


            var postDiv         = document.createElement('div');
            var postText        = document.createElement('p');
            var btnGet          = document.createElement("button");
            var btnDELETE       = document.createElement("button");
            var thumbnail       = document.createElement('img');
            var postContainer   = document.getElementById('hotel-container');

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


function getHotel(url){//makes a call to the server to get a particular hotel in the hotelCollection obj
    fetch(url, {method: 'GET'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {console.log(json);
            addSingleHotelToPage(json);
    });
})
    .catch(function (err) {console.error(err)});
}


function addSingleHotelToPage(data){
    console.log(data);
    document.getElementById("hotel-container").innerHTML="";
    addHotelToPage(data);
}


function deleteHotel(url){//makes a call to the server to delete  a particular hotel in the hotelCollection obj
    console.log(url);
    fetch(url, {method: 'DELETE'}).then(function (response) {//response is the data we received from the GET request
        response.json().then(function (json) {console.log(json);
            addHotelsToPage(json)
    });
})
    .catch(function (err) {console.error(err)});
}