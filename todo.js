document.addEventListener("All cards rendered", () => {
  const todoBox = document.querySelector(".todo");

  if (!todoBox) return;

  todoBox.innerHTML = `<h3 class="todoHeading">To-Do List</h3>
                        <div class="overview"></div>`;

  todoBox.addEventListener("click", () => {
    const pandora = document.querySelector(".pandora-box");
    if (pandora) pandora.style.display = "flex";
  });

  if (typeof addTask === "function" && typeof handleSubmit === "function") {
    addTask();
    handleSubmit();
    updateUi();
  }
});

let listItem = [];

function updateUi() {
  showList();
  taskOverview();
  showComplete()
}

function taskOverview() {
  const overview = document.querySelector(".overview");

  if (!overview) return;

  const listOverview = JSON.parse(localStorage.getItem("task")) || [];

  overview.innerHTML = listOverview
    .map((item) => {
      return `<p>${item.task}</p>`;
    })
    .join("");
}

function showList() {
  const data = document.querySelector(".listData");

  const listData = JSON.parse(localStorage.getItem("task")) || [];

  if (data) {
    data.innerHTML = listData
      .map((item) => {
        if(item.isComplete !== true){

          return `<div class="list-items" data-id=${item.id}>
                  <h5 class="task-name">${item.task}</h5>
                  <div class="task-btn">
                    <button class="imp-pills" onclick="handleImportant(${item.id})" title="Important" >${item.isImportant ? '<i class="fa-solid fa-star filled-star"></i>':'<i class="fa-regular fa-star blank-star"></i>'}</button>
                    <button class="done-pills" title="Complete" onclick="handleComplete(${item.id})"><i class="fa-solid fa-check"></i></button>
                    <button class="edit-task" onclick="handleEdit(${item.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="delete-task" onclick="handleDelete(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                  </div>
                </div>
            `;
        }
      })
      .join("");
  }
}

function addTask() {
  const pandora = document.querySelector(".pandora-box");

  if (!pandora) return;

  pandora.innerHTML = `
    <div class="todo-form">
            <p class="todoClose">X</p>
            <h1 class="todo-heading">Add Task</h1>
            <div class="todoNav">
                <input type="text" placeholder="Enter your list..." class="list-note">
                <button class="add-list">Add</button>
            </div>
            <div class="task-category">
              <div class="listData"></div>
            <div class="movedList">
            <h1 class="todo-heading">Completed Task</h1>
            <div class="showComplete"></div>
            </div>
            </div>
        </div>
    `;
  const closeBtn = document.querySelector(".todoClose");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => (pandora.style.display = "none"));
  }
}

function handleSubmit() {
  const inputBox = document.querySelector(".list-note");
  const addBtn = document.querySelector(".add-list");

  if (!inputBox || !addBtn) return;

  addBtn.addEventListener("click", () => {
    let task = inputBox.value;

    if (task.trim() === "") {
      alert("Task box can not be empty...");
      inputBox.value = "";
      return;
    }

    const obj = {
      id: Date.now(),
      task,
      isImportant: false,
      isComplete: false
    };

    listItem.push(obj);

    inputBox.value = "";

    let oldTask = JSON.parse(localStorage.getItem("task")) || [];

    let updatedTaskList = [...oldTask, ...listItem];

    localStorage.setItem("task", JSON.stringify(updatedTaskList));

    listItem = [];

    updateUi();
  });
}

function handleImportant(id){
  const styleImp = document.querySelector(".task-name")
  const markImp = JSON.parse(localStorage.getItem("task")) || [];

  const updateImp = markImp.map((item)=>{
    if(item.id === id){
      return {...item, isImportant: !item.isImportant}
    }
    return item;
  })
  
  localStorage.setItem("task", JSON.stringify(updateImp))
  updateUi()
}

function handleComplete(id){
  const markDone = JSON.parse(localStorage.getItem("task"));

  const updateDone = markDone.map((item)=>{
    if(item.id === id){
      return {...item, isComplete: !item.isComplete}
    }
    return item;
  })
  localStorage.setItem("task", JSON.stringify(updateDone));
  updateUi();
}

function showComplete(){
  const completeList =document.querySelector(".showComplete");

  const finishedList = JSON.parse(localStorage.getItem("task")) || [];

  const filteredList = finishedList.filter((item)=> item.isComplete === true);
  if(filteredList.length > 0){
    completeList.innerHTML = filteredList.map((item)=>{
      return `<div class="list-items" data-id=${item.id}>
               <h5 class="task-name">${item.task}</h5>
               <div class="task-btn">
                   <button class="done-pills" title="Complete" onclick="handleComplete(${item.id})">${item.isComplete ? '<i class="fa-solid fa-check-double fill-done"></i>' : '<i class="fa-solid fa-check"></i>'}</button>
                   <button class="delete-task" onclick="handleDelete(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
               </div>
              </div>`
    }).join("")
  }else{
    completeList.innerHTML = `<div class="sorryMsg"><p>Ah.... you have not completed any Task yet!!!😔</p></div>`
  }
}

function handleEdit(id) {
  const listData = JSON.parse(localStorage.getItem("task")) || [];

  const selectedItem = listData.find((item) => item.id === id);
  if (!selectedItem) return;

  let newTaskText = prompt("Edit your task:", selectedItem.task);

  if (newTaskText === null) return;

  newTaskText = newTaskText.trim();

  if (newTaskText === "") {
    alert("Task can not be empty!");
    return;
  }

  newTaskList = listData.map((item) => {
    if (item.id === id) {
      return { ...item, task: newTaskText };
    }
    return item;
  });

  localStorage.setItem("task", JSON.stringify(newTaskList));

  updateUi();
}

function handleDelete(id) {
  const listData = JSON.parse(localStorage.getItem("task")) || [];

  const newList = listData.filter((item) => item.id !== id);

  localStorage.setItem("task", JSON.stringify(newList));

  updateUi();
}