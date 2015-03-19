var EventEmitter = require('events').EventEmitter;

module.exports = function($http, OpenWeatherAPI){

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
  }

  store.refreshData = function(){

    if (!store.geocoding) {
      return;
    }

    var location = store.geocoding.location;

    OpenWeatherAPI.fetchCurrentWeather(location)
      .then(function(weatherData){

        // Only handle current place results
        if(store.geocoding && store.geocoding.location === location){
          store.setCurrentWeatherData(weatherData);
        };
      });

  };

  return store;

}
