module.exports = function(Geocoding, WeatherStore){

  controller = this;

  controller.setCurrentWeatherData = function(){
    controller.place.currentWeather = WeatherStore.getCurrentWeatherData();
  }

  controller.setGeocoding = function(geocoding){
    controller.place.geocoding = geocoding;
    WeatherStore.setPlace(geocoding);
  };

  controller.onAddressChange = function(){
    this.place.geocoding = null;
    Geocoding.bestResultForAddress(this.place.address).then(controller.setGeocoding);
  };

  WeatherStore.on('change', controller.setCurrentWeatherData);

  controller.place = {
    address: 'London, UK'
  };

}
