statPay.service('User', function() {
  return {
    getUser: function() {
      user = []; 
       $.ajax({
        url: '/provider/api/v1/users/get_user',
        async:   false,
        method:  'GET'
       }).success(function(data){
        user = data
      });
      return user;
    }
  };
});