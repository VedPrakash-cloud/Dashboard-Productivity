const body = document.body;
const main = document.querySelector("main");

const rightNow = new Date().getHours();

const randomPhoto = async (query) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        headers: {
          Authorization: `Client-ID cD7tUaaG_dpZ5g_zg-7OXnv_W38ItaN2p8Z6-dgmn0s`,
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
  if (rightNow >= 5 && rightNow < 11) {
    let query = "misty mountain forest river animals";
    randomPhoto(query);
  } else if (rightNow >= 11 && rightNow < 16) {
    let query = "sunny deep forest waterfall mountain";
    randomPhoto(query);
  } else if (rightNow >= 16 && rightNow < 20) {
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
        res(`${latitude},${longitude}`);
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
    console.error("Unable to get weather data", err);
  }
};

const weatherInfo = async (targetCity) => {
  if (targetCity) {
    return await weather(targetCity);
  }

  try {
    const locationCoords = await getLocation();
    return await weather(locationCoords);
  } catch (err) {
    console.warn("GPS Access denied, falling back to Varanasi", err);
    const fallbackLocation = "Varanasi";
    return await weather(fallbackLocation);
  }
};

let clockInterval;

async function showWatch(customCity = null) {
  if (clockInterval) clearInterval(clockInterval);

  const initialNow = new Date();
  const initialHours = initialNow.getHours().toString().padStart(2, "0");
  const initialMinutes = initialNow.getMinutes().toString().padStart(2, "0");
  const option = { weekday: "long", day: "numeric", month: "long" };
  const initialToday = new Date().toLocaleDateString("en-US", option);

  const weatherData = await weatherInfo(customCity);

  if (!weatherData) return;

  main.innerHTML = `<div class="container">
            <h1 class="clock-time">${initialHours}:${initialMinutes}</h1>
            <span class="clock-date">${initialToday}</span>
            <div class="widget-container">
                <div class="weather card">
                    <h5 class="location">${weatherData.location.name}</h5>
                    <div class="weather-main">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${weatherData.current.condition.icon}"
                                alt="${weatherData.current.condition.text}" />
                            <h3>${weatherData.current.temp_c}<sup style="font-size:16px;">&deg;C</sup></h3>
                        </div>
                        <span>${weatherData.current.condition.text}</span>
                    </div>
                    <p class="weather-footer">See full forecast</p>
                </div>
                <div class="timer card">
                    <h5 class="watch-heading">Pomodoro Timer</h5>
                    <div class="watch-container">
                        <h3 class="countDown">${getCorrectTime()}</h3>
                        <div class="watchBtn">
                            <button class="pause"><i class="fa-regular fa-circle-pause"></i></button>
                            <button class="timerBtn"><i class="fa-regular fa-circle-play"></i></button>
                            <button class="stop"><i class="fa-regular fa-circle-xmark"></i></button>
                        </div>
                    </div>
                </div>
                <div class="todo card">
                    <h3>ToDo List</h3>
                </div>
                <div class="daily-planner card">
                    <h3>Pomodor Timero</h3>
                </div>
            </div>
        </div>
        <div class="quotes"></div>
        <div class="forcast-container">
            <div class="modal-form">
                <p class="closeBtn">X</p>
                <div class="modal-nav">
                    <div class="left-side">
                        <input type="text" id="city" class="location-search" placeholder="Enter the city name..."
                            value="${weatherData.location.name}">
                    </div>
                    <div class="right-side">
                        <select id="temperature" onchange='tempCheck(this.value)'>
                            <option value="">...</option>
                            <option value="fahrenheit">Fahrenheit</option>
                            <option value="celsius">Celsius</option>
                        </select>
                    </div>
                </div>
                <div class="modal-container">
                </div>
            </div>
        </div>
        <div class="watch-modal">
        </div>
        `;

  document.querySelector(".weather-footer").addEventListener("click", () => {
    const weatherContainer = document.querySelector(".forcast-container");
    weatherContainer.style.display = "flex";
  });

  document.querySelector(".closeBtn").addEventListener("click", () => {
    const weatherContainer = document.querySelector(".forcast-container");
    weatherContainer.style.display = "none";
  });

  document
    .querySelector(".location-search")
    .addEventListener("change", async (e) => {
      const newCity = e.target.value.trim();
      if (newCity !== "") {
        await showWatch(newCity);
        const weatherContainer = document.querySelector(".forcast-container");
        if (weatherContainer) weatherContainer.style.display = "flex";
      }
    });

  let tapTemp = "celsius";

  function tempCheck(val) {
    tapTemp = val;
    const unitSymbol = tapTemp == "celsius" ? "&deg;C" : "&deg;F";
    document.querySelector(".modal-container").innerHTML = `<div class="temp">
            <div style="display:flex; align-items:center; gap:5px;">
              <img src="${weatherData.current.condition.icon}"/>
              <h1>${tapTemp === "celsius" ? weatherData.current.temp_c : weatherData.current.temp_f}${unitSymbol}</h1>
            </div>
            <div class="high-low">
                <span>${weatherData.current.chance_of_rain}</span>
                <span>H:${tapTemp === "celsius" ? weatherData.current.feelslike_c : weatherData.current.feelslike_f}<sup style="font-size:12px;">${unitSymbol}</sup> L:${tapTemp === "celsius" ? weatherData.current.dewpoint_c : weatherData.current.dewpoint_f}<sup style="font-size:12px;">${unitSymbol}</sup></span>
            </div>
        </div>
        <div class="windy">
            <div class="feel">
                <p>Feels Like</p>
                <p>${tapTemp === "celsius" ? weatherData.current.feelslike_c : weatherData.current.feelslike_f}<sup style="font-size:16px;">${unitSymbol}</sup></p>
            </div>
            <div class="wind">
                <p>Wind</p>
                <p>${weatherData.current.wind_kph}km/h</p>
            </div>
            <div class="humid">
                <p>Humidity</p>
                <p>${weatherData.current.humidity}</p>
            </div>
        </div>
    </div>`;
  }

  window.tempCheck = tempCheck;

  tempCheck("celsius");

  const clockContainer = document.querySelector(".container");
  const clockTime = document.querySelector(".clock-time");
  const clockDate = document.querySelector(".clock-date");

  clockInterval = setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const today = new Date().toLocaleDateString("en-US", option);

    if (clockTime && clockDate) {
      clockTime.innerHTML = `${hours}:${minutes}`;
      clockDate.innerHTML = today;
    }
  }, 60000);

  setTimeout(() => {
    if (clockContainer) clockContainer.classList.add("active");
  }, 1000);
  getQuotes();
}

async function getQuotes() {
  try {
    const res = await fetch("https://dummyjson.com/quotes?limit=0&skip=10");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const randomData = data.quotes.flat();
    const randomIndex = Math.floor(Math.random() * randomData.length);

    const result = data.quotes[randomIndex];

    const showQuotes = document.querySelector(".quotes");

    showQuotes.innerHTML = `<button class="refresh"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <div class="quote-container">
      <h3 class="quote-header">${result.quote}</h3>
      <p class="quote-author">${result.author}</p>
    </div>`;
  } catch (err) {
    console.error("Unable to get Quotes today", err);
  }
}

main.addEventListener("click", (e) => {
  if (e.target.closest(".refresh")) {
    getQuotes();
  }
  if (e.target.closest(".pause")) {
    pauseCheck();
  }
  if (e.target.closest(".stop")) {
    clearTimeRun();
  }
});

showWatch();

dynamicBackground();
