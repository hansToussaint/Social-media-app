// Get requests
export const getPosts = async function (url) {
  try {
    const response1 = await fetch(`${url}/posts`);

    const data1 = await response1.json();

    if (!response1.ok) throw new Error("We cannot find posts!");

    return data1;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async function (url) {
  try {
    //1) Get users
    const response2 = await fetch(`${url}/users`);

    const data2 = await response2.json();

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

// Post request
export const sendPost = async function (url, upload) {
  try {
    //sending data
    const response = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upload),
    });

    const data = await response.json();

    if (!response.ok) throw new Error("We cannot find posts!");

    return data;
  } catch (error) {
    console.log(error);
  }
};

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
