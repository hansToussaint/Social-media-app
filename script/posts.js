import * as AJAX from "./api.js";
import * as helpers from "./helpers.js";

const formContainer = document.querySelector(".posts__form");

const postsContainer = document.querySelector(".posts__list");
const postTitle = document.getElementById("post--title");
const postAuthor = document.getElementById("post--author");
const postContent = document.getElementById("post--content");
const savePost = document.querySelector(".save");

let clicked = false;

const [data, users] = await Promise.all([
  AJAX.getPosts(helpers.API_URL),
  AJAX.getUsers(helpers.API_URL),
]);

// functions to render

const renderUsers = async function () {
  const infoUsers = await AJAX.getUsers(helpers.API_URL);

  infoUsers.map((element) => {
    let option = document.createElement("option");
    option.value = `${element.authorId}`;
    option.text = `${element.authorName}`;

    option.classList.add("author");

    postAuthor.append(option);
  });
};
await renderUsers();

// Renser post from API
const renderPost = async function () {
  // spinner
  helpers.renderSpinner(postsContainer);

  // console.log(data);

  data
    .map((element) => {
      const user = users.find((user) => element.userId === user.authorId);

      const markupObject = {
        parentElement: postsContainer,
        title: element.title,
        body: element.body,
        user: user.authorName,
        id: element.id,
      };

      helpers.generalMarkup(markupObject);
    })
    .join("");

  // remove spinner
  helpers.removeSpinner();
};
await renderPost();

// Render new post/createpost
const renderNewPost = async function (dataToUpload) {
  const data = await AJAX.sendPost(helpers.API_URL, dataToUpload);
  // console.log("data:", data);
  // console.log(
  //   "data to Upload to the API and to post as new post:",
  //   dataToUpload
  // );

  const markupObject = {
    parentElement: postsContainer,
    title: data.title,
    body: data.body,
    user: data.author,
    id: data.id,
  };

  helpers.generalMarkup(markupObject);
};

//
const singlePost = async function (id) {
  //
  const post = data.find((el) => el.id === id);

  const user = users.find((user) => post.userId === user.authorId);

  const markupObject = {
    parentElement: formContainer,
    title: post.title,
    body: post.body,
    user: user.authorName,
    id: post.id,
  };

  helpers.generalMarkup(markupObject);
};

// functions to display the icons
const click = function (btn, str) {
  let number = 0;

  if (!clicked) {
    btn.classList.add("clicked");
    number++;
    // numElement.textContent = number;
    str.textContent = `${str.textContent.split(" ")[0]} ${number}`;
    clicked = !clicked;
  }

  //
  else {
    btn.classList.remove("cliked");
    number;
    // numElement.textContent = number;
    str.textContent = `${str.textContent.split(" ")[0]} ${number}`;
    clicked = !clicked;
  }
};

// /////////////Event handlers/////////

// general
savePost.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataArray = [...new FormData(this)];
  const dataForm = Object.fromEntries(dataArray);

  const dataToPost = {
    body: dataForm.content,
    title: dataForm.title,
    author: postAuthor.options[postAuthor.selectedIndex].textContent,
  };

  if (postTitle.value !== "" && postContent.value !== "")
    renderNewPost(dataToPost);

  // postAuthor.textContent = "";
  postTitle.value = "";
  postContent.value = "";
});

postsContainer.addEventListener("click", function (e) {
  const btnIcons = e.target.closest(".post--icons");
  const btnViewPost = e.target.closest(".view--post");

  // const numElement = btnIcons.querySelector(".num");
  const numElement = btnIcons;

  if (!btnIcons && !btnViewPost) return;

  if (btnIcons) click(btnIcons, numElement);

  if (btnViewPost) {
    formContainer.innerHTML = "";
    postsContainer.innerHTML = "";

    // spinner
    helpers.renderSpinner(formContainer);

    singlePost(+btnViewPost.id);

    // remove spinner
    helpers.removeSpinner();
  }
});
