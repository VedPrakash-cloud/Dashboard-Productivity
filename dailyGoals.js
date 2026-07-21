document.addEventListener("All cards rendered", () => {
  const goal = document.querySelector(".daily-goal");
  const goalsBox = document.querySelector(".goal-pandora");

  if (!goal || !goalsBox) return;

  
  goal.innerHTML = `
    <h3 class="goals-heading">Daily Goals</h3>
    <div class="goalOverview"></div>
  `;

  goalsBox.innerHTML = `
    <div class="goals-workspace">
      <div class="goalsHead">
        <div class="goals-status-info">
          <h2>Track Your Goals</h2>
          <h3 class="live-progress-text"></h3>
        </div>
        <p class="goalsCloseBtn">X</p>
      </div>
      <div class="goals-layout-boxes">
        <div class="goals-input-side"></div>
        <div class="goals-list-side"></div>
      </div>
    </div>
  `;

  if (typeof initGoalsUI === 'function' && typeof renderGoalsOutput === 'function' && typeof goalOverview === 'function' ) {
    initGoalsUI();
    renderGoalsOutput();
    goalOverview();
  }

  goal.addEventListener("click", () => {
    goalsBox.style.display = "flex";
  });
  
  const closeBtn = document.querySelector(".goalsCloseBtn");
  closeBtn.addEventListener("click", () => {
    goalsBox.style.display = "none";
  });
});

function initGoalsUI() {
  const leftContainer = document.querySelector(".goals-input-side");
  if (!leftContainer) return;

  leftContainer.innerHTML = `
    <form class="goalEntryForm">
      <textarea type="text" placeholder="What is your next goal today?..." class="goalInputText"></textarea>
      <button type="submit" class="addGoalBtn">Add Goal</button>
    </form>
  `;

  handleGoalForm();
}

function handleGoalForm() {
  const formSubmit = document.querySelector(".goalEntryForm");
  const inputText = document.querySelector(".goalInputText");

  if (!formSubmit || !inputText) return;

  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputText.value.trim() === "") return;

    let obj = {
      id: Date.now(),
      goalText: inputText.value.trim(),
      completed: false
    };

    const oldGoals = JSON.parse(localStorage.getItem("dailyUserGoals")) || [];
    oldGoals.push(obj);
    localStorage.setItem("dailyUserGoals", JSON.stringify(oldGoals));
    
    inputText.value = "";
    
    renderGoalsOutput();
    goalOverview()
  });
}

function renderGoalsOutput() {
  const rightContainer = document.querySelector(".goals-list-side");
  const goalsList = JSON.parse(localStorage.getItem("dailyUserGoals")) || [];
  
  if (!rightContainer) return;

  
  rightContainer.innerHTML = goalsList.map((listItem) => (
    `<div class="goal-item-panel ${listItem.completed ? 'is-done' : ''}" data-id="${listItem.id}">
        <div class="goalPanelOutput">
          <input type="checkbox" class="goalStatusCheck" ${listItem.completed ? 'checked' : ''} onchange="toggleGoalStatus(${listItem.id})"/>
          <p style="${listItem.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${listItem.goalText}</p>
        </div>
        <div class="goalPanelBtn">
          <button class="delGoalBtn" onclick="handleGoalDelete(${listItem.id})">Delete</button>
        </div>
    </div>`
  )).join("");

  
  updateLiveProgress(goalsList);
  goalOverview()
}

function toggleGoalStatus(id) {
  const targetList = JSON.parse(localStorage.getItem("dailyUserGoals")) || [];
  const updatedList = targetList.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });

  localStorage.setItem("dailyUserGoals", JSON.stringify(updatedList));
  renderGoalsOutput();
  goalOverview()
}

function handleGoalDelete(id) {
  const filterList = JSON.parse(localStorage.getItem("dailyUserGoals")) || [];
  const updatedList = filterList.filter((item) => item.id !== id);

  localStorage.setItem("dailyUserGoals", JSON.stringify(updatedList));
  renderGoalsOutput();
  goalOverview()
}

function updateLiveProgress(goalsList) {
  const progressText = document.querySelector(".live-progress-text");
  if (!progressText) return;

  const total = goalsList.length;
  const completedCount = goalsList.filter(item => item.completed).length;

  progressText.innerText = `${completedCount} of ${total} completed`;
}

function goalOverview(){
    const goalPreview = document.querySelector(".goalOverview");

    if(!goalPreview) return;

        const listOverview = JSON.parse(localStorage.getItem("dailyUserGoals")) || [];
        const total = listOverview.length;
        const completedCount = listOverview.filter(item => item.completed).length;

    goalPreview.innerHTML = `
    <p class="overview-metric-badge">Progress: ${completedCount}/${total}</p>`;
}