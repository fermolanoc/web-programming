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
let welcomeMsg = document.querySelector("#welcomeMsg");
let user = document.querySelector("#user");
let reposQty = document.querySelector("#reposQty");
let followersQty = document.querySelector("#followersQty");
// let noReposMsg = document.querySelector("#no-reposMsg");
let cardList = document.querySelector("#card-container");

// show welcome message when page loads
window.addEventListener("load", () => {
  welcomeMsg.innerHTML = `WELCOME TO INHUBGRAPHIC</br>Enter your GitHub username to see all of your
  projects relevant data`;
});

// async function getRepoLanguages(repo) {
//   await fetch(repo.languages_url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((repoData) => {
//       // console.log(Object.keys(repoData));
//       let languages = Object.keys(repoData);
//       // return languages;
//       languages.forEach((language) => {
//         console.log(language);
//         return language;
//         // let cardBodyDetails = document.createElement("p");
//         // cardBodyDetails.className = "card-text fw-light";
//         // cardBodyDetails.innerHTML = language;

//         // return cardBodyDetails;
//       });
//     });
// }

// function getLanguages(data) {
//   for (let index = 0; index < data.length; index++) {
//     const languages_url = `${data[index].languages_url}`;
//     fetch(languages_url)
//       .then((res) => {
//         return res.json();
//       })
//       .then((repoLanguages) => {
//         // return repoLanguages;
//         // console.log(repoLanguages);

//         let languages = Object.keys(repoLanguages);
//         languages.forEach((language) => {
//           return language;
//           // console.log(language);
//         });
//       });
//   }
// }

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

    // if repository has a description, it'll show, otherwise, default message
    let projectDescription = document.createElement("p");
    projectDescription.className = "card-text fw-light";
    if (repo.description == null) {
      projectDescription.innerHTML = "No description added";
    } else {
      projectDescription.innerHTML = repo.description;
    }
    cardBody.appendChild(projectDescription);

    // shows main language detected on repository ->
    // 'View Statistics' button will show all languages used on each repository
    let projectLanguage = document.createElement("p");
    projectLanguage.className = "card-text fw-bold";
    projectLanguage.innerHTML = `Language: ${repo.language}`;
    cardBody.appendChild(projectLanguage);

    // button -> link to github repository code
    let projectLink = document.createElement("a");
    projectLink.className = "btn viewCodeBtn text-white m-2";
    projectLink.setAttribute("href", `${repo.html_url}`);
    projectLink.setAttribute("target", "_blank");
    projectLink.innerHTML = "View Code";
    cardBody.appendChild(projectLink);

    // create modalButton to trigger modal element with statistics data
    let modalButton = document.createElement("button");
    modalButton.setAttribute("type", "button");
    modalButton.setAttribute("data-bs-toggle", "modal");
    modalButton.setAttribute("data-bs-target", `#get${repo.name}Modal`);
    modalButton.className = "btn viewStatsBtn";
    modalButton.innerHTML = "View Statistics";

    // create modal with statistics data
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.setAttribute("id", `get${repo.name}Modal`);
    modal.setAttribute("tabIndex", "-1");
    modal.setAttribute("aria-labelledby", `get${repo.name}ModalLabel`);
    modal.setAttribute("aria-hidden", "true");

    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";
    modal.appendChild(modalDialog);

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header bg-danger";
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title text-white";
    modalTitle.setAttribute("id", `get${repo.name}ModalLabel`);
    modalTitle.innerHTML = `${repo.name} stats`;
    modalHeader.appendChild(modalTitle);

    let closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.className = "btn-close";
    modalHeader.appendChild(closeButton);

    let modalBody = document.createElement("div");
    modalBody.className = "modal-body mb-4";
    modalContent.appendChild(modalBody);

    // stats - extra data
    // last commit
    let lastUpdate = document.createElement("div");
    lastUpdate.className = "text-dark text-center mb-4";
    let date = new Date(`${repo.updated_at}`);
    lastUpdate.innerHTML = `<strong>Last commit:</strong></br>${date}`;
    modalContent.appendChild(lastUpdate);

    // # of times repo has been forked
    let forksCount = `${repo.forks_count}`;
    if (forksCount != 0) {
      let forksEl = document.createElement("div");
      forksEl.className = "text-dark text-center mb-4";
      forksEl.innerHTML = `<strong>This project has been forked</strong></br>${forksCount} time(s)`;
      modalContent.appendChild(forksEl);
    }

    // modal functionality when button is clicked
    modalButton.addEventListener("click", () => {
      modalBody.innerHTML = ""; // clear previous canvas chart if any

      // get url for languages used in each repository and fetch data
      const languages_url = `${repo.languages_url}`;
      fetch(languages_url)
        .then((res) => {
          return res.json();
        })
        .then((repoLanguages) => {
          let total = 0; // start variable to sum total of values for all languages used
          let languagesInRepo = []; // empty array to store each language and its percentage

          for (const prop in repoLanguages) {
            // console.log(`${prop}: ${repoLanguages[prop]}`);
            total += repoLanguages[prop];
          }

          // create constructor to store each pair language: percentage as an object
          function LanguagePercentage(language, percentage) {
            (this.language = language), (this.percentage = percentage);
          }

          // iterate every language to calculate percentage and add each language % to array languagesInRepo
          for (const language in repoLanguages) {
            if (Object.hasOwnProperty.call(repoLanguages, language)) {
              languagePercentage = (
                (repoLanguages[language] * 100) /
                total
              ).toFixed(2);

              // add object {key: value} to Array
              languagesInRepo.push(
                new LanguagePercentage(`${language}`, `${languagePercentage}`)
              );
            }
          }

          // create canvas element to host chart
          let languageCanvas = document.createElement("canvas");
          languageCanvas.setAttribute("id", `chart${repo.name}`);
          let ctx = languageCanvas.getContext("2d");

          // create chart object
          let languageChart = new Chart(ctx, {
            type: "polarArea",
            data: {
              datasets: [
                {
                  data: [],
                  backgroundColor: [],
                },
              ],
              labels: [],
            },
            options: {
              legend: {
                display: true,
                labels: {
                  fontColor: "#",
                },
              },
            },
          });

          // colors to use for chart
          let chartColors = [
            "tomato",
            "dodgerblue",
            "mediumseagreen",
            "slateblue",
            "violet",
          ];
          languagesInRepo.forEach((language) => {
            // add language to chart
            languageChart.data.labels.push(language.language);
            languageChart.data.datasets[0].data.push(language.percentage);

            // assign a different color to each language
            let colorCount =
              languageChart.data.datasets[0].backgroundColor.length;
            let color = chartColors[colorCount % chartColors.length];
            languageChart.data.datasets[0].backgroundColor.push(color);

            languageChart.update();
            modalBody.appendChild(languageCanvas);
          });

          // console.log(total);
          // console.log(languagesInRepo);
        });
    });

    cardBody.appendChild(modalButton); // add to each card button that triggers modal
    cardList.appendChild(modal); // add modal to webpage - hidden by default
    cardList.appendChild(card); // add each card to the main container
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
          reposQty.innerHTML = "";
          followersQty.innerHTML = "";

          // if data contains a key called message it means user doesn't exists
          user.classList.add("welcomeMsg");
          user.innerHTML = `User @${username} was not found!`;
        } else {
          user.classList.remove("welcomeMsg");
          user.innerHTML = `Welcome @${username}`;
          reposQty.innerHTML = `You currently have ${data.length} <strong>public</strong> projects on GitHub`;

          // get followers
          const followersUrl = `https://api.github.com/users/${username}/followers`;
          fetch(followersUrl)
            .then((res) => {
              return res.json();
            })
            .then((followers) => {
              followersQty.innerHTML = `<strong>Followers:</strong> ${followers.length}`;
            });

          showRepos(data); // if user exists, show user's repositories
        }
        welcomeMsg.innerHTML = "";
        welcomeMsg.classList.add("d-none");
      });
  } catch (error) {
    console.log(error);
    welcomeMsg.innerHTML = `Something happened: ${error}`;
  }
}

// function to handle the search user data
searchButton.addEventListener("click", (event) => {
  if (username.value != "") {
    // while input box is not empty, try to get repositories data
    getRepos(username.value); // when clicked, call the function to get the user's repositories data
    event.preventDefault(); // prevent to reload website
  } else {
    // clean page data if any & hide welcome message container
    welcomeMsg.innerHTML = "";
    welcomeMsg.classList.add("d-none");
    cardList.innerHTML = "";
    reposQty.innerHTML = "";
    followersQty.innerHTML = "";

    // display error/action message
    user.classList.add("welcomeMsg");
    user.innerHTML = "You need to enter a username";
    event.preventDefault(); // prevent to reload website
  }
});
