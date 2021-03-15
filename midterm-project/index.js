let username = document.querySelector("#username-input");
let searchButton = document.querySelector("#search-button");
let user = document.querySelector("#user");
let cardList = document.querySelector("#card-container");

async function getRepos(username) {
  const baseUrl = await `https://api.github.com/users/${username}/repos`;

  fetch(baseUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      user.innerHTML = `Welcome @${username}`;

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
      projectTitle.innerHTML = data[2].name;
      cardBody.appendChild(projectTitle);

      let cardBodyDetails = document.createElement("p");
      cardBodyDetails.className = "card-text fw-light";
      cardBodyDetails.innerHTML = `Some quick example text to build on the card title and make up
      the bulk of the card's content.`;
      cardBody.appendChild(cardBodyDetails);

      let projectLink = document.createElement("button");
      projectLink.className = "btn btn-danger";
      projectLink.innerHTML = "View Code";
      cardBody.appendChild(projectLink);

      cardList.appendChild(card);
    });
}

searchButton.addEventListener("click", (event) => {
  getRepos(username.value);
  event.preventDefault();
});
