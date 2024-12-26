const countryName = new URLSearchParams(location.search).get('name')

const flagImg = document.querySelector('.country-details img')
const countryNam = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const populate = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.subregion')
const currency = document.querySelector('.currr')
const tld = document.querySelector('.tld')
const capt = document.querySelector('.capital')
const lang = document.querySelector('.lang')

const borders = document.querySelector('.border-details')

const theme = document.querySelector('.theme');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country)
    flagImg.src = country.flags.svg
    countryNam.innerText = country.name.common
    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else{
        nativeName.innerText =country.name.common
    }

    populate.innerText = country.
    population.toLocaleString('en-IN')
    region.innerText = country.
    region
    
    if(country.capital){
        capt.innerText = country.capital.join(", ")
    }

   if(country.subregion){
    subregion.innerText = country.subregion
   }

    tld.innerText = country.tld.join(', ')

    if(country.currencies){
        currency.innerText = Object.values(country.currencies).map((currency)=>currency.name).join(', ')
    }
    
    if(country.languages){
        lang.innerText = Object.values(country.languages).join(', ')
    }


    if(country.borders){
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((response)=>response.json())
            .then(([borderCountry])=>{
                // console.log([borderCountry])
                const borderCountryBtn = document.createElement('a')

                borderCountryBtn.innerText = borderCountry.name.common

                borderCountryBtn.href=`country.html?name=${borderCountry.name.common}`

                borders.append(borderCountryBtn)
            })
        })
    }
  })

  theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
})