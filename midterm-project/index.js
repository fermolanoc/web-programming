let username = document.querySelector("#username-input");
let searchButton = document.querySelector("#search-button");
let user = document.querySelector("#user");
let cardList = document.querySelector("#card-container");
let noReposMsg = document.querySelector("#no-reposMsg");

// function removeCards() {
//   const cards = document.querySelectorAll("card");
//   console.log(cards);
//   if (cards) {
//     cardList.remove(cards);
//   }
// }

// function getRepoLanguages(repo) {
//   fetch(repo.languages_url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((repoData) => {
//       for (const key in repoData) {
//         if (Object.hasOwnProperty.call(repoData, key)) {
//           const element = repoData[key];
//         }
//       }
//     });
// }

async function showRepos(data) {
  data.map((repo) => {
    let card = document.createElement("div");
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
    // cardBodyDetails.innerHTML = getRepoLanguages(repo);
    cardBodyDetails.innerHTML = "Project description";
    cardBody.appendChild(cardBodyDetails);

    let projectLink = document.createElement("button");
    projectLink.className = "btn btn-danger";
    projectLink.innerHTML = "View Code";
    cardBody.appendChild(projectLink);

    cardList.appendChild(card);
  });
}

async function getRepos(username) {
  // removeCards();
  const baseUrl = await `https://api.github.com/users/${username}/repos`;

  try {
    fetch(baseUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data.message) {
          user.innerHTML = `User @${username} not found!`;
        } else {
          user.innerHTML = `Welcome @${username}`;

          showRepos(data);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener("click", (event) => {
  getRepos(username.value);
  event.preventDefault();
});
