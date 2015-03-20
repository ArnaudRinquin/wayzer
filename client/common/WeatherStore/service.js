var EventEmitter = require('events').EventEmitter;

module.exports = function($http, $q, OpenWeatherAPI, ForecastioAPI, WeatherDataCondenser){

  var store = new EventEmitter();

  store.getCurrentWeatherData = function(currentWeather){
    return store.currentWeather;
  }

  store.setCurrentWeatherData = function(currentWeather){
    store.currentWeather = currentWeather;
    store.emit('change');
  }

  store.setPlace = function(geocoding){
    store.geocoding = geocoding;
    store.setCurrentWeatherData(null);
    store.refreshData();
  };

  store.refreshData = function(){

    if (!store.geocoding) {
      return;
    }

    var location = store.geocoding.location;

    $q.all({
      forecastioData: ForecastioAPI.fetchCurrentWeather(location),
      openWeatherData:OpenWeatherAPI.fetchCurrentWeather(location)
    }).then(function(results){

      // Discard results if not relevant anymore
      if(!store.geocoding || store.geocoding.location !== location){
        return;
      };

      var condenser = WeatherDataCondenser.create()
        .digestForecastioData(results.forecastioData)
        .digestOpenWeather(results.openWeatherData);

      store.setCurrentWeatherData(condenser.getCondensedWeather());

    });
  };

  return store;

}
