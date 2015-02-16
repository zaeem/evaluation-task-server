  statPay.directive("chooseFile",function(){
  return {
    restrict: "A",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        $("#real-file").trigger("click")

      })
    }
  };
})
statPay.directive("chooseAnotherFile",function(){
  return {
    restrict: "A",
    link: function(scope,element,attrs){
      element.bind("click",function(){
      	console.log('asd')
        $('.file-input').val('')
        $("#real-file").trigger("click")
      })
    }
  };
})


statPay.directive("checkValue",function(){
  return {
    restrict: "A",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        val = $(element).val()
        html_in = $(element).children('option[value='+val+']').html()
        if (html_in == "other")
        {
          console.log($(element).parents().eq(4).find('.lower-form'))
           $(element).parents().eq(4).find('.lower-form').css('display','block')
           $(element).parents().eq(4).find('.lower-form').removeClass('ng-hide')
           $(element).parents().eq(4).find('.submit-button-upper').addClass('ng-hide')
           $(element).parents().eq(4).find('.amount-input-upper').addClass('ng-hide')
        }
        else
        {
          $(element).parents().eq(4).find('.lower-form').addClass('ng-hide')
          $(element).parents().eq(4).find('.submit-button-upper').removeClass('ng-hide')
          $(element).parents().eq(4).find('.amount-input-upper').removeClass('ng-hide')
        }

      })
    }
  };
})


statPay.directive("clearInput",function(){
  return {
    restrict: "A",
    link: function(scope,element,attrs){
      element.bind("click",function(){
      	$('.file-input').val('')
      })
    }
  };
})


statPay.directive('appendOnApprove', function () {
  return {
    restrict: 'ABC',
    link: function (scope, element, attr) {
      element.bind('click', function () {
        console.log("aaaa")
        $('.file-input').val('')
        $('.panel-body-table').append('<div class="row"> <div class="col-sm-6"> <h4>kareo-PSB-sample.xml</h4> <div class="row"> <div class="col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-3"> Uploaded: </div> <div class="col-sm-4"> September 29, 2014 </div> </div> <div class="row"><div class="col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-3">	Approved: </div> <div class="col-sm-4"> --- </div> </div> <div class="row"> <div class="col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-3"> Status </div> <div class="col-sm-4"> uploading </div> </div> <div class="row"> <div class="col-sm-offset-1 col-sm-8">	 0 of 174 Patients Paid <br> $0.00 of $8671.14 Collected <br></div></div></div><div class="col-sm-6"><button class="btn btn-primary" style="margin-left:5px">Review Batch</button></div></div>')
      })
    }
  }
});

statPay.directive('previewAll', function () {
return {
  restrict: 'ABC',
  link: function (scope, element, attr) {
    element.bind('click', function () {
      var adArray =  $(element).parent().parent().parent().parent().find('.review_button')
      var i = 0, l = adArray.length;
      (function iterator() {
          adArray[i].click()
          console.log(i)
          if(++i<l) {
              setTimeout(iterator, 0);
          }
      })();


      // console.log("aaaa")
      // $(element).parent().parent().parent().parent().find('.review_button').each(function( index,value ) {
      //   console.log(value)
      //   value.click()
      //   var val = value
      //   // // $(this).click()
      //   setTimeout(function(val){
      //     console.log(val);
      //     val.click()
      //   }, 200000);
      // });
    })
  }
}
});

statPay.directive('closeAll', function () {
return {
  restrict: 'ABC',
  link: function (scope, element, attr) {
    element.bind('click', function () {
      console.log("aaaa")
      var adArray = $(element).parent().parent().parent().parent().find('.close_button')
      var i = 0, l = adArray.length;
      (function iterator() {
          adArray[i].click()
          console.log(i)
          if(++i<l) {
              setTimeout(iterator, 0);
          }
      })();
    })
  }
  }
});

statPay.directive('indexPreviewAll', function () {
return {
  restrict: 'ABC',
  link: function (scope, element, attr) {
    element.bind('click', function () {

      var adArray =  $(element).parent().parent().parent().parent().parent().parent().find('.review_button')
      var i = 0, l = adArray.length;
      (function iterator() {
          adArray[i].click()
          console.log(i)
          if(++i<l) {
              setTimeout(iterator, 0);
          }
      })();
    })
  }
}
});

statPay.directive('indexCloseAll', function () {
return {
  restrict: 'ABC',
  link: function (scope, element, attr) {
    element.bind('click', function () {
      console.log("aaaa")
      var adArray = $(element).parent().parent().parent().parent().parent().parent().find('.close_button')
      var i = 0, l = adArray.length;
      (function iterator() {
          adArray[i].click()
          console.log(i)
          if(++i<l) {
              setTimeout(iterator, 0);
          }
      })();
    })
  }
  }
});


statPay.directive("approve",function(){
  return {
    restrict: "ABC",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        console.log("aaaaaaaa")
       

      })
    }
  };
})

statPay.directive("cancel",function(){
  return {
    restrict: "ABC",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        $(element).parent().parent().parent().addClass("hide")

      })
    }
  };
})
statPay.directive("patientRemoveClicked",function(){
  return {
    restrict: "ABC",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        console.log("remove clickedaaaaaa")
        $(element).parent().parent().css('color','red')
        $(element).parent().parent().css('text-decoration', 'line-through')
       


      })
    }
  };
})

statPay.directive("undoRemoveClicked",function(){
  return {
    restrict: "ABC",
    link: function(scope,element,attrs){
      element.bind("click",function(){
        console.log("undo clicked")
        console.log($(element).parent().parent())
        $(element).parent().parent().css('color','black')
        $(element).parent().parent().css('text-decoration', 'none')
      })
    }
  };
})


statPay.directive("wordsLimit",function(){
  return {
    link: function(scope,element,attrs){
      element.bind("keydown", function (event) {
        if($(element).val().length < 90)
        {
          $(element).parents().eq(2).find('.words_length').html($(element).val().length + 1)
        }
      
      });    
    }
  };
});


statPay.directive("removeMessage",function(){
  return {
    link: function(scope,element,attrs){
      element.bind("click", function (event) {
          $(element).parents().eq(2).find('.words_length').html(0)
      
      });    
    }
  };
});


statPay.directive("restrictToNumber",function(){
  return {
    link: function(scope,element,attrs){
      element.bind("keydown", function (event) {
         console.log($(element))
      
      });    
    }
  };
});