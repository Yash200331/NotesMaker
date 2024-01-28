// var closebtn = document.querySelector("#closebtn");
// var overlay = document.querySelector(".overlay");
// var maketask = document.querySelector("#maketask");
// var makeremember = document.querySelector("#makeremember");
// var vacant = document.querySelector(".vacant");
// const months = [
//   "January", "February", "March", "April", "May", "June", "July", "August",
//   "September", "October", "November", "December",
// ];

// if (localStorage.getItem("tasks") == null) {
//   localStorage.setItem("tasks", JSON.stringify([]));
// }

// closebtn.addEventListener("click", function () {
//   overlay.style.display = "none";
//   localStorage.removeItem("editedNoteIndex");
// });

// maketask.addEventListener("click", function () {
//   const valueoftitle = document.querySelector("#title").value;
//   const valueofdata = document.querySelector("#data").value;

//   let dateObj = new Date();
//   let month = months[dateObj.getMonth()];
//   let day = dateObj.getDate();
//   let year = dateObj.getFullYear();

//   const obj = {
//     title: valueoftitle,
//     data: valueofdata,
//     date: `${month} ${day}, ${year}`,
//   };

//   const allPreviousTask = localStorage.getItem("tasks");
//   const allPreviousTaskParsed = JSON.parse(allPreviousTask);
//   allPreviousTaskParsed.push(obj);
//   const allStringifyTasks = JSON.stringify(allPreviousTaskParsed);
//   localStorage.setItem("tasks", allStringifyTasks);

//   document.querySelector("#title").value = "";
//   document.querySelector("#data").value = "";

//   overlay.style.display = "none";
//   printer();
// });

// function printer() {
//   const allTasks = localStorage.getItem("tasks");
//   const parsedTask = JSON.parse(allTasks);
//   let clutter = "";

//   parsedTask.forEach(function (elem, index) {
//     clutter += ` <li class="note">
//         <div class="details">
//           <p>${elem.title}</p>
//           <span>${elem.data}</span>
//         </div>
//         <div class="bottom-content">
//           <span>${elem.date}</span>
//           <div class="settings">
//             <i onclick="editNotes(${index})" class="ri-edit-2-line"></i>
//             <i class="delete-btn ri-delete-bin-6-line" data-index="${index}"></i>
//           </div>
//         </div>
//       </li>`;
//   });

//   document.querySelector(".cards").innerHTML = clutter;

//   if (parsedTask.length > 0) {
//     vacant.style.display = "none";
//   } else {
//     vacant.style.display = "flex";
//   }

//   const deleteButtons = document.querySelectorAll(".delete-btn");

//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//       const index = event.target.getAttribute("data-index");
//       parsedTask.splice(index, 1);
//       localStorage.setItem("tasks", JSON.stringify(parsedTask));
//       printer();
//     });
//   });
// }

// printer();

var closebtn = document.querySelector("#closebtn");
var overlay = document.querySelector(".overlay");
var makeremember = document.querySelector("#makeremember");
var maketask = document.querySelector("#maketask");
var popupHeader = document.querySelector(".popupHeader");
var popupBtn = document.querySelector(".popupBtn");

var vacant = document.querySelector(".vacant");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Check if tasks exist in local storage, if not, initialize with an empty array
if (localStorage.getItem("tasks") == null) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

let isUpdate = false,
  updateId;

closebtn.addEventListener("click", function () {
  overlay.style.display = "none";
  popupHeader.innerHTML = "Make New Remember";
  popupBtn.innerHTML = "Make";
});

makeremember.addEventListener("click", function () {
  overlay.style.display = "initial";
  document.querySelector("#title").value = "";
  document.querySelector("#data").value = "";
  popupHeader.innerHTML = "Make New Remember";
  popupBtn.innerHTML = "Make";
});

maketask.addEventListener("click", function () {
  var valueoftitle = document.querySelector("#title").value;
  var valueofdata = document.querySelector("#data").value;

  let dateObj = new Date();
  (month = months[dateObj.getMonth()]),
    (day = dateObj.getDate()),
    (year = dateObj.getFullYear());

  const obj = {
    title: valueoftitle,
    data: valueofdata,
    date: `${month} ${day}, ${year}`,
  };

  const allPreviousTask = localStorage.getItem("tasks");
  const allPreviousTaskParsed = JSON.parse(allPreviousTask);
  
  if (!isUpdate) {
    allPreviousTaskParsed.push(obj);
  } else {
    allPreviousTaskParsed[updateId] = obj;
    isUpdate = false; // Reset the update flag after updating the task
  }
  
  const allStringifyTasks = JSON.stringify(allPreviousTaskParsed);
  localStorage.setItem("tasks", allStringifyTasks);

  document.querySelector("#title").value = "";
  document.querySelector("#data").value = "";

  overlay.style.display = "none";

  printer();
});


function printer() {
  const allTasks = localStorage.getItem("tasks");
  const parsedTask = JSON.parse(allTasks);
  var clutter = "";

  // Generate HTML for each task including a delete button
  parsedTask.forEach(function (elem, index) {
    clutter += ` <li class="note">
        <div class="details">
          <p>${elem.title}</p>
          <span 
            >${elem.data}</span
          >
        </div>
        <div class="bottom-content">
          <span>${elem.date}</span>
          <div class="settings">
            <i onclick="editNotes(${index}, '${elem.title}', '${elem.data}')" class=" ri-edit-2-line"></i>
            <i class="delete-btn ri-delete-bin-6-line" data-index="${index}" ></i>
          </div>
        </div>
      </li>`;
  });

  // Update the cards container with generated HTML
  document.querySelector(".cards").innerHTML = clutter;

  // Show/hide the vacant message based on tasks
  if (parsedTask.length > 0) {
    vacant.style.display = "none";
  } else {
    vacant.style.display = "flex";
  }

  // Get all delete buttons after printing tasks
  const deleteButtons = document.querySelectorAll(".delete-btn");

  // Add event listeners to delete buttons
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const index = event.target.getAttribute("data-index");
      parsedTask.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(parsedTask));
      printer(); // Repaint the tasks after deletion
    });
  });
}
function editNotes(index, title, data) {
  isUpdate = true;
  updateId = index;
  makeremember.click(); // Opens the overlay for making a new note
  document.querySelector("#title").value = title;
  document.querySelector("#data").value = data;
  popupHeader.innerHTML = "Update Remember";
  popupBtn.innerHTML = "Update";
}

printer(); // Call printer initially to display tasks
