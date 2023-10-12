const countriesRow = document.querySelector(".countries-row");
const searchInput = document.querySelector(".search-input");
let dataLoaderSpan;
let DATA = [];

const ENDPOINT = `https://ap-countries-api.vercel.app/all`;

document.addEventListener("DOMContentLoaded", function () {
  function countryData(ENDPOINT, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", ENDPOINT, true);

    if (countriesRow.innerHTML === "") {
      const dataLoader = document.createElement("div");
      dataLoader.classList.add("data-loader");
      dataLoaderSpan = document.createElement("span");
      dataLoaderSpan.textContent = "LOADING...";
      dataLoader.appendChild(dataLoaderSpan);
      countriesRow.appendChild(dataLoader);
    }

    request.send();

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let dataJson = request.response;
          DATA = JSON.parse(dataJson).data;

          callback(DATA, null);
        } else {
          const error = new Error("Error " + request.status);
          callback(null, error);
        }
      }
    };
  }

  function renderCountries(data) {
    countriesRow.innerHTML = "";
    data.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let countryFlag = document.createElement("img");
      countryFlag.src = country.flags.png;
      countryFlag.alt = country.name;

      let cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      let countryName = document.createElement("div");
      countryName.classList.add("country-name");

      let countryNameSpan = document.createElement("span");
      countryNameSpan.textContent = country.name.common;

      let aboutCountry = document.createElement("div");
      aboutCountry.classList.add("about-country");

      let populationH = document.createElement("h1");
      populationH.textContent = "Population: ";

      let populationSpan = document.createElement("span");
      populationSpan.textContent = country.population;

      let regionH = document.createElement("h1");
      regionH.textContent = "Region: ";

      let regionSpan = document.createElement("span");
      regionSpan.textContent = country.region;

      let capitalH = document.createElement("h1");
      capitalH.textContent = "Capital: ";

      let capitalSpan = document.createElement("span");
      capitalSpan.textContent = country.capital;

      countryCard.appendChild(cardBody);
      cardBody.appendChild(countryFlag);

      countryCard.appendChild(cardFooter);
      cardFooter.appendChild(countryName);
      countryName.appendChild(countryNameSpan);

      cardFooter.appendChild(aboutCountry);
      aboutCountry.appendChild(populationH);
      populationH.appendChild(populationSpan);

      aboutCountry.appendChild(regionH);
      regionH.appendChild(regionSpan);

      aboutCountry.appendChild(capitalH);
      capitalH.appendChild(capitalSpan);

      countryCard.addEventListener("click", () => {
        window.location.href = `../country.html#${country.name.common}`;
      });

      countriesRow.appendChild(countryCard);
    });
  }

  countryData(ENDPOINT, function (data, error) {
    if (error) {
      console.error("Error:", error);
    } else {
      renderCountries(data);
    }
  });

  searchInput.addEventListener("input", function () {
    let filterValue = this.value.toLowerCase();
    if (filterValue !== "") {
      const filteredCountries = DATA.filter((country) =>
        country.name.common.toLowerCase().includes(filterValue)
      );
      renderCountries(filteredCountries);
    } else {
      
      renderCountries(DATA);
    }
  });
});
