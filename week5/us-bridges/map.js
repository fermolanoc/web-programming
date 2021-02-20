let areaCenterCoordinates = [42.2118475, -100.7143307]; // coordinates of USA map
let zoomLevel = 4; //1= whole world, max is 20(city blocks)

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
    },
    {
        name: "Golden Gate Bridge",
        location: {
            city: "San Francisco and Marin",
            state: "CA",
            coordinates: [37.8199, -122.4783]
        },
        span: 1280.2
    },
    {
        name: "Mackinac Bridge",
        location: {
            city: "Mackinaw and St Ignace",
            state: "MI",
            coordinates: [45.8174, -84.7278]
        },
        span: 1158.0
    },
    {
        name: "George Washington Bridge",
        location: {
            city: "New York",
            state: "NY & New Jersey",
            coordinates: [40.8517, -73.9527]
        },
        span: 1067.0
    },
    {
        name: "Tacoma Narrows Bridge",
        location: {
            city: "Tacoma and Kitsap",
            state: "WA",
            coordinates: [47.2690, -122.5517]
        },
        span: 853.44
    }
]

bridges.forEach(bridge => {
    let markerText = `<b>${bridge.name}</b></br><b>Length:</b> 
        ${bridge.span} (meters)</br><small>
        ${bridge.location.city}, ${bridge.location.state}</small>`;
    L.marker(bridge.location.coordinates)
        .bindPopup(markerText)
        .addTo(map);
});

