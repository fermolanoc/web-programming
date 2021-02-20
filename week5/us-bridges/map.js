let areaCenterCoordinates = [45.8174, -84.7278];
let zoomLevel = 9; //1= whole world, max is 20(city blocks)

let map = L.map("usBridges-map").setView(areaCenterCoordinates, zoomLevel);



// Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
