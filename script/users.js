// import { async } from "regenerator-runtime";
import { getUsers } from "./api.js";
import { API_URL } from "./helpers.js";

const showUsers = document.querySelector(".show--users");

const renderUsers = async function () {
  const data = await getUsers(API_URL);
  console.log(data);

  data.map((element) => {
    const markup = `
       <li>${element.authorName}</li>
    `;

    showUsers.insertAdjacentHTML("afterbegin", markup);
  });
};
renderUsers();
