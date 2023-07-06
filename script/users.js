// import { async } from "regenerator-runtime";
import * as AJAX from "./api.js";
import { API_URL } from "./helpers.js";

const showUsers = document.querySelector(".show--users");
// let clicked = false;

const [data, users] = await Promise.all([
  AJAX.getPosts(API_URL),
  AJAX.getUsers(API_URL),
]);
// console.log(data);

const renderUsers = function () {
  users.map((user) => {
    const post = data.filter((post) => user.authorId === post.userId);
    console.log(post);

    const markupUser = `
        <li class="user">${user.authorName}</li>
     `;
    showUsers.insertAdjacentHTML("beforeend", markupUser);
  });
  // const show = document.querySelectorAll(".user");
  // console.log(show);
};
renderUsers();

// Event
showUsers.addEventListener("click", function (e) {
  const show = e.target.closest(".user");
  console.log(show);

  showUsers.innerHTML = "";
  // clicked = true;

  // // const markupPost = `
  // // <li>${}</li>
  // // `
});
