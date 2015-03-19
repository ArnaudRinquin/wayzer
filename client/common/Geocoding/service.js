var API_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json?address=";

var cleanUpGeocodingData = function(searchedAddress, data){
  return {
    searchedAddress: searchedAddress,
    location: data.geometry.location,
    formattedAddress: data.formatted_address
  };
};

var responseIsSuccess = function(response) {
  return response.data.status === "OK" && response.data.results;
}

module.exports = function($http){

  var service = {

    // Just return a promise for the request to
    // https://maps.googleapis.com/maps/api/geocode/json?address=<address>
    rawRequest: function(address){
      return $http.get(API_ENDPOINT + address);
    },

    bestResultForAddress: function(address){

      var extractFirstResult = function(response){
        if(responseIsSuccess(response)) {
          return cleanUpGeocodingData(address, response.data.results[0]);
        }
      };

      return service.rawRequest(address)
        .then(extractFirstResult);
    }
  };

  return service;
}
