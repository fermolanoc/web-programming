/* Lab: write the code requested by lines marked //TODO
You should NOT modify any of the code that's here already. Add the code requested.   */

console.log('Lab. Please write the code requested at the //TODO markers.')

/* a. Use this JavaScript object. This represents the current position of the International Space Station
at 1pm on January 12th 2018, fetched from http://api.open-notify.org/iss-now.json.
 */

let iss_location = {
    "timestamp": 1515784140,
    "iss_position":
    {
        "latitude": "49.2167",
        "longitude": "100.5363"
    },
    "message": "success"
}

// TODO Extract the latitude value, and log it to the console.
let latitude = iss_location.iss_position.latitude;
console.log(latitude);
// TODO Extract the longitude value, and log it to the console.
let longitude = iss_location.iss_position.longitude;
console.log(longitude);




/* b. Use this JavaScript object of exchange rates relative to Euros.
The properties are currency symbols, the values are the exchange rates.
Data source: http://fixer.io/
* */


let rates = {
    "AUD": 1.5417,
    "BGN": 1.9558,
    "BRL": 3.8959,
    "CAD": 1.5194
}

// TODO write code to add a new property for Swiss Francs. Symbol is CHF, value is 1.1787.
// let swissFrancs = { ...rates, "CHF": 1.1787 };
// console.log(swissFrancs);
rates["CHF"] = 1.1787
console.log(rates);

// TODO if you had 100 Euros, write code to get the exchange rate from the object, then calculate 
//      the equivalent value in Australian Dollars (AUD)
rates["EUR"] = 1;
// calculate how much are 100 euros in AUD
let EUR_to_AUD = (rates["EUR"] * 100) * rates["AUD"];
console.log(EUR_to_AUD);

// TODO write code to identify the currency symbol that has the highest exchange rate compared to Euros.
//    In other words, identify the property with the largest value. the answer is BRL (Brazilian Real) at 3.8959 BRL to 1 Euro.
// loop and compare key a vs key b values to see which is higher, at the end show the key with the highest value
console.log(Object.keys(rates).reduce((a, b) => rates[a] > rates[b] ? a : b))




/* c. Use this JavaScript array of objects of cat owners, and their cats. Source, moderncat.com
 */

let cats_and_owners = [
    { name: "Bill Clinton", cat: "Socks" },
    { name: "Gary Oldman", cat: "Soymilk" },
    { name: "Katy Perry", cat: "Kitty Purry" },
    { name: "Snoop Dogg", cat: "Miles Davis" }
]

// TODO print Gary Oldman's cat's name
console.log(cats_and_owners[1].cat);

// TODO Taylor Swift's cat is called 'Meredith'. Write code to add this data to the array.
let taylorSwiftCat = { name: "Taylor Swift", cat: "Meredith" };
cats_and_owners.push(taylorSwiftCat);
console.log(cats_and_owners);

// TODO write a loop to print each cat owner, and their cat's name, one per line. Use the forEach style.
cats_and_owners.forEach((owner) => {
    console.log(`${owner.name}'s cat: ${owner.cat}`);
})




/* d. Use the following JSON object, describing the Nobel Prize winners in 2017.
Source http://api.nobelprize.org/v1/prize.json?year=2017
* */

// TODO print the full name of the Literature Nobel laureate.
// TODO print the ids of each of the Physics Nobel laureates. Your code should still work without modification if a laureate was added, or removed.
// TODO write code to print the names of all of the prize categories (So your output would start physics, chemistry, medicine... ).
// TODO write code to print the total number of prize categories
// TODO write code to count the total number of laureates from 2017. 
//   have a good look at how the JSON is structured, and think about what loop(s) you'll need to write.



let nobel_prize_winners_2017 = {
    "prizes": [
        {
            "year": "2017",
            "category": "physics",
            "laureates": [
                {
                    "id": "941",
                    "firstname": "Rainer",
                    "surname": "Weiss",
                    "motivation": "\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
                    "share": "2"
                },
                {
                    "id": "942",
                    "firstname": "Barry C.",
                    "surname": "Barish",
                    "motivation": "\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
                    "share": "4"
                },
                {
                    "id": "943",
                    "firstname": "Kip S.",
                    "surname": "Thorne",
                    "motivation": "\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
                    "share": "4"
                }
            ]
        },
        {
            "year": "2017",
            "category": "chemistry",
            "laureates": [
                {
                    "id": "944",
                    "firstname": "Jacques",
                    "surname": "Dubochet",
                    "motivation": "\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
                    "share": "3"
                },
                {
                    "id": "945",
                    "firstname": "Joachim",
                    "surname": "Frank",
                    "motivation": "\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
                    "share": "3"
                },
                {
                    "id": "946",
                    "firstname": "Richard",
                    "surname": "Henderson",
                    "motivation": "\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
                    "share": "3"
                }
            ]
        },
        {
            "year": "2017",
            "category": "medicine",
            "laureates": [
                {
                    "id": "938",
                    "firstname": "Jeffrey C.",
                    "surname": "Hall",
                    "motivation": "\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
                    "share": "3"
                },
                {
                    "id": "939",
                    "firstname": "Michael",
                    "surname": "Rosbash",
                    "motivation": "\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
                    "share": "3"
                },
                {
                    "id": "940",
                    "firstname": "Michael W.",
                    "surname": "Young",
                    "motivation": "\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
                    "share": "3"
                }
            ]
        },
        {
            "year": "2017",
            "category": "literature",
            "laureates": [
                {
                    "id": "947",
                    "firstname": "Kazuo",
                    "surname": "Ishiguro",
                    "motivation": "\"who, in novels of great emotional force, has uncovered the abyss beneath our illusory sense of connection with the world\"",
                    "share": "1"
                }
            ]
        },
        {
            "year": "2017",
            "category": "peace",
            "laureates": [
                {
                    "id": "948",
                    "firstname": "International Campaign to Abolish Nuclear Weapons (ICAN)",
                    "motivation": "\"for its work to draw attention to the catastrophic humanitarian consequences of any use of nuclear weapons and for its ground-breaking efforts to achieve a treaty-based prohibition of such weapons\"",
                    "share": "1",
                    "surname": ""
                }
            ]
        },
        {
            "year": "2017",
            "category": "economics",
            "laureates": [
                {
                    "id": "949",
                    "firstname": "Richard H.",
                    "surname": "Thaler",
                    "motivation": "\"for his contributions to behavioural economics\"",
                    "share": "1"
                }
            ]
        }
    ]
}

// get all the date from object
let nobelPrizeInfo = nobel_prize_winners_2017.prizes;
// console.log(nobelPrizeInfo);

// get all the winners
let nobelWinners = nobelPrizeInfo.map(winner => winner)
// console.log(nobelWinners);

// filter winners by category "literature" and get the winners info
let literatureWinners = nobelWinners.filter(category => category.category === "literature").map(winners => winners.laureates);
console.log(literatureWinners);
// get the literature winner's full name
let literatureWinnersNames = literatureWinners[0].map(winner => console.log(`Literature Nobel Winner: ${winner.firstname} ${winner.surname}`));


// get physics category winners info
let physicsWinners = nobelWinners.filter(category => category.category === "physics").map(winners => winners.laureates);
let physicsWinnersId = physicsWinners[0].map(winner => console.log(winner.id))
// console.log(physicsWinnersId);


let nobelCategories = nobelPrizeInfo.map(category => console.log(category.category))
// console.log(nobelCategories);

// let literatureWinners = nobelPrizeInfo.filter(category => category.category == "literature").map(winners => winners.laureates)
// // console.log(literatureWinners[0][1]);

// let winnersNames = literatureWinners[0].map((winner) => {
//     return `${winner.firstname} ${winner.surname}`

// })
// winnersNames.forEach(winner => {
//     console.log(winner);
// })

// let winners = nobelPrizeInfo.map(winner => {
//     // console.log(winner.laureates);
//     return winner.laureates
// })

