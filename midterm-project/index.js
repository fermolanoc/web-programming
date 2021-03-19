let username = document.querySelector("#username-input");
let searchButton = document.querySelector("#search-button");
let user = document.querySelector("#user");
let cardList = document.querySelector("#card-container");
let noReposMsg = document.querySelector("#no-reposMsg");

async function getRepoLanguages(repo) {
  await fetch(repo.languages_url)
    .then((res) => {
      return res.json();
    })
    .then((repoData) => {
      // console.log(Object.keys(repoData));
      let languages = Object.keys(repoData);
      // return languages;
      languages.forEach((language) => {
        console.log(language);
        return language;
        // let cardBodyDetails = document.createElement("p");
        // cardBodyDetails.className = "card-text fw-light";
        // cardBodyDetails.innerHTML = language;

        // return cardBodyDetails;
      });
    });
}

function showRepos(data) {
  cardList.innerHTML = ""; // clear container if there's data
  data.map((repo) => {
    // loop trough each repository to create a card
    let card = document.createElement("div"); // create card element and add classes
    card.className = "col-12 col-md-6 col-lg-4 mb-4";

    let cardContainer = document.createElement("div");
    cardContainer.className = "card shadow";
    card.appendChild(cardContainer);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardContainer.appendChild(cardBody);

    let projectTitle = document.createElement("h5");
    projectTitle.className = "card-title text-white fw-bold";
    projectTitle.innerHTML = repo.name;
    cardBody.appendChild(projectTitle);

    let cardBodyDetails = document.createElement("p");
    cardBodyDetails.className = "card-text fw-light";
    // cardBodyDetails.innerHTML = `${languages}`;
    cardBodyDetails.innerHTML = repo.description;
    cardBody.appendChild(cardBodyDetails);

    let projectLink = document.createElement("a");
    projectLink.className = "btn btn-danger";
    projectLink.setAttribute("href", `${repo.html_url}`);
    projectLink.setAttribute("target", "_blank");
    projectLink.innerHTML = "View Code";
    cardBody.appendChild(projectLink);

    cardList.appendChild(card);
  });
}

// generate customized url based on github username and get user repositories
async function getRepos(username) {
  const baseUrl = await `https://api.github.com/users/${username}/repos`;

  try {
    fetch(baseUrl) // if the url exists
      .then((res) => {
        return res.json(); // get data in json format
      })
      .then((data) => {
        console.log(data);

        if (data.message) {
          // if data contains a key called message it means user doesn't exists
          user.innerHTML = `User @${username} not found!`;
        } else {
          user.innerHTML = `Welcome @${username}`;

          showRepos(data); // if user exists, show user's repositories
        }
      });
  } catch (error) {
    console.log(error);
  }
}

// function to handle the search user data
searchButton.addEventListener("click", (event) => {
  getRepos(username.value); // when clicked, call the function to get the user's repositories data
  event.preventDefault(); // prevent to reload website
});
