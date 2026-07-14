document.addEventListener("All cards rendered", ()=>{
    const plannerHeading = document.querySelector(".daily-planner");
    const pandoraBox = document.querySelector(".planner-pandora");

    if(!plannerHeading || !pandoraBox) return;

    plannerHeading.innerHTML = `<h3 class="planner-heading">Daily Planner</h3>`;

    pandoraBox.innerHTML = `<div class="blackhole">
                                <div class="taskStamp">
                                    <div class="dateTime"></div>
                                    <p class="plannerClose">X</p>
                                </div>
                                <div class="planner-container"></div>
                            </div>`

    if(typeof Ui === 'function'){
        Ui();
    }

    plannerHeading.addEventListener("click", ()=>{
        const pandoraBox = document.querySelector(".planner-pandora");
        pandoraBox.style.display = "flex";

        const now =new Date();
        const hour = now.getHours().toString().padStart(2,'0');
        const timeZone = `${hour}:00`;

        const currentSlot = document.querySelector(`.slot[data-hour="${timeZone}"]`);

        if(currentSlot) {
            currentSlot.scrollIntoView({behavior:"smooth", block: "center"});
        }
    })

    const closePandora = document.querySelector(".plannerClose");

    if(closePandora){
        closePandora.addEventListener("click", ()=>{
            const pandoraBox = document.querySelector(".planner-pandora");
            pandoraBox.style.display = "none";
        })
    }

})

let dailyPlan = [];
function timeIndex(){
    let timeRange = [];
    let min = 0;
    for(let i = 0; i < 24; i++){
        timeRange.push(`${i.toString().padStart(2,'0')}:${min.toString().padStart(2, '0')}`);
    }
    return timeRange;
}

const time = timeIndex();

function Ui(){
    const dateTime = document.querySelector(".dateTime")
    if(!dateTime) return;

    const initialNow = new Date();
    const initialHours = initialNow.getHours();
    const displayHour = initialHours % 12;
    const initialMinutes = initialNow.getMinutes().toString().padStart(2, "0");
    const option = { weekday: "long", day: "numeric", month: "long" };
    const initialToday = new Date().toLocaleDateString("en-US", option);

    if(displayHour === 0){
        displayHour = 12;
    }

    const ampm = initialHours >= 12 ? "PM" : "AM";
    
    dateTime.innerHTML = `<h1>${displayHour.toString().padStart(2,'0')}:${initialMinutes} ${ampm}</h1>
                        <h3>${initialToday}</h3>`

    const container = document.querySelector(".planner-container");
    if(!container) return;

    if(container){
        container.innerHTML = time.map((item)=>{
        return `<div class="slot" data-hour='${item}'>
            <div class="timeslot">
                ${item < "12:00" ? `<p>${item} AM</p>`:`<p>${item} PM</p>`}
            </div>
            <div class="notesslot">
                <input type="text" class="planText" placeholder="what is your plan for today....">
            </div>
            </div>`
    }).join("");
    }
}


// function planner(){
//     const planOfAction = document.querySelector(".planText");

//     if(!planOfAction) return;

//     if(planOfAction){
//         planOfAction.addEventListener("change", ()=>{
        
//     })
//     }
// }




