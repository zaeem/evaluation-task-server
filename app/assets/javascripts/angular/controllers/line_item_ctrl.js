statPay.controller('LineItemCntrl', ['$scope','$upload', '$http','Batch','Statement','$rootScope',function ($scope,$upload,$http,Batch,Statement,$rootScope) {
    $scope.review_button = true
    $scope.removed = false
    $scope.undo_removed = false
    $scope.all_line_items  = []
    $scope.div_color = ''
    $scope.line_items = function(statement){
      $scope.review_button = false
      if($scope.all_line_items.length== 0){
        Statement.line_items(statement.id).$promise.then(function(data){
          $scope.all_line_items = data
        })
      }
    }
    $scope.remove_patient = function(batch,statement){
      $scope.file_details.amount = $scope.file_details.amount - statement.balance_amount
      batch.amount   = batch.amount - statement.balance_amount 
      $scope.file_details.patients = $scope.file_details.patients - 1
      batch.patients  = batch.patients - 1 
      if (batch.patients == 0)
      { 
        $('.approve_batch_button')[0].disabled = true
        batch.amount = 0
      }
      $scope.removed = true
      $scope.undo_removed = false
      Statement.remove_patient(statement.id)
    }
     $scope.undo_patient = function(batch,statement){
      console.log("i am in undo awaish")
      $('.approve_batch_button')[0].disabled = false
      $scope.file_details.amount = $scope.file_details.amount + statement.balance_amount
      batch.amount   = batch.amount + statement.balance_amount
      $scope.file_details.patients = $scope.file_details.patients + 1 
      batch.patients  = batch.patients + 1
      $scope.removed = false
      $scope.undo_removed = true
      Statement.undo_patient(statement.id)
    }
}]);