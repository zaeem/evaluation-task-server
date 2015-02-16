statPay.controller('BatchesController', ['$scope','$upload', '$http','Batch','$rootScope',function ($scope,$upload,$http,Batch,$rootScope) {
    $scope.file_name = '';
    $scope.details = false
    $scope.file_attached = false
    $scope.show_table = false
    $scope.success ={decide:false}
    $scope.cancel = {decide: false}
    $scope.file_id = 0
    $scope.wrong_file_format = false 
    $scope.file_details = {created_at: null,patients: 0,amount: 0}
    $scope.all_batches = []
    $scope.message_saved = false
    $scope.approved = true
    $scope.current_file = []
    $scope.all_batches.statements = []
    $scope.total_billed = 0
    $scope.total_batches = 0
    $scope.loading  = false
    $scope.file_success = false
    $scope.page_number = 1
    $scope.ajax_loader = true
    $scope.startDate = ''
    $scope.endDate = ''
    $scope.exception = ''
    $scope.div_color = ''
    $scope.preview_all = false
    $scope.onFileSelect = function($files) {
      $scope.file_attached = true
      $scope.details = false
      $scope.show_table = false
      $scope.file_name = $files[0].name
      $scope.file = $files[0] 
      $('.upload_file_button')[0].disabled = false
      $('.cancel_file_button')[0].disabled = false
      $scope.loading  = false
    }


    $scope.can_upload_batch = false
    $scope.is_super_admin = false
    $scope.can_delete = false
    $scope.can_update = false
    $scope.front_desk  = false
    $scope.full_admin = false
    
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


    Batch.all($scope.page_number).$promise.then(function(data){

     $scope.all_batches = data
     if(data.length > 0)
     {
        $scope.total_batches = data[0].count
     }
     else
     {
        $scope.total_batches = null;
     }
      
     $scope.ajax_loader = false

    })

    $scope.add_mesage = function(batch_id){
      if ($('.input_for_messages').val().length > 0)
      {
        Batch.add_message($scope.file_id,$scope.message)
        $scope.message_saved = true
      }
    }

    $scope.remove_message = function(batch_id){
      Batch.remove_message($scope.file_id)
      $scope.message = null
      $scope.message_saved = false
    }


    $scope.more_batches = function(){
      $scope.ajax_loader = true
      $scope.page_number = $scope.page_number + 1
      Batch.all($scope.page_number).$promise.then(function(data){
        angular.forEach(data,function(value,key){
          $scope.all_batches.push(value)
           $scope.ajax_loader = false
      })
        
      })
    }

    $scope.saveUnApproved = function(){
      var uploadUrl = "/api/v1//batches";
      $scope.uploadFileToUrl($scope.file, uploadUrl);
    }
  
    $scope.chooseAnother = function(){

      console.log($scope.current_file)
      $scope.all_batches.push($scope.current_file)

    }
    $scope.hideAll = function(action,$files){
      if (action == "success")
      {
        var result = confirm("Are you sure you want to Approve?");
        if (result==true) {
          $scope.details = false
          $scope.file_attached = false
          $scope.show_table = false
          $scope.file_name = '';
          Batch.approve($scope.file_id).$promise.then(function(data){
              Batch.all(1).$promise.then(function(data){
                $scope.all_batches = data
              })
            })
          $scope.message = null
          $scope.message_saved = false
          $scope.success.decide = true
          $scope.cancel.decide = false
          $scope.wrong_file_format = false
          $scope.file_success = false
          $scope.loading  =false
        }
      }
      else if (action == 'cancel')
      {
        var result = confirm("Are you sure you want to Cancel?");
        if (result==true) {
          $scope.message = null
          $scope.message_saved = false
          $scope.details = false
          $scope.file_attached = false
          $scope.show_table = false
          $scope.file_name = '';
          Batch.cancel($scope.file_id)
          $scope.cancel.decide = true
          $scope.wrong_file_format = false
          $scope.success.decide =false
        }
      }
      else if (action =='cancel_file' )
      { var result = confirm("Are you sure you want to Cancel?");
        if (result==true) {
          $scope.details = false
          $scope.file_attached = false
          $scope.show_table = false
          $scope.file_name = '';
          $scope.cancel.decide = true
          $scope.wrong_file_format = false
          $scope.success.decide =false
        }

      }
    }
   $scope.import_contacts = function(){


    $http.get('/api/v1/get_contacts_by_api', {msg:'hello word!'}).
      success(function(data, status, headers, config) {
        console.log('success');
      }).
      error(function(data, status, headers, config) {
        console.log("error");    
      });

   }

   $scope.uploadFile = function(){
   	var uploadUrl = "api/v1//batches";
    $scope.loading = true
  	$scope.uploadFileToUrl($scope.file, uploadUrl);
    console.log("aaa")
    $('.upload_file_button')[0].disabled = true
    $('.cancel_file_button')[0].disabled = true
   }

  $scope.uploadFileToUrl = function(file, uploadUrl){
    console.log("i am in uploader")
    console.log(file)
    console.log(uploadUrl)
    var fd = new FormData();
    fd.append('batch[file]', file);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(data){
       if (!data.id)
       {
        $scope.exception = data.exception
        if ($scope.exception == "Please complete you information")
        {
          window.location.href = '/provider/account_detail'
        }
        $scope.wrong_file_format = true
        $('.upload_file_button')[0].disabled = false
        $('.cancel_file_button')[0].disabled = false
        $scope.loading =false
        $scope.success.decide =false
        $scope.cancel.decide = false
       }
      else{
        $scope.file_success = true
        $scope.details = true
        console.log("successfully done")
        console.log(data.created_at)
        $scope.file_details.created_at = data.created_at
        $scope.file_details.amount = 0;
        $scope.file_details.patients = data.patients

        $scope.file_id = data.id
        $scope.current_file = data
        angular.forEach(data.statements,function(value,key){
        // Batch.get_batch_statements(value.id).$promise.then(function(data){
          $scope.file_details.amount = $scope.file_details.amount + value.balance_amount

        // })
      })
      }
    })
    .error(function(){
    });
  }
    $scope.close_alert = function()
    {
      console.log("closing alert")
      $scope.success.decide = false
      $scope.cancel.decide = false
      $scope.wrong_file_format = false
      $scope.file_success = false
    }
    $scope.filter = function(){
      $scope.start_date = $scope.startDate
      $scope.end_date = $scope.endDate
      Batch.filter($scope.start_date,$scope.end_date).$promise.then(function(data){
          console.log(data)
          $scope.all_batches = data
        })
      }
}]);
