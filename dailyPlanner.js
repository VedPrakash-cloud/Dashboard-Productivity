document.addEventListener("All cards rendered", () => {
  const plannerHeading = document.querySelector(".daily-planner");
  const pandoraBox = document.querySelector(".planner-pandora");

  if (!plannerHeading || !pandoraBox) return;

  plannerHeading.innerHTML = `<h3 class="planner-heading">Daily Planner</h3>`;

  const initialNow = new Date();
        const initialHours = initialNow.getHours();
        let displayHour = initialHours % 12;
        const initialMinutes = initialNow.getMinutes();
        const option = { weekday: "long", day: "numeric", month: "long" };
        const initialToday = new Date().toLocaleDateString("en-US", option);

        if (displayHour === 0) {
          displayHour = 12;
        }

        const ampm = initialHours >= 12 ? "PM" : "AM";

  pandoraBox.innerHTML = `<div class="blackhole">
                                <div class="plannerHead">
                                  <div class="day-time">
                                    <h2>${displayHour.toString().padStart(2, "0")}:${initialMinutes.toString().padStart(2, "0")} ${ampm}</h2>
                                    <h3>${initialToday}</h3>
                                  </div>
                                  <p class="plannerClose">X</p>
                                </div>
                                <div class="boxes">
                                  <div class="leftSide-container"></div>
                                  <div class="rightSide-container"></div>
                                </div>
                            </div>`;

  if (typeof ui === 'function' && typeof handleOutput === 'function') {
    ui();
    handleOutput();
  }

  plannerHeading.addEventListener("click", () => {
    pandoraBox.style.display = "flex";
  });
  
  const closeBtn = document.querySelector(".plannerClose");
  closeBtn.addEventListener("click", ()=>{
    pandoraBox.style.display = "none";
  })
});

function ui(){
  let timeslot = ["00:00 AM", "01:00 AM", "02:00 AM", "03:00 AM","04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]


  const leftContainer = document.querySelector(".leftSide-container");

  if(!leftContainer) return;

  if(leftContainer){
    leftContainer.innerHTML = `
    <form class="pendingTask">
      <select class = "hourSpan">
        ${timeslot.map((times)=>(
          `<option value ="${times}">${times}</option>`
        )).join("")}
      </select>
      <textarea type="text" placeholder="Enter your plan for the day..." class="agenda"></textarea>
      <button type="submit" class="addPlan">Add</button>
    </form>
  `
  handleFormSubmit();
  }
}

function handleFormSubmit(){
  const formSubmit = document.querySelector(".pendingTask");
  const hour = document.querySelector(".hourSpan");
  const inputText = document.querySelector(".agenda")

  formSubmit.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputText.value.trim() === "") return;
    let obj ={
      id: Date.now(),
      time:hour.value,
      agenda:inputText.value
    }
    const oldTask = JSON.parse(localStorage.getItem("planOfAction")) || [];
    oldTask.push(obj);
    localStorage.setItem("planOfAction", JSON.stringify(oldTask));
    inputText.value =""
    hour.selectedIndex = 0;
    handleOutput();
  })
}

function handleOutput(){
  const rightContainer = document.querySelector(".rightSide-container");
  const taskList = JSON.parse(localStorage.getItem("planOfAction")) || [];
  
  if(!rightContainer) return;

  if(rightContainer){
    rightContainer.innerHTML =taskList.map((listItem)=>(
      `<div class="agenda-panel" data-id=${listItem.id}>
          <div class="panelOutput">
            <h4>${listItem.time}</h4>
            <p>${listItem.agenda}</p>
          </div>
          <div class="panelBtn">
            <button class="editPanel"onclick="handleEdit(event,${listItem.id})">Edit</button>
            <button class="delPanel" onclick="handleDelete(${listItem.id})">Delete</button>
          </div>
      </div>`
    )).join("")
  }
}

function handleDelete(id){
  const filterList = JSON.parse(localStorage.getItem("planOfAction"))||[];
  
  const updatedList = filterList.filter((item)=> item.id !== id);

  localStorage.setItem("planOfAction", JSON.stringify(updatedList));
  handleOutput();
}

function handleEdit(e,id){
  const editList = JSON.parse(localStorage.getItem("planOfAction")) || [];

  const updateEditedList = editList.find((item)=>(item.id === id));

  if(!updateEditedList) return;

  const updateBox = e.target.closest(".agenda-panel").querySelector(".panelOutput");
  const pTag = updateBox.querySelector("p");

  if(e.target.innerText === "Edit"){
    pTag.innerHTML = `<input type="text" class="editable" value="${updateEditedList.agenda}"/>`
    e.target.innerText = "Save";
  }else if(e.target.innerText === "Save"){
    const inputField = pTag.querySelector(".editable");
    const newText = inputField.value.trim();

    if(newText === "") return;

    updateEditedList.agenda = newText;
    localStorage.setItem("planOfAction", JSON.stringify(editList));

    e.target.innerText = "Edit";

    handleOutput();

  }
}