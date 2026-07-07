const body = document.body;
const navbar = document.querySelector(".navbar")


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




setInterval(()=>{
    const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const rightNow = `${hours}:${minutes}:${seconds}`;
  navbar.innerHTML = `<h1>${rightNow}</h1>`
  },1000)

  const rightNow = new Date().getHours();

  if(rightNow >= "05" && rightNow <= "11"){
    body.style.backgroundImage =`url(/assets/morning.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }else if(rightNow > "11" && rightNow <= "16"){
    body.style.backgroundImage =`url(/assets/afternoon.jpg)`;
    body.style.backgroundPosition="center";
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundRepeat = 'no-repeat';
  }else if(rightNow > "16" && rightNow <= "20"){
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
