export async function submitForm(event) {
  let resData = {};
  let arrData = [];

  let dataUser = {
    location: document.getElementById("location").value,
    city: document.getElementById("city").value,
    datestart: document.getElementById("datestart").value,
    datend: document.getElementById("datend").value,
  };

  let valid = await Client.validateForm(dataUser);

  if (valid == true) {
    resData = Client.datePicker(dataUser.datestart, dataUser.datend);

    const responseGeo = await Client.fetching("/location", {
      location: dataUser.location,
    });

    /**
     * Using respone API Geo send lat and lng to get weather
     */
    const responseWeather = await Client.fetching("/getweather", {
      lat: responseGeo.lat,
      lng: responseGeo.lng,
    });

    let forecasting = 0;
    if (!resData.infuture) {
      forecasting = resData.countdown;
    }
    /**
     * Get photo using city in respone API Weather
     */
    const responsePixabay = await Client.fetching("/getphoto", {
      city: dataUser.city,
    });

    console.log(responseWeather);
    for (let i = 0; i < 2; i++) {
      let obj = {};
      obj.city = responseWeather.city_name;
      obj.country = responseWeather.country_code;
      obj.high_temp = responseWeather.data[i].high_temp;
      obj.low_temp = responseWeather.data[i].low_temp;
      obj.forecast = responseWeather.data[i].weather.description;
      obj.image = responsePixabay.hits[i].largeImageURL;

      arrData.push(obj);
    }
  }
  /** Fill data in resultform */
  const fill = document.getElementById("resultform");
  Client.updateUI(fill, valid, arrData);
}
