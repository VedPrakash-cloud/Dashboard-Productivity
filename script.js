const body = document.body;
const main = document.querySelector("main");

const rightNow = new Date().getHours();

const randomPhoto = async (query) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        headers: {
          Authorization: `Client-ID ${"cD7tUaaG_dpZ5g_zg-7OXnv_W38ItaN2p8Z6-dgmn0s"}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const randomeIndex = Math.floor(Math.random() * data.results.length);

    const result = data.results[randomeIndex].urls.full;

    body.style.background = `linear-gradient(
      to top, 
      rgb(0, 52, 74) 0%,
      rgba(0, 32, 74, 0.8) 20%,
      rgba(0, 32, 74, 0) 60%
    ),url(${result})`;
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "100% 100%";
    body.style.backgroundRepeat = "no-repeat";
  } catch (err) {
    console.error("Unable to fetch", err);
  }
};

function dynamicBackground() {
  if (rightNow >= "05" && rightNow < "11") {
    let query = "misty mountain forest river animals";
    randomPhoto(query);
  } else if (rightNow >= "11" && rightNow < "16") {
    let query = "sunny deep forest waterfall mountain";
    randomPhoto(query);
  } else if (rightNow >= "16" && rightNow < "20") {
    let query = "wildlife afternoon mountain rivers";
    randomPhoto(query);
  } else {
    let query = "dark predator wildlife moonlight";
    randomPhoto(query);
  }
}

const getLocation = () => {
  return new Promise((res, rej) => {
    if (!navigator.geolocation) {
      rej(new Error("Geolocation is not supported by your browser..."));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        res(`${latitude}, ${longitude}`);
      },
      (error) => {
        rej(error);
      },
    );
  });
};

const weather = async (query) => {
  const apiKey = "48c30176b2064b6e86b111614251804";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unable to get your location", err);
  }
};

const weatherInfo = async () => {
  try {
    const locationCoords = await getLocation();
    await weather(locationCoords);
    return weather(locationCoords);
  } catch (err) {
    console.warn("GPS Access denied", err);

    const location = "Varanasi";
    await weather(location);
    return weather(location);
  }
};

async function showWatch() {
  const initialNow = new Date();

  const initialHours = initialNow.getHours().toString().padStart(2, "0");
  const initialMinutes = initialNow.getMinutes().toString().padStart(2, "0");
  const option = { weekday: "long", day: "numeric", month: "long" };
  const initialToday = new Date().toLocaleDateString("en-US", option);

  const weatherData = await weatherInfo("query");

  console.log(weatherData);

  main.innerHTML = `<div class="container">
            <h1 class="clock-time">${initialHours}:${initialMinutes}</h1>
            <span class="clock-date">${initialToday}</span>
            <div class="widget-container">
                <div class="weather card">
                  <h5 class="location">${weatherData.location.name}</h5>
                  <div class="weather-main">
                    <img src=${weatherData.current.condition.icon} alt=${weatherData.current.condition.text} />
                    <h3>${weatherData.current.temp_c} \u2103</h3>
                    <span>${weatherData.current.condition.text}</span>
                  </div>
                  <p class="weather-footer">See full forecast</p>
                </div>
                <div class="timer card"></div>
                <div class="todo card"></div>
                <div class="daily-planner card"></div>
            </div>
        </div>`;

  const clockContainer = document.querySelector(".container");
  const clockTime = document.querySelector(".clock-time");
  const clockDate = document.querySelector(".clock-date");

  setInterval(() => {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const today = new Date().toLocaleDateString("en-US", option);

    clockTime.innerHTML = `${hours}:${minutes}`;
    clockDate.innerHTML = today;
  }, 60000);

  setTimeout(() => {
    clockContainer.classList.add("active");
  }, 1000);
}

dynamicBackground();
showWatch();
//******************************************************************** */

// main.innerHTML = ``
