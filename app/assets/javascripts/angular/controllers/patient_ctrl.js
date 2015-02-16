statPay.controller('PatientsController', ['$scope','$upload', '$http','Patient', 'User','$rootScope',function ($scope,$upload,$http,Patient, User,$rootScope) {
  // $scope.search_name = "";
  // $scope.start_st_date = "";
  // $scope.end_st_date = "";
  // $scope.from_rem_blnc = "";
  // $scope.to_rem_blnc = "";
  $scope.predicate = 'id';
  $scope.patients = []
  // $scope.patients_count = 0;

  // $scope.search_patients_flag = false; 
  // $scope.loaded_patients = []
  // $scope.current_user = User.getUser();
  // var set_interval;

  // Patient.total_count().$promise.then(function(data) {
  //   $scope.patient_loading = true;
  //   $scope.patients_count = data[0];
  //   // initialize_set_interval(50); 
  //   loadNextPatients(0, 50)
    
  // });
    $scope.is_super_admin = false
    $scope.can_update = false
    $scope.front_desk  = false
    $scope.full_admin = false
    
    Patient.permissions().$promise.then(function(data){
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
        if (value.subject_class == "Transaction" && value.action == "create")
        {
          $scope.can_update = true 
        }
       
      });
    }
    
  })




  $scope.statements_blnc_url = window.location.origin + "/provider/api/v1/patients/statement_balances";
  $scope.urlParams = {
    name: $scope.search_name, re_bl_start: $scope.from_rem_blnc, re_bl_end: $scope.to_rem_blnc, ls_st_date_start: $scope.start_st_date, ls_st_date_end: $scope.end_st_date
  };
  // function initialize_set_interval(limit){
  //   var offset = 0;

  //   set_interval = setInterval(function(){
  //     var patients_length = $scope.loaded_patients.length;
  //     if (patients_length > 0){
  //       offset = patients_length - 1;
  //     }
  //     console.log($scope.loaded_patients.length)
  //     if (offset < $scope.patients_count - 1 ){
  //       loadNextPatients(offset, limit)
  //     } else {
  //       $scope.patient_loading = false;
  //       clearInterval(set_interval);
  //     }
  //   }, 1000);
  // }

  // $scope.$watch('headerLoad', function (value) {
  //   $('#pb-content-header-panel').scrollToFixed({ 
  //     marginTop: $('.navbar.navbar-default.navbar-fixed-top').outerHeight()
  //   });
  //   $('#pb-content-header-panel').next('div').remove();
  // });
  // // apply all filter function
  // function applyAllFilter(){
      
  //   if( $scope.patients_count > $scope.loaded_patients.length &&  ( ($scope.search_name && $scope.search_name != '') || ($scope.from_rem_blnc && $scope.from_rem_blnc != '') || ($scope.to_rem_blnc || $scope.to_rem_blnc != '') || ($scope.start_st_date && $scope.start_st_date != '') || ($scope.end_st_date && $scope.end_st_date != '') ) )
  //   {
  //     Patient.searched_st_blnc($scope.search_name, $scope.from_rem_blnc, $scope.to_rem_blnc, $scope.start_st_date, $scope.end_st_date).$promise.then(function(data) {
  //       $scope.patient_loading = false;
  //       $scope.search_patients_flag = true;
  //       $scope.patients = []
  //       // angular.copy($scope.patients, $scope.temp_arr)
  //       $.each(data, function( index, value ) {
  //         $scope.patients.push(value)
  //       });
  //     });// end of patient searched st balnc
  //   } // end of if $scope.patients_count != $scope.patients.length
  //   else
  //   {
  //     if ($scope.patients < $scope.loaded_patients)
  //     {
  //       $scope.patient_loading = true;
  //       $scope.search_patients_flag = false;
  //       angular.extend($scope.patients, $scope.loaded_patients);

  //     }
  //     else
  //     {
  //       $scope.patient_loading = false;
  //     }
  //     var search_name = $scope.search_name.toLowerCase();
  //     var nameReg = new RegExp(search_name);
  //     angular.forEach($scope.patients, function(patient) {

  //       var nameRes = nameFilter(nameReg, patient.name);
  //       var dRes = dateFilter(patient.last_statment);              
  //       var rBRes = remBlncFilter(patient.last_statment);              
  //       patient.excludedByFilter = !(nameRes && dRes && rBRes);
  //     }); // end of angular for each
        
  //   } // end of else


      
  //   }
  //   //end of applyAll filter 


  //   // apply both filter
  //   $scope.applySearchFilter = function() {
  //     if ($('.paginate-page-1').length > 0){
  //       $('#st_bl_name_hidden').val($scope.search_name); 
  //       $('#st_bl_rem_from_hidden').val($scope.from_rem_blnc); 
  //       $('#st_bl_rem_to_hidden').val($scope.to_rem_blnc); 
  //       $('#st_bl_staet_date_hidden').val($scope.start_st_date); 
  //       $('#st_bl_staet_end_hidden').val($scope.end_st_date);
  //       // $('').trigger('click');
  //       angular.element('.paginate-page-1').trigger('click');
  //     }
  //     else{
  //       applyAllFilter();
  //     }
  //   };

  //   // apply name filter
  //   $scope.applyNameSearchFilter = function() {
  //     var search_name = $scope.search_name.toLowerCase();
  //     var nameReg = new RegExp(search_name);

  //     angular.forEach($scope.patients, function(patient) {
  //       var nameRes = nameFilter(nameReg, patient.name);
  //       patient.excludedByFilter = !(nameRes);
  //     });
  //   };

  //   // apply name filter
  //   $scope.applyRemBlncSearchFilter = function() {

  //     angular.forEach($scope.patients, function(patient) {
  //       var remBlncRes = remBlncFilter(patient.last_statment);              
  //       patient.excludedByFilter = !(remBlncRes);
  //     });

  //   };
    

  //   // apply date range filter
  //   $scope.applyDateSearchFilter = function() {

  //     angular.forEach($scope.patients, function(patient) {
  //       var dRes = dateFilter(patient.last_statment);              
  //       patient.excludedByFilter = !(dRes);
  //     });
  //   };

    
    
  //   function nameFilter(nameReg, name){
  //       name = name.replace(/\s{2,}/g, ' ');
  //     if (name && name != ""){
  //       return nameReg.test(name.toLowerCase());
  //     }
  //     else{
  //       return false;
  //     }
  //   }

  //   function dateFilter(last_statment){
  //     var res = true;
  //     if (last_statment){
  //       if ($scope.start_st_date && $scope.start_st_date != ""){
  //         var starting_date = new Date($scope.start_st_date)
  //         starting_date.setDate(starting_date.getDate() - 1);
  //         res = new Date(last_statment.statement_date) >= starting_date; 
  //       }
  //       if (res && $scope.end_st_date && $scope.end_st_date != ""){
  //         res = new Date(last_statment.statement_date) <= new Date($scope.end_st_date); 
  //       }
  //     }
  //     else{
  //       res = false;
  //     }
  //     if ( (!$scope.start_st_date || $scope.start_st_date == "") && (!$scope.end_st_date || $scope.end_st_date == "") ){
  //       res = true; 
  //     }
  //     return res;
  //   }

  //   function remBlncFilter(last_statment){
  //     var res = true;
  //     if (last_statment){
  //       if ($scope.from_rem_blnc && $scope.from_rem_blnc != ""){
  //         res = last_statment.remaining_balance >= $scope.from_rem_blnc; 
  //       }
  //       if (res && $scope.to_rem_blnc && $scope.to_rem_blnc != ""){
  //         res = last_statment.remaining_balance <= $scope.to_rem_blnc; 
  //       }
  //     }
  //     else{
  //       res = false;
  //     }
  //     if ( (!$scope.from_rem_blnc || $scope.from_rem_blnc == "") && (!$scope.to_rem_blnc || $scope.to_rem_blnc == "") ){
  //       res = true; 
  //     }
  //     return res;
  //   }

  function loadNextPatients(offset, limit){
    
    Patient.statement_balances(offset, limit).$promise.then(function(data) {
      $.each(data, function( index, value ) {
        if ( $scope.search_patients_flag == false){
          $scope.patients.push(value)
        }
        $scope.loaded_patients.push(value)
      });
    });
  }
  
  }]);
statPay.controller('PatientController', ['$scope', '$upload', '$http', 'Patient', 'Statement', 'User', '$rootScope', '$modal', '$window', '$templateCache',function ($scope,$upload,$http,Patient, Statement, User, $rootScope, $modal, $window, $templateCache) {




  if ($scope.patient.patient_cards)
  {
    $scope.patient.patient_cards.push({card_name: "other"})
  }
  $scope.card = $scope.patient.patient_cards[0]

  $window.Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );

  $scope.show_statements_details = false;
  if ($scope.patient.last_statment.status == 'write-off'){
    $scope.write_off_balance = true;  
  }
  else{
    $scope.write_off_balance = false; 
  }
  
  // hide statement Comment
  $scope.toogleStatment = function() {
    $scope.show_statements_details = $scope.show_statements_details === true ? false : true;
    if( $scope.show_statements_details == true && $scope.patient.last_statment.line_items.length== 0){
      Statement.line_items_and_communications($scope.patient.last_statment.id).$promise.then(function(data){
        $scope.patient.last_statment.line_items = data[0]
        
        $scope.patient.last_statment.communications = data[1]
        $scope.patient.data_of_birth = data[2]
        
        // if (data[3]){
        //   $scope.patient.patient_cards = []
        //   $.each(data[3], function( index, value ) {
        //     $scope.patient.patient_cards[index] = value          
        //   });
        //   $scope.patient.default_card = data[4]
        //   if ($scope.patient.patient_cards)
        //   {
        //     $scope.patient.patient_cards.push({card_name: "other"})
        //   }
        // }
        // $scope.card = $scope.patient.patient_cards[0]
      
      });
    }
  }

  $scope.undoWfB = function($event, stat){
    event.stopPropagation();
    event.preventDefault();
    Statement.undo_write_off(stat.id)
    $scope.write_off_balance = false;
  }
  
  $scope.writeOffBalanceModal = function(event, statement){
    event.stopPropagation();
    event.preventDefault();

    var writeOffBalanceModalInstance = $modal.open({
      templateUrl: 'patient/writeoff_balance_modal.html',
      controller: 'WriteoffBalanceModalInstanceCtrl',
      resolve: {
        patient: function () {
          return $scope.patient;
        },
        statement: function () {
          return statement;
        }
      }
    });

    writeOffBalanceModalInstance.result.then(function(data) {

      $.ajax({
        type: 'POST',
        url: '/provider/api/v1/statements/'+ statement.id +'/write_off_reasons',
        data: {
          write_off_reason: data,
          'write_off_reason[amount]': statement.remaining_balance
        },
        dataType: 'json',
        success: function (data) {
          $scope.write_off_balance = true;
        }   
      });//end of ajax

    });
  }

  // Stripe Response Handler 
  $scope.stripeCallback = function (code, result) {

    if (result.error) { 
      payment_form = $('.payment_form.'+ $scope.patient.last_statment.id);

      payment_form.find('.stripe_error').text("*" + result.error.message)
    } 
    else { 
      set_a_transaction(result.id)
                 
    }
  };


  $scope.submit_card = function (token,card) {
    console.log(token)
    console.log(card)
    set_card_transaction(token,card)
  };


  function set_card_transaction(token,card_id) {
    payment_form = $('.payment_form.'+ $scope.patient.last_statment.id);
    amount = payment_form.find('input.card_amount').val();
    
    $.ajax({
      type: 'POST',
      url: '/statements/' + $scope.patient.last_statment.id + '/transactions',
      dataType: 'json',
      data: {
        'token':token,
        'amount':amount,
        'card':card_id
      },
      success: function(data) {

        $scope.payment_succeed_alert = true;
        $scope.patient = data.statement;
        if ($scope.patient.last_statment.status == 'write-off'){
          $scope.write_off_balance = true;  
        }
        else{
          $scope.write_off_balance = false; 
        }
        $scope.$apply();
        bootbox.alert(data.status);
      }

    });//end of ajax
  }


  function set_a_transaction(stripe_id) {
    payment_form = $('.payment_form.'+ $scope.patient.last_statment.id);
    amount = payment_form.find('input.card_amount').val();
    var transaction = {
        'amount':  amount,
        'paid_by': payment_form.find('input.name_on_card').val(),
        'stripe_token': stripe_id,
        'email': payment_form.find('input.pat_email').val(),
        'other_write_off' : payment_form.find('input.is_write_off').is(':checked')
      };
    $.ajax({
      type: 'POST',
      url: '/statements/' + $scope.patient.last_statment.id + '/transactions',
      dataType: 'json',
      data: {
        'transaction' : transaction
      },
      success: function(data) {

        $scope.payment_succeed_alert = true;
        $scope.patient = data.statement;
        if ($scope.patient.last_statment.status == 'write-off'){
          $scope.write_off_balance = true;  
        }
        else{
          $scope.write_off_balance = false; 
        }
        $scope.$apply();
        bootbox.alert(data.status);
      }

    });//end of ajax
  }

}]);

// statPay.controller('PatientStatmentController', ['$scope','$rootScope', '$modal', 'Statement', 'User',function ($scope, $rootScope, $modal, Statement, User) {

//   if ($scope.stat.status == 'write-off'){
//     $scope.write_off_stat_balance = true;  
//   }
//   else{
//     $scope.write_off_stat_balance = false; 
//   }

//   $scope.undoWfSB = function($event, stat){
//     event.stopPropagation();
//     event.preventDefault();
//     Statement.undo_write_off(stat.id)
//     if (stat.id == $scope.patient.last_statment.id){
//       $scope.write_off_balance = false;
//     }
//     $scope.write_off_stat_balance = false;
//   }
//   $scope.wOBSModal = function(event, statement){
//     event.stopPropagation();
//     event.preventDefault();

//     var wOBSModalInstance = $modal.open({
//       templateUrl: 'patient/writeoff_balance_modal.html',
//       controller: 'WriteoffBalanceModalInstanceCtrl',
//       resolve: {
//         patient: function () {
//           return $scope.patient;
//         },
//         statement: function () {
//           return statement;
//         }
//       }
//     });

//     wOBSModalInstance.result.then(function (data) {
//       $.ajax({
//         type: 'POST',
//         url: '/provider/api/v1/statements/'+ statement.id +'/write_off_reasons',
//         data: {
//           write_off_reason: data
//         },
//         dataType: 'json',
//         success: function (data) {
//           if (statement.id == $scope.patient.last_statment.id){
//             $scope.write_off_balance = true;
//           }
//           $scope.write_off_stat_balance = true;
//         }   
//       });//end of ajax

//     });
//   }

// }]);

statPay.controller('WriteoffBalanceModalInstanceCtrl', ['$scope','$modalInstance','patient', 'statement', function ($scope, $modalInstance, patient, statement) {

  $scope.patient = patient;
  $scope.statement = statement;
  $scope.submit = function (writeoff) {
    if (writeoff !== undefined){
      $modalInstance.close(writeoff);
    }
    else{
      alert("Please provide some reasons!")
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
