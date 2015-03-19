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

    OpenWeatherAPI.fetchCurrentWeather(store.geocoding.location)
      .then(store.setCurrentWeatherData);

  };

  return store;

}
