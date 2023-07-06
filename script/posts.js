import * as AJAX from "./api.js";
import { API_URL } from "./helpers.js";

const postsContainer = document.querySelector(".posts__list");
const postTitle = document.getElementById("post--title");
const postAuthor = document.getElementById("post--author");
const postContent = document.getElementById("post--content");
const savePost = document.querySelector(".save");

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

const renderPost = async function () {
  // spinner
  AJAX.renderSpinner(postsContainer);

  // const data = await AJAX.getPosts(API_URL);
  // const users = await AJAX.getUsers(API_URL);

  const [data, users] = await Promise.all([
    AJAX.getPosts(API_URL),
    AJAX.getUsers(API_URL),
  ]);
  // console.log(data);

  data
    .map((element) => {
      const user = users.find((user) => element.userId === user.authorId);

      console.log(user);

      const markup = `

    <div class="posts--box">
      <article class="post--article">
        <h3>${element.title}</h3>

        <div>
          <span> by ${user.authorName}</span>
          <span>
            <i> about 1 hour ago</i>
          </span>
        </div>

        <p class="post--text">${element.body}</p>

        <div>
          <button class="post--icons">👍 <span class="num">0</span></button>
          <button class="post--icons">🎉 0</button>
          <button class="post--icons">💓 0</button>
          <button class="post--icons">🚀 0</button>
          <button class="post--icons">👀 0</button>
        </div>
        <button class="view--post">View Post</button>
      </article>
    </div>
    `;
      postsContainer.insertAdjacentHTML("afterbegin", markup);
    })
    .join("");

  // 4) remove spinner
  AJAX.removeSpinner();
};
await renderPost();

//

// /////////////Event handlers/////////

// others pages

// nav.addEventListener("click", function (e) {
//   const postsPage = e.target.closest(".posts--page");
//   const usersPage = e.target.closest(".users--page");
//   const notificationsPage = e.target.closest(".notifications--page");

//   if (!postsPage && !usersPage && !notificationsPage) return;
// });

// general
savePost.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataArray = [...new FormData(this)];
  const data = Object.fromEntries(dataArray);

  const dataToPost = {
    body: data.content,
    title: data.title,
    // userId: 1,
    // author:
  };

  sendPost(API_URL, dataToPost);

  // postAuthor.value = "";
  postTitle.value = "";
  postContent.value = "";
});

postsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".post--icons");

  if (!btn) return;

  console.log(e);
});
