// promise to fetch data from breweries api
const getData = async () => {
  try {
    const data = await fetch("https://api.openbrewerydb.org/breweries");
    const breweries = await data.json();

    mainContainer.innerHTML = "";

    breweries.forEach((brewery) => {
      displayData(brewery);
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
// dynamically updating the data
const displayData = (obj) => {
  mainContainer.innerHTML += `
<div class="datacont">
<h3 class="blue">Brewery Name:<span>${obj.name}</span></h3>
<p class="para blue"> Brewery City : <span>${obj.city}</span></p>
<p class="para blue"> Brewery Type : <span>${obj.brewery_type}</span></p>
<p class="para blue"> Brewery Phone : <span>${obj.phone}</span></p>
<p class="para blue"> Brewery Website : <span>${obj.website_url}</span></p>
<p class="para blue"> Brewery Address : <span>${obj.street}</span></p>
<p class="para blue"> Brewery State: <span>${obj.state}</span></p>
<p class="para blue"> Brewery Zip : <span>${obj.postal_code}</span></p>
<p class="para blue"> Brewery Country : <span>${obj.country}</span></p>
</div>`;
};
