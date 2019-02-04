'use strict';
var env = {};

if(window){
  Object.assign(env, window._env);
}

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.currencyConverter',
  'myApp.currencyServices'
])
.constant('_env', env)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/currency-converter'});
}]);
