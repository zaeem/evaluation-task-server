statPay.factory('Patient', ['$resource', function($resource) {
  function Patient() {
    this.service = $resource('/provider/api/v1/patients/:id/', {id: '@id'},
                  { 
                    total_count: {
                      url: '/provider/api/v1/patients/total_count/',
                      method:"GET",
                      isArray:true
                    },
                    permissions: {
                      url: ' /provider/api/v1/patients/permissions/',
                      method:"GET",
                      isArray:true
                    },

                    searched_st_blnc: {
                      url: '/provider/api/v1/patients/searched_st_blnc/',
                      method:"GET",
                      isArray:true,
                    },
                    statement_balances: { 
                      url: '/provider/api/v1/patients/statement_balances/',
                      method:"GET",
                      isArray:true,
                    },
                    cancel: { method:"GET", isArray:false }
                 });
  };

  Patient.prototype.searched_st_blnc= function(name, re_bl_start, re_bl_end, ls_st_date_start, ls_st_date_end){
    return this.service.searched_st_blnc({ name: name, re_bl_start: re_bl_start, re_bl_end: re_bl_end, ls_st_date_start: ls_st_date_start, ls_st_date_end: ls_st_date_end})
  }
  Patient.prototype.statement_balances= function(offset, limit){
    return this.service.statement_balances({offset: offset, limit: limit})
  }
  Patient.prototype.total_count= function(){
    return this.service.total_count()
  }
  

  Patient.prototype.permissions= function(){
    return this.service.permissions()
  }


  return new Patient;


}]);