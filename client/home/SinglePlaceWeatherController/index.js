var REFRESH_INTERVAL = 5; // seconds

module.exports = function(Geocoding, WeatherStore, Ticker){

  controller = this;

  controller.setCurrentWeatherData = function(){

    // Don't display results if last geocoding failed
    if (controller.errors.geocoding) {
      return;
    }
    controller.place.currentWeather = WeatherStore.getCurrentWeatherData();
  }

  controller.setGeocoding = function(geocoding){
    controller.place.geocoding = geocoding;
    WeatherStore.setPlace(geocoding);
  };

  controller.onAddressChange = function(){
    controller.place.geocoding = null;
    controller.place.currentWeather = null;
    controller.errors.geocoding = null;

    var address = controller.place.address;

    // Just do nothing unless use actually input an address
    if(!address || address.replace(/\s+/, '') === '') {
      return;
    }

    var setGeocodingIfRelevant = function(geocoding){
      if (controller.place.address === address) {
        controller.setGeocoding(geocoding);
      }
    }

    Geocoding.bestResultForAddress(address)
      .then(setGeocodingIfRelevant)
      .catch(function(error){
        controller.errors.geocoding = error;
      });
  };

  controller.init = function(){

    // Set some initial data
    controller.place = {
      address: 'London, UK'
    };
    controller.errors = {};

    // Create a ticker and register to it
    var ticker = Ticker.createTicker(REFRESH_INTERVAL * 1000);
    ticker.start().on('tick', function(){
      WeatherStore.refreshData();
    });

    // Register to weather data changes
    WeatherStore.on('change', controller.setCurrentWeatherData);

    // Trigger initial data loading
    controller.onAddressChange();
  }

  controller.init();

}
