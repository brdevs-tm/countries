const countryInfo = document.querySelector(".country");
const countryFlag = document.querySelector(".country-flag");
const countryNameSpan = document.querySelector(".country-name");

const headingName = document.querySelector(".heading-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".native-region");
const subRegion = document.querySelector(".sub-region");
const lvlDomain = document.querySelector(".lvl-domain");
const currency = document.querySelector(".currency");
const langs = document.querySelector(".langs");

const countryName = window.location.href.split("#")[1];

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

      headingName.textContent = `${country.name.common}`;

      let nativeNameSpan = document.createElement("span");
      nativeNameSpan.textContent = ` ${country.name.common}`;

      let populationSpan = document.createElement("span");
      populationSpan.textContent = ` ${country.population}`;

      let regionSpan = document.createElement("span");
      regionSpan.textContent = ` ${country.region}`;

      countryFlag.appendChild(imgInst);
      nativeName.appendChild(nativeNameSpan);
      population.appendChild(populationSpan);
      region.appendChild(regionSpan);
      countryNameSpan.appendChild(cName);
    }
  });
});
