import * as AJAX from "./api.js";
import { API_URL } from "./helpers.js";

const postsContainer = document.querySelector(".posts__list");
const postTitle = document.getElementById("post--title");
const postAuthor = document.getElementById("post--author");
const postContent = document.getElementById("post--content");
const savePost = document.querySelector(".save");

let clicked = false;
// const nav = document.querySelector(".nav__list");

// functions to render

const renderUsers = async function () {
  const infoUsers = await AJAX.getUsers(API_URL);

  infoUsers.map((element) => {
    let option = document.createElement("option");
    option.value = `${element.authorId}`;
    option.text = `${element.authorName}`;

    option.classList.add("author");

    postAuthor.append(option);
  });
};
await renderUsers();

const generalMArkup = function (title, body, user) {
  const markup = `

    <div class="posts--box">
      <article class="post--article">
        <h3>${title}</h3>

        <div>
          <span> by ${user}</span>
          <span>
            <i> about 1 hour ago</i>
          </span>
        </div>

        <p class="post--text">${body}</p>

        <div>
          <button class="post--icons">👍 <span class="num">0</span></button>
          <button class="post--icons">🎉 <span class="num">0</span></button>
          <button class="post--icons">💓 <span class="num">0</span></button>
          <button class="post--icons">🚀 <span class="num">0</span></button>
          <button class="post--icons">👀 <span class="num">0</span></button>
        </div>
        <button class="view--post">View Post</button>
      </article>
    </div>
    `;
  postsContainer.insertAdjacentHTML("afterbegin", markup);
};

// Renser post from API
const renderPost = async function () {
  // spinner
  AJAX.renderSpinner(postsContainer);

  const [data, users] = await Promise.all([
    AJAX.getPosts(API_URL),
    AJAX.getUsers(API_URL),
  ]);
  // console.log(data);

  data
    .map((element) => {
      const user = users.find((user) => element.userId === user.authorId);

      generalMArkup(element.title, element.body, user.authorName);
    })
    .join("");

  // 4) remove spinner
  AJAX.removeSpinner();
};
await renderPost();

// Render new post/createpost
const renderNewPost = async function (dataToUpload) {
  const data = await AJAX.sendPost(API_URL, dataToUpload);
  // console.log("data:", data);
  // console.log(
  //   "data to Upload to the API and to post as new post:",
  //   dataToUpload
  // );

  generalMArkup(data.title, data.body, data.author);
};

// functions to display the icons
const click = function (btn, numElement) {
  let number = 0;

  if (!clicked) {
    btn.classList.add("clicked");
    number++;
    numElement.textContent = number;
    clicked = !clicked;
  }

  //
  else {
    btn.classList.remove("cliked");
    number;
    numElement.textContent = number;
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
  const btn = e.target.closest(".post--icons");

  const numElement = btn.querySelector(".num");

  if (!btn) return;

  click(btn, numElement);
});
