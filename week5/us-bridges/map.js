let areaCenterCoordinates = [36.2118475, -113.7143307]; // coordinates of USA map
let zoomLevel = 3; //1= whole world, max is 20(city blocks)

let map = L.map("usBridges-map").setView(areaCenterCoordinates, zoomLevel);

// Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Bridges data
bridges = [
    {
        name: "Verrazano-Narrows Bridge",
        location: {
            city: "New York",
            state: "NY",
            coordinates: [40.6066, -74.0447]
        },
        span: 1298.4
    }
]

bridges.forEach(bridge => {
    let markerText = `<b>${bridge.name}</b></br>`;
    L.marker(bridge.location.coordinates)
        .bindPopup(markerText)
        .addTo(map);
});


// Golden Gate Bridge	San Francisco and Marin, CA	1280.2	37.8199, -122.4783
// Mackinac Bridge	Mackinaw and St Ignace, MI	1158.0	45.8174, -84.7278
// George Washington Bridge	New York, NY and New Jersey, NJ	1067.0	40.8517, -73.9527
// Tacoma Narrows Bridge	Tacoma and Kitsap, WA	853.44	47.2690, -122.5517