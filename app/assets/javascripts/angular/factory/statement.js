statPay.factory('Statement', ['$resource', function($resource) {
  function Statement() {

    this.service = $resource('/provider/api/v1/statements/:id/:line_items:line_items_and_communications:undo_patient:writeoff_balance:undo_writeoff_balance', {id: '@id'},

                  {
                    write_off:{
                      url: '/provider/api/v1/statements/:id/write_off_reasons',
                      method:"POST",
                      isArray:false
                    },
                    undo_write_off:{
                      url: '/provider/api/v1/statements/:id/undo_write_off',
                      method:"PUT"
                    },
                    line_items:{method:"GET",isArray:true},
                    line_items_and_communications:{method:"GET",isArray:true},
                    undo_patient:{method:"GET",isArray:true},
                    update_patient:{method:"PUT",isArray:false}
                 });
  };
  Statement.prototype.write_off = function(S_Id, data) {
      this.service.write_off({id:S_Id, data: data});
  }
  Statement.prototype.undo_write_off = function(S_Id) {
      this.service.undo_write_off({id:S_Id});
  }
  Statement.prototype.remove_patient = function(S_Id) {
      this.service.update_patient({id:S_Id});
  }
  Statement.prototype.line_items = function(S_Id) {
      return this.service.line_items({id:S_Id, line_items: "line_items"});
  }
  Statement.prototype.line_items_and_communications = function(S_Id) {
      return this.service.line_items_and_communications({id:S_Id, line_items_and_communications: "line_items_and_communications"});
  }
  Statement.prototype.undo_patient = function(S_Id) {
      this.service.undo_patient({id:S_Id,undo_patient: "undo_patient"});
  }
  return new Statement;
}]);