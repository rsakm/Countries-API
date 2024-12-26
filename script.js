const countriesContainer = document.querySelector('.countries-container')
const filterRegion = document.querySelector('.filter-container')
const search = document.querySelector('.search-container')
const theme = document.querySelector('.theme');
const themeIcon = document.querySelector('#theme-icon')

function renderCountries(data){
    countriesContainer.innerHTML=""
        data.forEach((country)=>{
            // console.log(country)
            
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card');

    // const cardImg = document.createElement('img');
    // cardImg.src = 'https://flagcdn.com/sl.svg';
    // countryCard.append(cardImg);

    countryCard.href = `/country.html?name=${country.name.common}`

    countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
    <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.
    population.toLocaleString('en-IN')}</p>
        <p><b>Region: </b>${country.
    region}</p>
        <p><b>Capital: </b>${country.capital}</p>
    </div>
    `
    countriesContainer.append(countryCard)
    })
}

let allCountriesInfo 

fetch("https://restcountries.com/v3.1/all")
.then((response)=>response.json())
.then((data)=>{
    renderCountries(data)
    allCountriesInfo = data
})

filterRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`).then((response)=>response.json())
    .then(renderCountries)
})


// Searching 
search.addEventListener('input',(e)=>{
   const filteredCountries = allCountriesInfo.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    
   renderCountries(filteredCountries)
})


theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark');

})