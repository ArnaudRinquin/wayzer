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
    var address = controller.place.address;
    Geocoding.bestResultForAddress(address).then(function(geocoding){
      // Prevent race condition, discard result if not the currnet addresse
      if (controller.place.address === address) {
        controller.setGeocoding(geocoding);
      }
    });
  };

  WeatherStore.on('change', controller.setCurrentWeatherData);

  controller.place = {
    address: 'London, UK'
  };

}
