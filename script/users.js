// import { async } from "regenerator-runtime";
import * as AJAX from "./api.js";
import * as helpers from "./helpers.js";

const showUsers = document.querySelector(".show--users");
const infoPage = document.querySelector("h2");

const [data, users] = await Promise.all([
  AJAX.getPosts(helpers.API_URL),
  AJAX.getUsers(helpers.API_URL),
]);
// console.log(data);

const renderUsers = function () {
  users.map((user) => {
    const markupUser = `
        <li class="user" id=${user.authorId}>${user.authorName}</li>
     `;

    showUsers.insertAdjacentHTML("beforeend", markupUser);
  });
};
renderUsers();

const showPostsSingleUser = function (userId) {
  showUsers.innerHTML = "";

  const postsSingleUser = data.filter((post) => post.userId === +userId);

  postsSingleUser.map((post) => {
    const markupPosts = `
    <li id=${post.id} class="single-post">${post.title}</li>
    `;

    showUsers.insertAdjacentHTML("beforeend", markupPosts);
  });
};

//
const singlePost = async function (id) {
  infoPage.innerHTML = "";

  // render spinner
  helpers.renderSpinner(showUsers);

  //
  const post = data.find((el) => el.id === id);

  const user = users.find((user) => post.userId === user.authorId);

  const markupObject = {
    parentElement: showUsers,
    title: post.title,
    body: post.body,
    user: user.authorName,
    id: post.id,
  };

  // console.log(markupObject);
  helpers.generalMarkup(markupObject);

  // remove spinner
  helpers.removeSpinner();
};

// Event handlers
const allUsers = document.querySelectorAll(".user");

allUsers.forEach((user) =>
  user.addEventListener("click", () => showPostsSingleUser(user.id))
);

showUsers.addEventListener("click", function (e) {
  const post = e.target.closest(".single-post");

  if (!post) return;

  singlePost(+post.id);
});
