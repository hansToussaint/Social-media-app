// Getting each user
export const getUserById = async function (url, id) {
  try {
    const response3 = await fetch(`${url}/users/${id}`);
    const data3 = await response3.json();

    if (!response3.ok) throw new Error("we Cannot get this user");

    return data3;
  } catch (error) {
    console.error(error);
  }
};

//
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
    // // 2) Render users
    // renderUsers(infoUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getPosts = async function (url) {
  try {
    // 1) Render spinner
    // renderSpinner(postsContainer);

    // 2) Get posts
    const response1 = await fetch(`${url}/posts`);

    const data1 = await response1.json();

    if (!response1.ok) throw new Error("We cannot find posts!");
    // console.log(data1);

    return data1;
    // 3)Render posts
    // renderPost(data1);

    // // 4) remove spinner
    // const spinner = document.querySelector(".lds-ring");
    // spinner.classList.add("hidden");
  } catch (error) {
    console.error(error);
  }
};

export const sendPost = async function (url, upload) {
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
    // renderPost(dataArray);
  } catch (error) {
    console.log(error);
  }
};

export const renderSpinner = function (parentElement) {
  const markup = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};
