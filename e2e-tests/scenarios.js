'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  var selectDropdownbyNum = function ( element, optionNum ) {
    if (optionNum){
      var options = element.findElements(by.tagName('option'))
        .then(function(options){
          options[optionNum].click();
        });
    }
  };

  it('should automatically redirect to /currency-converter when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/currency-converter");
  });

  it('should automatically redirect to /currency-converter when location hash/fragment having wrong path', function() {
    browser.get('index.html#/abc');
    expect(browser.getLocationAbsUrl()).toMatch("/currency-converter");
  });

  describe('currency-converter', function() {

    beforeEach(function() {
      browser.get('index.html#/currency-converter');
    });


    it('should render currency-converter html when user navigates to /currency-converter', function() {
      expect(element.all(by.css('[ng-view] label')).first().getText()).
        toMatch(/From:/);
      expect(element.all(by.css('[ng-view] select')).count()).
        toEqual(2);
      expect(element.all(by.css('[ng-view] input')).count()).
        toEqual(1);
      expect(element.all(by.css('[ng-view] button')).count()).
        toEqual(1);
      expect(element.all(by.css('[ng-view] button')).first().isEnabled()).toBe(false);
    });

    it('should enable submit button for valid form', function() {
      var fromField = browser.driver.findElement(By.id('fromCurrency'));
      var toField = browser.driver.findElement(By.id('toCurrency'));
      var amount =  browser.driver.findElement(By.id('amount'));
      var userLoginBtn  = browser.driver.findElement(By.id('convertCurrencyBtn'));

      selectDropdownbyNum(fromField, 1);
      selectDropdownbyNum(toField, 2);
      amount.sendKeys('43');
      expect(userLoginBtn.isEnabled()).toBe(true);
    });
  });
});
