// import { async } from "regenerator-runtime";
import * as AJAX from "./api.js";
import { API_URL } from "./helpers.js";

const showUsers = document.querySelector(".show--users");

const [data, users] = await Promise.all([
  AJAX.getPosts(API_URL),
  AJAX.getUsers(API_URL),
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
  const postsSingleUser = data.filter((post) => post.userId === +userId);

  postsSingleUser.map((post) => {
    const markupPosts = `
    <li class="single-post">${post.title}</li>
    `;
    showUsers.insertAdjacentHTML("beforeend", markupPosts);
  });
};

// Event
showUsers.addEventListener("click", function (e) {
  const user = e.target.closest(".user");

  console.log(user.id);
  showUsers.innerHTML = "";
  showPostsSingleUser(user.id);
});
