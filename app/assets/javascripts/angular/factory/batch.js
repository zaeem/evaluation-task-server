statPay.factory('Batch', ['$resource', function($resource) {
  function Batch() {
    this.service = $resource('/provider/api/v1/batches/:id/:approve:cancel:get_batch_statements:line_items:filter:current_practice:add_message:remove_message', {id: '@id'},
                  {approve:{method:"GET",isArray:false},
                  get_batch_statements:{method:"GET",isArray:true},
                  cancel:{method:"GET",isArray:false},
                  filter:{method:"GET",isArray:true},
                  current_practice:{method:"GET",isArray:false},
                  line_items:{method:"GET",isArray:true},
                  add_message:{method:"GET",isArray:false},
                  permissions: {
                      url: ' /provider/api/v1/patients/permissions/',
                      method:"GET",
                      isArray:true
                    },
                  remove_message:{method:"GET",isArray:false}
                 });
  };


  Batch.prototype.all = function(page_no) {
    return this.service.query({page: page_no});
  }
  
  Batch.prototype.approve= function(BatchID){
    return this.service.approve({id: BatchID,approve: "approve"})
  }
  Batch.prototype.cancel= function(BatchID){
    return this.service.cancel({id: BatchID,approve: "cancel"})
  }
  Batch.prototype.get_batch_statements  = function(BatchID){
    return this.service.get_batch_statements({id: BatchID,get_batch_statements: "get_batch_statements"})
  }
  Batch.prototype.filter  = function(start_date,end_date){
    return this.service.get_batch_statements({id: 1,start_date:start_date,end_date:end_date, filter: "filter"})
  }


  Batch.prototype.current_practice  = function(){
    return this.service.current_practice({id: 1,current_practice: "current_practice"})
  }


  Batch.prototype.add_message = function(BatchID,message) {
    this.service.add_message({id: BatchID,message:message,add_message: "add_message"})
  }
   Batch.prototype.remove_message = function() {
    this.service.remove_message({id: 1,remove_message: "remove_message"})
  }
  Batch.prototype.permissions= function(){
    return this.service.permissions()
  }

  return new Batch;
}]);