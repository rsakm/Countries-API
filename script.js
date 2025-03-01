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

// let allCountriesInfo 

// fetch("https://restcountries.com/v3.1/all")
// .then((response)=>response.json())
// .then((data)=>{
//     renderCountries(data)
//     allCountriesInfo = data
// })/

const API_URL = "https://restcountries.com/v3.1/all";

// Check if data is already in localStorage
let allCountriesInfo = JSON.parse(localStorage.getItem("countriesData"));

if (!allCountriesInfo) {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("countriesData", JSON.stringify(data)); // Cache API data
            renderCountries(data);
        });
} else {
    renderCountries(allCountriesInfo);
}


filterRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`).then((response)=>response.json())
    .then(renderCountries)
})


// Searching 
search.addEventListener('input',(e)=>{
   const filteredCountries = allCountriesInfo.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    
   renderCountries(filteredCountries)
})


// theme.addEventListener('click',()=>{
//     document.body.classList.toggle('dark');

// })
function applyTheme(themeMode) {
    if (themeMode === 'dark') {
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle theme and save preference
theme.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// Enable lazy loading for all images
const images = document.querySelectorAll("img");

images.forEach((img) => {
    img.setAttribute("loading", "lazy");
});
