let url = "https://api.wheretheiss.at/v1/satellites/25544"; // iss info API

// variables to get element from html
let issLat = document.querySelector("#iss-lat");
let issLong = document.querySelector("#iss-long");
let timeIssLocationFetched = document.querySelector("#timeUpdated");



let update = 10000; // update info every 10 seconds
let maxFailedAttempts = 3; // try to get data from API max 3 times
let issMarker; // initialize marker
let map = L.map("iss-map").setView([0, 0], 1); // map zoom = 1 = whole world

// define the style of map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts) // call function one time to start
// setInterval(iss, update) // 10 seconds
function iss(attempts) {

    if (attempts <= 0) { // if already tried 3 times to connect, abort
        alert("Failed to contact ISS server after several attempts.")
        return;
    }

    // if there are still attempts remaining, then fetch info from url
    fetch(url)
        .then(res => {
            // process response into json and returns a promise 
            // which can be get on the next .then (issData)
            return res.json()
        })
        .then((issData) => { // display data on webpage
            // console.log(issData);
            // console.log(issData.latitude);
            // console.log(issData.longitude);

            // update time on webpage
            let date = new Date();
            timeIssLocationFetched.innerHTML = date;

            // update coordinates
            let latitude = issData.latitude;
            let longitude = issData.longitude;
            issLat.innerHTML = latitude;
            issLong.innerHTML = longitude;


            // create marker if it doesn't exist
            if (!issMarker) {
                // create marker
                issMarker = L.marker([latitude, longitude]).addTo(map);
            } else {
                // move marker if exist
                issMarker.setLatLng([latitude, longitude]);
            }
        })
        // catch errors when trying to get data from url or access data from API
        .catch(err => {
            console.log("Error!", err);
            attempts--; // reduce attempts qty on 1
        })

        // either if an error occur or everything works fine, run the program
        // passing the function, how often it should be updated, and how many attempts it should do in case of errors
        .finally(() => {
            setTimeout(iss, update, attempts);
        })

}


