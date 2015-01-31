   
   var lineObjOffsetTop = 2;
   
   function createTextAreaWithLines(id)
   {
      $("#codeTextarea").val(localStorage["codeCafe_text"])
      var el = document.createElement('DIV');
      var ta = document.getElementById(id);
      ta.parentNode.insertBefore(el,ta);
      el.appendChild(ta);
      $("#codeTextarea").css("height", (document.body.clientHeight - $("#submit").css("height").split("px")[0]*2+5) + 'px');     
      el.className='textAreaWithLines';
      el.style.width = (ta.offsetWidth + 30) + 'px';
      ta.style.position = 'absolute';
      ta.style.left = '30px';
      el.style.height = (ta.offsetHeight + 2) + 'px';
      el.style.overflow='hidden';
      el.style.position = 'relative';
      el.style.width = (ta.offsetWidth + 30) + 'px';
      var lineObj = document.createElement('DIV');
      lineObj.style.position = 'absolute';
      lineObj.style.top = lineObjOffsetTop + 'px';
      lineObj.style.left = '0px';
      lineObj.style.width = '27px';
      el.insertBefore(lineObj,ta);
      lineObj.style.textAlign = 'right';
      lineObj.className='lineObj';
      var string = '';
      for(var no=1;no<200;no++){
         if(string.length>0)string = string + '<br>';
         string = string + no;
      }
      $("#codeTextarea").css("width", (document.body.clientWidth / 2 - 60) + 'px');

      $(".textAreaWithLines").css("width", (document.body.clientWidth / 2 - 1) + 'px');
      $(".displayText").css("height", (document.body.clientHeight - $("#header").css("height").split("px")[0] - 5) + "px")
      ta.onkeydown = function() { positionLineObj(lineObj,ta); };
      ta.onmousedown = function() { positionLineObj(lineObj,ta); };
      ta.onscroll = function() { positionLineObj(lineObj,ta); };
      ta.onblur = function() { positionLineObj(lineObj,ta); };
      ta.onfocus = function() { positionLineObj(lineObj,ta); };
      ta.onmouseover = function() { positionLineObj(lineObj,ta); };
      lineObj.innerHTML = string;
      
   }
   
   function positionLineObj(obj,ta)
   {
      obj.style.top = (ta.scrollTop * -1 + lineObjOffsetTop) + 'px';   
   
      
   }
var dispRepeat = '';
   function runData()
   {
      dispRepeat = '';
      localStorage["codeCafe_text"] = $("#codeTextarea").val();
      console.log($("#codeTextarea").val())
      var result = eval(String($("#codeTextarea").val()))
      console.log(eval($("#codeTextarea").val().trim()))
      scrollBottom();
      //$("#rightText").val($("#rightText").val() +"\n"+ result)

   }



   
   function print(input)
   {
      if(dispRepeat != input)
      {
         var result;
         if(typeof(input) == 'string')
         {
            result = input;
         }
         else {
            result = eval(String(input))
         }
         $("#rightText").val($("#rightText").val() +"\n"+ "Display: "+result);
         dispRepeat = input;
      }
   }
   function scrollBottom(){
    $("#rightText").animate({ scrollTop: "+=100" }, "fast");
   }