const countryInfo = document.querySelector(".country");
const countryFlag = document.querySelector(".country-flag");
const countryNameSpan = document.querySelector(".country-name");

const headingName = document.querySelector(".heading-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const lvlDomain = document.querySelector(".lvl-domain");
const currency = document.querySelector(".currency");
const langs = document.querySelector(".langs");
const border = document.querySelector(".border-countries");

const countryName = window.location.href.split("#")[1];

let currencySpan;
let langsSpan;
let bordersLink;

console.log(countryName);

document.addEventListener("DOMContentLoaded", function () {
  const url = "https://ap-countries-api.vercel.app/name/" + countryName;

  function countryData(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.send();

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let dataJson = request.response;
          let data = JSON.parse(dataJson);
          callback(data, null);
        } else {
          const error = new Error("Error " + request.status);
          callback(null, error);
        }
      }
    };
  }

  countryData(url, function (data, error) {
    if (error) {
      console.error("Error:", error);
    } else {
      const country = data.data[0];
      let imgInst = document.createElement("img");
      imgInst.src = country.flags.png;

      headingName.textContent = country.name.common;

      let nativeNameSpan = document.createElement("span");
      nativeNameSpan.textContent = ` ${country.name.common}`;

      let populationSpan = document.createElement("span");
      populationSpan.textContent = ` ${country.population}`;

      let regionSpan = document.createElement("span");
      regionSpan.textContent = ` ${country.region}`;

      let subRegionSpan = document.createElement("span");
      subRegionSpan.textContent = ` ${country.subregion}`;

      let capitalSpan = document.createElement("span");
      capitalSpan.textContent = ` ${country.capital}`;

      let lvlDomainSpan = document.createElement("span");
      lvlDomainSpan.textContent = ` ${country.tld[0]}`;

      let currencyIndex = Object.keys(country.currencies);

      currencyIndex.forEach((i) => {
        currencySpan = document.createElement("span");
        currencySpan.textContent = ` ${country.currencies[i].name} `;
        currency.appendChild(currencySpan);
      });

      let langsIndex = Object.keys(country.languages);
      console.log(langsIndex);

      langsIndex.forEach((i) => {
        langsSpan = document.createElement("span");
        langsSpan.textContent = ` ${country.languages[i]}`;
        langs.appendChild(langsSpan);
      });

      bordersIndex = Object.keys(country.borders);
      bordersIndex.forEach((i) => {
        bordersLink = document.createElement("span");
        bordersLink.textContent = ` ${country.borders[i]} `;
        border.appendChild(bordersLink);
      });

      countryFlag.appendChild(imgInst);
      nativeName.appendChild(nativeNameSpan);
      population.appendChild(populationSpan);
      region.appendChild(regionSpan);
      subRegion.appendChild(subRegionSpan);
      capital.appendChild(capitalSpan);
      lvlDomain.appendChild(lvlDomainSpan);
    }
  });
});
