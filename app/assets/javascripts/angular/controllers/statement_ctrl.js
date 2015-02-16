statPay.controller('StatementCntrl', ['$scope','$upload', '$http','Batch','$rootScope',function ($scope,$upload,$http,Batch,$rootScope) {
    $scope.message_saved = false

    $scope.can_upload_batch = false
    $scope.can_delete = false
    $scope.can_update = false
    $scope.front_desk  = false
    $scope.full_admin = false
    $scope.is_super_admin = false
    
    Batch.permissions().$promise.then(function(data){
    
    if(data[0].is_super_admin == true)
    {
      $scope.is_super_admin = true
    }
    else if (data[0].name == "Full Admin")
    {
      console.log("Full Admin")
      $scope.full_admin = true
    }
    else if (data[0].name == "Front Desk")
    {
      console.log("Front Desk")
      $scope.front_desk  = true
    }
    else
    {

        console.log("permissions")
        angular.forEach(data, function(value,key) {
          if (value.subject_class == "Batch" && value.action == "create")
          {
            $scope.can_upload_batch = true 
          }
          else if (value.subject_class == "Statement" && value.action == "update")
          {
            $scope.can_update = true 
          }
          else if (value.subject_class == "Batch" && value.action == "cancel")
          {
            $scope.can_delete = true 
          }
        });
      }
      
    })

    $scope.review_batch_table= false
    $scope.review_batch = function(){
      $scope.review_batch_table= true
    }
    $scope.approve = function(batch){
      var result = confirm("Are you sure you want to Approve?");
      if (result==true) {
        batch.status = "Approved"
        current_date= new Date();
        batch.approved_at = current_date
        batch.updated_at = current_date
        $scope.success.decide = true
        $scope.file_success = false
        console.log(batch.id)
        Batch.approve(batch.id)
        $scope.approved = false
      }
    }
    

    $scope.add_mesage = function(batch_id,msg){
      // $('.input_for_messages').val()
      // if ($('.input_for_messages').val().length > 0)
      // {
        console.log(msg)
        Batch.add_message(batch_id,msg)
        $scope.message_saved = true
      // }
    }

    $scope.remove_message = function(batch){
      batch.message = null
      Batch.add_message(batch.id)
      $scope.message = null
      $scope.message_saved = false
    }


     $scope.cancel_batch = function(batch){
      var result = confirm("Are you sure you want to Cancel?");
      if (result==true) {

        index = $scope.all_batches.indexOf(batch)
        $scope.all_batches.splice(index,1)
        $scope.cancel.decide = true
        $scope.success.decide = false
        Batch.cancel(batch.id)
        $scope.approved = false
      }
    }
   
   $scope.show_xml_output = function(batch){
    window.open('/batches/' + batch.id + '/xml_view');
   }
   $scope.show_csv_output = function(batch){
    window.open('/batches/' + batch.id + '/csv_details.xls');
   }

}]);