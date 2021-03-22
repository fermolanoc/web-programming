// check if dark mode is active or not and toggle to change design
const checkbox = document.querySelector("#checkbox");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  checkbox.setAttribute("checked", true);
}

// when clicking the dark mode button, toggle class on body element
checkbox.addEventListener("change", function (event) {
  if (this.checked) {
    document.body.classList.remove("is-light-mode");
    document.body.classList.add("is-dark-mode");
  } else {
    document.body.classList.remove("is-dark-mode");
    document.body.classList.add("is-light-mode");
  }
});

// get elements from document

let username = document.querySelector("#username-input");
let searchButton = document.querySelector("#search-button");
let user = document.querySelector("#user");
let cardList = document.querySelector("#card-container");
let noReposMsg = document.querySelector("#no-reposMsg");
let modalContainer = document.querySelector(".modal");

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

function getLanguages(data) {
  for (let index = 0; index < data.length; index++) {
    const languages_url = `${data[index].languages_url}`;
    fetch(languages_url)
      .then((res) => {
        return res.json();
      })
      .then((repoLanguages) => {
        // return repoLanguages;
        // console.log(repoLanguages);

        let languages = Object.keys(repoLanguages);
        languages.forEach((language) => {
          return language;
          // console.log(language);
        });
      });
  }
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
    projectTitle.className = "card-title fw-bold";
    projectTitle.innerHTML = repo.name;
    cardBody.appendChild(projectTitle);

    let projectDescription = document.createElement("p");
    projectDescription.className = "card-text fw-light";
    if (repo.description == null) {
      projectDescription.innerHTML = "No description added";
    } else {
      projectDescription.innerHTML = repo.description;
    }
    cardBody.appendChild(projectDescription);

    let projectLanguage = document.createElement("p");
    projectLanguage.className = "card-text fw-light";
    projectLanguage.innerHTML = `Language: ${repo.language}`;
    cardBody.appendChild(projectLanguage);

    let projectLink = document.createElement("a");
    projectLink.className = "btn btn-danger m-2";
    projectLink.setAttribute("href", `${repo.html_url}`);
    projectLink.setAttribute("target", "_blank");
    projectLink.innerHTML = "View Code";
    cardBody.appendChild(projectLink);

    // let projectStats = document.createElement("a");
    // projectStats.className = "btn btn-danger";
    // projectStats.addEventListener("click", () => {
    //   // get url for languages used in each repository and fetch data
    //   const languages_url = `${repo.languages_url}`;
    //   fetch(languages_url)
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((repoLanguages) => {
    //       // console.log(repoLanguages);

    //       let total = 0; // start variable to sum total of values for all languages used
    //       let languagesInRepo = []; // empty array to store each language and its percentage

    //       for (const prop in repoLanguages) {
    //         // console.log(`${prop}: ${repoLanguages[prop]}`);
    //         total += repoLanguages[prop];
    //       }

    //       // iterate every language to calculate percentage and add each language % to array languagesInRepo
    //       for (const language in repoLanguages) {
    //         if (Object.hasOwnProperty.call(repoLanguages, language)) {
    //           languagePercentage = (
    //             (repoLanguages[language] * 100) /
    //             total
    //           ).toFixed(2);

    //           languagesInRepo.push(`${language}: ${languagePercentage}%`);
    //         }
    //       }
    //       // console.log(total);
    //       // console.log(languagesInRepo);

    //
    //       // swal({
    //       //   title: `Statistics | ${repo.name}`,
    //       //   text: `Languages: ${languagesInRepo.join(", ")}\n Forks: ${
    //       //     repo.forks
    //       //   }\n `,
    //       //   icon: "success",
    //       //   button: "Close",
    //       // });
    //       // languages.forEach((language) => {
    //       //   return language;
    //       //   // console.log(language);
    //       // });
    //     });
    // });

    // create modalButton to trigger modal element with statistics data
    let modalButton = document.createElement("button");
    modalButton.setAttribute("type", "button");
    modalButton.setAttribute("data-bs-toggle", "modal");
    modalButton.setAttribute("data-bs-target", `#${repo.name}Modal`);
    modalButton.className = "btn btn-warning";
    modalButton.textContent = "View Statistics";

    // create modal with statistics data
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.setAttribute("id", `${repo.name}Modal`);
    modal.setAttribute("tabIndex", "-1");
    modal.setAttribute("aria-labelledby", `${repo.name}ModalLabel`);
    modal.setAttribute("aria-hidden", "true");

    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title";
    modalTitle.setAttribute("id", `${repo.name}ModalLabel`);
    modalTitle.innerHTML = `${repo.name}`;
    modalHeader.appendChild(modalTitle);

    // projectStats.innerHTML = "View Statistics";
    // cardBody.appendChild(projectStats);
    cardBody.appendChild(modalButton);

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
          cardList.innerHTML = "";
          // if data contains a key called message it means user doesn't exists
          user.innerHTML = `User @${username} was not found!`;
        } else {
          user.innerHTML = `<bold>Welcome @${username}</bold></br> You currently have ${data.length} projects on GitHub`;

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
