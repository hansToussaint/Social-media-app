export const API_URL = "https://jsonplaceholder.typicode.com";

// Spinner to display while waiting for data
export const renderSpinner = function (parentElement) {
  const markup = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

export const removeSpinner = function () {
  const spinner = document.querySelector(".lds-ring");
  spinner.classList.add("hidden");
};

//
export const generalMarkup = function (markupData) {
  const { parentElement, title, body, user, id } = markupData;

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
          <button id=${id} class="view--post">View Post</button>
        </article>
      </div>
      `;
  parentElement.insertAdjacentHTML("afterbegin", markup);
};
