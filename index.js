const fetchPromise = fetch("https://jsonplaceholder.typicode.com/posts"); //fetch posts data from api
let arrayOfPosts = [];

document.addEventListener("DOMContentLoaded", function () {
  fetchPromise
    .then((response) => response.json())
    .then((posts) => {
      //display posts data in table body
      arrayOfPosts = posts;
      const postTableBody = document.getElementById("postTableBody");
      posts.map((post, index) => {
        const row = document.createElement("tr"); //create a new row in table body
        row.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${
          post.body
        }</td><div class = 'btnContainer'><button onclick = editPost(${
          index + 1
        })>Edit</button><button onclick = deletePost(${
          index + 1
        })>Delete</button></div>`;
        // row.addEventListener("click", () =>
        //   displayPostData(index + 1, post.title, post.body)
        // );
        postTableBody.appendChild(row); //add the row in the table body
      });
    })
    .catch((error) => console.log("Error during fetching data", error));
});

//open a popup box
function openPopUp(content) {
  const popUpBox = document.getElementById("popUpBox");
  popUpBox.style.display = "flex";
  popUpBox.innerHTML = content;
  return popUpBox;
}

//close the popup box
function closePopUp() {
  popUpBox.style.display = "none";
}

//display post data in  popUp window
function displayPostData(rowNumber, title, body) {
  const popUpContent = `<span onclick = "closePopUp()">&times;</span><h2>Row ${rowNumber}</h2><p>${title}</p><p>${body}</p>`;
  openPopUp(popUpContent);
}

// create new post
function createNewRow(post, rowNumber) {
  const row = document.createElement("tr"); //create a new row in table body
  row.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${post.body}</td><button onclick = editPost(${rowNumber})>Edit</button><button onclick = deletePost(${rowNumber})>Delete</button>`;
  return row;
}

//add new post
function addNewPost() {
  const popUpContent = `
        <h2><span onclick = "closePopUp()" class = "closeBtn">&times;</span>Add New Post</h2>
        <form onsubmit="saveNewPost(event)">
            <label for="newTitle">Title:</label>
            <input type="text" id="newTitle" required>
            <br>
            <label for="newBody">Body:</label>
            <input type="text" id="newBody" required></input>
            <br>
            <button type="submit">Save</button>
        </form>
    `;
  openPopUp(popUpContent);
}

// Save new post in the list
function saveNewPost(event) {
  event.preventDefault();
  const newTitle = document.getElementById("newTitle").value; // Getting the new body and new title data from the form
  const newBody = document.getElementById("newBody").value;
  const newId = arrayOfPosts[arrayOfPosts.length - 1].id + 1;
  console.log("im new", newId);
  const newPost = {
    title: newTitle,
    body: newBody,
    id: newId,
  };

  const newRow = createNewRow(newPost, newPost.id);
  postTableBody.appendChild(newRow);
  arrayOfPosts.push(newPost);
  alert("New post is successfully added");
  closePopUp();
}

//edit an existing post
function editPost(rowNumber) {
  const rowIndex = rowNumber - 1;
  const rowData = arrayOfPosts[rowIndex];
  const popUpContent = `
       <h2><span onclick = "closePopUp()" class = "closeBtn">&times;</span>Edit post${rowNumber}</h2>
        <div class = 'formField'><label for= 'editedTitle'>Title:</label>
        <input type = 'text' id="editedTitle" value = ${rowData.title}/></div>
        <br>
        <div class = 'formField'>
        <label for= 'editedBody' >Body:</label>
        <input type ='text' id = 'editedBody' value =${rowData.body}/>
        </div>
        <button onclick = "saveEditedPost(${rowNumber}); return false;">Save</button>`;
  openPopUp(popUpContent);
}

//save the updated/edited post
function saveEditedPost(rowNumber) {
  const rowIndex = rowNumber - 1;
  const editedTitle = document.getElementById("editedTitle").value;
  const editedBody = document.getElementById("editedBody").value;
  arrayOfPosts[rowIndex].title = editedTitle;
  arrayOfPosts[rowIndex].body = editedBody;
  updatedTableData();
  alert(`Post ${rowNumber} updated succesfully`);
  closePopUp();
}

//Delete existing post
function deletePost(rowNumber) {
  const userConfirmation = confirm(
    `Are you sure you want to delete post ${rowNumber}?`
  );
  if (userConfirmation) {
    const rowToDelete = rowNumber - 1;
    arrayOfPosts.splice(rowToDelete, 1); //delete the row from existing data
    updatedTableData();
    alert(`Post ${rowNumber} is successfully deleted`);
  }
}

function updatedTableData() {
  postTableBody.innerHTML = "";
  arrayOfPosts.map((post, index) => {
    const row = createNewRow(post, index + 1);
    postTableBody.appendChild(row);
  });
}
