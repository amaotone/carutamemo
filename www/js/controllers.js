(function() {
angular.module("memo")
.controller("AppCtrl", AppCtrl)
.controller("RecordsCtrl", RecordsCtrl)
.controller("ConfigCtrl", ConfigCtrl);

function ConfigCtrl($scope, configService) {
  var vm = this;
  vm.classes = ["A","B","C","D","E","F"];
  vm.class = configService.fetchMyClass();
  $scope.$watch(
    "main.class",
    function(newval,oldval) {
      configService.saveMyClass(newval);
    }
  );
}

function RecordsCtrl(recordsService) {
  var vm = this;
  recordsService.fetchAllEvents()
  .then(function(result) {
    vm.events = result;
  });
  recordsService.fetchAllGames()
  .then(function(result) {
    vm.games = result;
  });

}
function AppCtrl($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}
})();
