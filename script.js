const body = document.body;
const main = document.querySelector("main")

const rightNow = new Date().getHours();

const randomPhoto = async (query)=>{
    try{
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}`,{
          headers:{Authorization:`Client-ID ${'cD7tUaaG_dpZ5g_zg-7OXnv_W38ItaN2p8Z6-dgmn0s'}`}
    })
    if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const randomeIndex = Math.floor(Math.random()* data.results.length);

    const result = data.results[randomeIndex].urls.full;

    body.style.backgroundImage =`url(${result})`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
    }
    catch(err){
        console.error("Unable to fetch", err);
    }
}

function dynamicBackground(){
  if(rightNow >= "05" && rightNow < "11"){
    let query = "misty mountain forest river animals"
    randomPhoto(query);
  }else if(rightNow >= "11" && rightNow < "16"){
    let query = "sunny deep forest waterfall mountain"
    randomPhoto(query);
  }else if(rightNow >= "16" && rightNow < "20"){
    let query = "wildlife afternoon mountain rivers"
    randomPhoto(query);
  }else{
    let query = "dark predator wildlife moonlight"
    randomPhoto(query);
  }
}

const getLocation = ()=>{
    return new Promise((res, rej)=>{
      if(!navigator.geolocation){
        rej(new Error("Geolocation is not supported by your browser..."))
      }
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords;
        res(`${latitude}, ${longitude}`);
      },
      (error)=>{
        rej(error);
      }
    );
    });
  };

const weather = async (query)=>{
  const apiKey = '48c30176b2064b6e86b111614251804';
  try{
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`)
  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  // console.log(data);
  weatherCheck.innerHTML = `<h3>${data.location.name} <span class="state">(${data.location.region})</span> ${data.current.temp_c} C</h3>`
  }catch(err){
    console.error("Unable to get your location", err);
  }
}

const weatherInfo = async ()=>{
  try{
    const locationCoords = await getLocation();
    await weather(locationCoords);
  } catch(err){
    console.warn("GPS Access denied", err);

    const location = "Varanasi";
    await weather(location);
  }
}

function showWatch(){
  const initialNow = new Date();

  const initialHours = initialNow.getHours().toString().padStart(2, '0');
  const initialMinutes = initialNow.getMinutes().toString().padStart(2, '0');
  const option = {weekday:'long', month:'long', day:'numeric'};
  const initialToday = new Date().toLocaleDateString('en-US', option)

main.innerHTML = `<div class="container">
            <h1 class="clock-time">${initialHours}:${initialMinutes}</h1>
            <span class="clock-date">${initialToday}</span>
            <div class="widget-container">
                <div class="weather card"></div>
                <div class="timer card"></div>
                <div class="todo card"></div>
                <div class="daily-planner card"></div>
            </div>
        </div>`


  const clockContainer = document.querySelector(".container");
  const clockTime = document.querySelector(".clock-time");
  const clockDate = document.querySelector(".clock-date");

  setInterval(()=>{
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  // const option = {weekday:'long', month:'long', day:'numeric'};
  const today = new Date().toLocaleDateString('en-US', option)

  clockTime.innerHTML = `${hours}:${minutes}`;
  clockDate.innerHTML = today;

  },1000)

  setTimeout(()=>{
    clockContainer.classList.add('active');
  }, 1000);
}

dynamicBackground();
showWatch();
// weatherInfo()
//******************************************************************** */

// main.innerHTML = ``