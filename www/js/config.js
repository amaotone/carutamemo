(function(){
  angular.module("memo")
  .config(States)
  .config(LocalStorage);

  function LocalStorage(localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('memo')
    .setStorageType('localStorage')
    .setNotify(true, true);
  }

  function States($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.records', {
      url: '/records',
      views: {
        'menuContent': {
          templateUrl: 'templates/records.html',
          controller: 'RecordsCtrl as main'
        }
      }
    })
    .state("app.config", {
      url: "/config",
      views: {
        "menuContent": {
          templateUrl: "templates/config.html",
          controller: "ConfigCtrl as main"
        }
      }
    });
    $urlRouterProvider.otherwise('app/records');
  }
})();
