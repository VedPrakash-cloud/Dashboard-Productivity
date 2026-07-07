const body = document.body;
const clock = document.querySelector(".clock");
const weatherCheck = document.querySelector(".weather") 

const rightNow = new Date().getHours();
function dynamicBackground(){
  if(rightNow >= "05" && rightNow < "11"){
    body.style.backgroundImage =`url(/assets/morning.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }else if(rightNow >= "11" && rightNow < "16"){
    body.style.backgroundImage =`url(/assets/afternoon.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }else if(rightNow >= "16" && rightNow < "20"){
    body.style.backgroundImage =`url(/assets/evening.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }else{
    body.style.backgroundImage =`url(/assets/night.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }
}

// const randomPhoto = async ()=>{
//     try{
//         const res = await fetch('https://api.unsplash.com/photos/random',{
//         headers:{Authorization:`Client-ID ${'cD7tUaaG_dpZ5g_zg-7OXnv_W38ItaN2p8Z6-dgmn0s'}`}
//     })
//     if(!res.ok){
//         throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();
//     const result = data.urls.full
//     body.style.backgroundImage =`url(${result})`;
//     body.style.backgroundPosition="center";
//     body.style.backgroundSize = '100% 100%';
//     body.style.backgroundRepeat = 'no-repeat';
//     }
//     catch(err){
//         console.error("Unable to fetch", err);
//     }
// }

const weather = async ()=>{
  const apiKey = '48c30176b2064b6e86b111614251804'
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

  try{
    const locationCoords = await getLocation();
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationCoords}`)
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

function showWatch(){
  setInterval(()=>{
    const now = new Date();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const rightNow = `${hours}:${minutes}:${seconds}`;
  clock.innerHTML = `<h1>${rightNow}</h1>`
  },1000)
}

dynamicBackground();
showWatch();
weather();
//******************************************************************** */