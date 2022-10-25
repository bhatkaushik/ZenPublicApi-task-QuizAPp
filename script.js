const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

// using promises async await
const jokeGenerator = async ()=> {
    
  try{
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
  
   const getData=await fetch(" https://icanhazdadjoke.com", config)
     
   const data=await getData.json();
jokeEl.innerHTML = data.joke;
  }catch(err){ 
    console.log(err)
}
}
jokeGenerator();
jokeBtn.addEventListener('click',jokeGenerator)
