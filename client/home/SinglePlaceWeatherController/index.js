module.exports = function(Geocoding){

  controller = this;

  controller.place = {
    address: 'London, UK'
  };

  controller.setPlaceGeocoding = function(geocoding){
    controller.place.geocoding = geocoding;
  };

  controller.setCityForecastIO = function(forecastIO){
    controller.city.forecastIO = forecastIO;
  };

  controller.onAddressChange = function(){

    this.place.geocoding = null;
    Geocoding.bestResultForAddress(this.place.address).then(controller.setPlaceGeocoding);
  };

}
