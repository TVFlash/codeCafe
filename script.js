  var saveTimeout;

  function save() {
    if (saveTimeout) clearTimeout(saveTimeout);
    localStorage.setItem("codeCafe_text", myCodeMirror.getValue());
    $("#save").html("Saved!");

    var saveTimeout = setTimeout(function() {
      $("#save").html("Save");
    }, 1000);

  }

  function runData() {
    save();
            try {
                var result = eval(String(myCodeMirror.getValue()));
            } catch (e) {
                console.log(e);
                result = e.message;
    $("#rightText").val($("#rightText").val() +"\n"+ ">: "+result);

            }
  }

  function clearS() {
        $("#rightText").val("");
  }

  function Print(input) {
    var result;
    var answer = "Hello";
    if (typeof(input) === 'string') {
      result = input.trim();
    } else if(typeof(input) === 'boolean') {
      console.log("Boolean: "+input)
      result = input;
    } else {
      result = eval(String(input))
    }
     
    $("#rightText").val($("#rightText").val() +"\n"+ ">: "+result);
    dispRepeat = input;
    $("#rightText").animate({ scrollTop: "+=20" },1);
  }

  window.print = Print;
  window.clear = clearS;
  function switchTheme() {
    var theme = localStorage.getItem("theme");

    if (theme === "dark") {
      myCodeMirror.setOption("theme", "xq-light");
      localStorage.setItem("theme", "light");
      $("#dark").html("Light");
    } else {
      myCodeMirror.setOption("theme", "monokai");
      localStorage.setItem("theme", "dark");
      $("#dark").html("Dark");
    }
  }
