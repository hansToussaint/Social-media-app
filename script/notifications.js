// import { async } from "regenerator-runtime";
import { getPosts, getUsers } from "./api.js";
import { API_URL } from "./helpers.js";

const notificationsContainer = document.querySelector(
  ".notifications--container"
);

const renderNotifications = async function () {
  const [data, users] = await Promise.all([
    getPosts(API_URL),
    getUsers(API_URL),
  ]);

  data.map((post) => {
    const user = users.find((item) => item.authorId === post.userId);

    const markup = `
        <div>
          <h3>
            <span class="notification--author">${user.authorName}</span> published a
            new Post
          </h3>
          <i>${post.title}</i>
        </div>
      `;

    notificationsContainer.insertAdjacentHTML("afterbegin", markup);
  });
};
renderNotifications();
