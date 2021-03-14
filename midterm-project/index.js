let username = document.querySelector("#username-input");
let searchButton = document.querySelector("#search-button");

async function getRepos(username) {
  const baseUrl = await `https://api.github.com/users/${username}/repos`;

  fetch(baseUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

searchButton.addEventListener("click", () => {
  getRepos(username.value);
});
