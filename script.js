"use strict";

const postsContainer = document.querySelector(".posts__list");
const postTitle = document.getElementById("post--title");
const postAuthor = document.getElementById("post--author");
const postContent = document.getElementById("post--content");
const savePost = document.querySelector(".save");
let clicked = false;

const API_URL = "https://jsonplaceholder.typicode.com";

const renderSpinner = function (parentElement) {
  const markup = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const getPosts = async function (url) {
  try {
    // 1) loading posts
    const response1 = await fetch(`${url}/posts`);

    const data1 = await response1.json();

    // !data1 ? renderSpinner(postsContainer) : "";

    if (!response1.ok) throw new Error("We cannot find posts!");
    // console.log(data1);

    return data1;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async function (url) {
  try {
    //1) loading users
    const response2 = await fetch(`${url}/users`);

    const data2 = await response2.json();

    // data2.length < 0 ? renderSpinner(postAuthor) : "";

    if (!response2.ok) throw new Error("We cannot find the author");

    const infoUsers = data2.map((element) => {
      return {
        authorId: element.id,
        authorName: element.name,
      };
    });

    return infoUsers;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async function (url, id) {
  try {
    const response3 = await fetch(`${url}/users/${id}`);
    const data3 = await response3.json();

    if (!response3.ok) throw new Error("we Cannot get this user");

    return data3;
  } catch (error) {
    console.error(error);
  }
};

const sendPost = async function (url, upload) {
  try {
    //sending data
    const response1 = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upload),
    });

    const data1 = await response1.json();
    const dataArray = [];
    dataArray.push(data1);

    // console.log(dataArray);

    if (!response1.ok) throw new Error("We cannot find posts!");

    //Render new post
    renderPost(dataArray);
  } catch (error) {
    console.log(error);
  }
};

// render

const renderUsers = async function () {
  const infoUsers = await getUsers(API_URL);

  infoUsers.map((element) => {
    let option = document.createElement("option");
    option.value = `${element.authorId}`;
    option.text = `${element.authorName}`;

    option.classList.add("author");

    postAuthor.add(option);
  });
};
await renderUsers();

const renderPost = async function () {
  const data = await getPosts(API_URL);
  // console.log(data);

  data
    .map(async (element) => {
      const user = await getUserById(API_URL, element.userId);
      // console.log();

      const markup = `

    <div class="posts--box">
      <article class="post--article">
        <h3>${element.title}</h3>

        <div>
          <span> by ${user.name}</span>
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
      return postsContainer.insertAdjacentHTML("afterbegin", markup);
    })
    .join("");
};
await renderPost();

// Event handlers
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
