const textInput = document.getElementById("display");
const list = document.getElementById("list-container");
const btn = document.querySelector(".clear-btn");
const allBtn = document.querySelector(".all-list");
const activeBtn = document.querySelector(".active-list");
const completeBtn = document.querySelector(".complete-list");
const filterTabs = document.querySelectorAll(".tab")
const selectAllIcon = document.querySelector(".selectall");

let itemCount = document.querySelector('.item-count')
let currentCategory = 'All';
let taskArr = [];

function addTask(taskInput) {
  taskArr.push({ task: taskInput, status: "Active" });
  // console.log(taskArr);
  renderTask(taskArr); // calling to display the list
}

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (textInput.value === "") {
      alert("Enter something");
    } else {
      addTask(textInput.value);
      textInput.value = "";
    }
  }
});

function renderTask(taskArrInput) {
  //   creating the <li> list onto the page
  const list = document.getElementById("list-container");
  list.innerHTML = "";

  taskArrByCategory = fetchTaskArrayByCategory(taskArrInput, currentCategory);

  taskArrByCategory.forEach((displayTask, index) => {
    let listItem = document.createElement("li");
    const isCompleted = displayTask.status === 'Completed';
    listItem.innerHTML =
      `<div style="display:flex">
        <input type="checkbox" id="checkbox-${index}" ${isCompleted ? 'checked' : ''} /> 
        <li for="checkbox-${index}" class=${isCompleted ? 'strike' : ''}>${displayTask.task}</li>
        <button class="delete" onclick="deleteTask()" data-index=${index}>\u00d7</button>
      </div>`;
    list.appendChild(listItem);

    //checking the checkbox value(true or false)
    const checkbox = listItem.querySelector(`#checkbox-${index}`);
    // Adding event listener to the checkbox
    checkbox.addEventListener("change", (e) => {
      toggleTask(index)
    });
    footer.style.display = "block";
    selectAllIcon.style.display = taskArrByCategory.length > 0 ? "block" : "none";
    textInput.style.paddingLeft = taskArrByCategory.length > 0 ? "50px" : "20px";
  });

  updateActiveCount();
  updateCurrentTab();
}

// checks the status of the tasks
function toggleTask(id) {
  for (let i = 0; i < taskArr.length; i++) {
    if (i == id) {
       taskArr[i].status = taskArr[i].status === 'Active'? "Completed" : "Active";
    }
  }
  renderTask(taskArr);
}

function fetchTaskArrayByCategory(taskArr, category) {
  let filteredTaskArray = taskArr;
  if (category === "All") {
    filteredTaskArray = taskArr;
  } else {
    filteredTaskArray = taskArr.filter((item) => item.status === category);
  }

  return filteredTaskArray;
}

// adding selection to the toogle on selection.
function updateCurrentTab() {
  filterTabs.forEach(filterNode => {
    const { filter } = filterNode.dataset;
    // console.log(filter);
    // console.log(currentCategory);
    
    if (currentCategory === filter) {
      filterNode.classList.add('selected-border');
    } else {
      filterNode.classList.remove('selected-border');
    }

  })
}

function updateActiveCount() {
  let count = taskArr.filter((task) => task.status === 'Active').length;
  itemCount.textContent = count +" "+"items left ";
  // console.log(count); 
}

// cross button with the <li> to delete task based on theier index value
function deleteTask() {
  const { index } = event.target.dataset;
//   console.log(event);
  taskArr.splice(index, 1);
  renderTask(taskArr);
}

// "clear completed" button on the footer section to remove completed tasks
  btn.addEventListener("click", () => {
    taskArr = taskArr.filter(task => task.status !== 'Completed');
    console.log(taskArr);
    renderTask(taskArr);

});

activeBtn.addEventListener("click", (e) => {
  currentCategory = 'Active';
  // Filter the tasks for only active tasks
  filteredTask = taskArr.filter((task) => task.status == "Active");

  renderTask(filteredTask);
});

completeBtn.addEventListener("click", (e) => {
  currentCategory = 'Completed';
  // Filter the tasks for only completed tasks
  filteredTask = taskArr.filter((task) => task.status == "Completed");
  renderTask(filteredTask);
});

allBtn.addEventListener("click", (e) => {
  currentCategory = 'All';
  renderTask(taskArr);
});

// "Select-all" icon for checking and unchecking the list items
selectAllIcon.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = !checkbox.checked;
  });
  updateTaskStatus();
});
function updateTaskStatus() {
  taskArr.forEach((task, index) => {
    const checkbox = document.getElementById(`checkbox-${index}`);
    task.status = checkbox.checked ? "Completed" : "Active";
  });
  renderTask(taskArr);
  updateActiveCount();
}

