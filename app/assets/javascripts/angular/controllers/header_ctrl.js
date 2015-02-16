statPay.controller('HeaderController', ['$location', '$scope', '$rootScope',function ($location ,$scope, $rootScope) {

  $scope.isActive = function(route, route2) {
    alert(route +"sss"+ route2)
    if (route == $location.path() || route2 == $location.path())
      return true;
    else
      return false
  }   

}]);