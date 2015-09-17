(function(){
  angular.module("memo")
  .config(States);

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
    });
    $urlRouterProvider.otherwise('/app/records');
  }
})();
