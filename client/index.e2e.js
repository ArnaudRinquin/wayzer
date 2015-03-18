describe('Wayzer app', function() {
  describe('home page', function(){
    it('Should be the home page', function(){
      browser.get('http://localhost:3000');
      expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/');
    });
  })
});
