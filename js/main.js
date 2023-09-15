const countriesRow = document.querySelector(".countries-row");

const url = "https://ap-countries-api.vercel.app/all?page=1&limit=10";
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
    data.data.map((country) => {
      countriesRow.innerHTML += `<div class="country-card">
              <div class="card-body"><img src="${country.flags.png}" alt="${country.name}" /></div>
              <div class="card-footer">
                <div class="country-name"><span>${country.name.common}</span></div>
                <div class="about-country">
                  <h1>Population: <span>${country.population}</span></h1>
                  <h1>Region: <span>${country.region}</span></h1>
                  <h1>Capital: <span>${country.capital[0]}</span></h1>
                </div>
              </div>
            </div> `;
    });
  }
});
