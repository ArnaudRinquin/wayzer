describe('Controller', function(){

  var SingleCityWeatherController = require('./index');

  beforeEach(function(){
    this.scope = {};
    this.controller = new SingleCityWeatherController(this.scope);
  });


  it('Initialize the foo value', function(){
    expect(this.scope.foo).toBe("FOOBAR!");
  });
})
