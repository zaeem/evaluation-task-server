statPay.service('fileUpload', ['$http','$rootScope', function ($http,$rootScope) {
  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(data){
      console.log("successfully done")
    })
    .error(function(){
    });
  }
}]);