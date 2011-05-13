$(function(){
  var nextid;
  var maxrow = 9;
  var maxcol = 9;
  var blocked = ["r1c4", "r2c3", "r2c5", "r4c0", "r4c8", "r5c4", "r6c2", "r6c6", "r7c4"];
  var solhor = ["Milionari","anlE Ager","UAI U Apa","Rugositat"," Ganivet ","Fura isaC","Ar Dux Na","Rape Raim","Traspassa"];
  var solver = ["Maur Fart","Inaugurar","Lligar Pa","IE Onades","O Usi U P","Na ivixrA","Agates As","Repatanis","Irat Cama"];

  $.map(blocked, function(cas){
    $("#"+cas).attr("disabled", true);
    $("#"+cas).val(" ");
  });

  function nextCell(cas,dir){
    var regex = /^r(\d)c(\d)$/;
    var res = regex.exec(cas);
    var row = parseInt(res[1]);
    var col = parseInt(res[2]);
    if (dir === "horizontal")
      col += 1;
    else
      row += 1;
    return "r"+row+"c"+col;
  };

  $("input").keyup(function(e){
    var cont = $(this).val();
    if (cont !== "")
      {
        var id = $(this).attr("id");
        var dir = $('input[type="radio"]:checked').val();
        nextid = nextCell(id,dir);
        $("#"+nextid).focus();
      }
  });

  $('input[type="radio"]').click(function(e){
    $("#"+nextid).focus();
  });

  $("input").click(function(e){
    nextid = $(this).attr("id");
  });

  $("#solver").click(function(e){
    var resphor = [];
    var respver = [];
    $("#box input").each(function(index){
      var col = index%maxcol;
      respver[col] = respver[col] === undefined ? "" : respver[col];
      respver[col] += $(this).val();
      var row = (index-col)/maxcol;
      resphor[row] = resphor[row] === undefined ? "" : resphor[row];
      resphor[row] += $(this).val();
    });

    var correct = solution(solhor,resphor) && solution(solver,respver);

    if (correct)
      $('#box input:not([disabled="disabled"])').css("background-color","#6f6");
    else
      {
        $('#box input:not([disabled="disabled"])').css("background-color","#f66").attr("disabled", true);
      }
      return false;
  });

  function solution(sol,resp){
    for(var i=0;i<sol.length;i++)
    {
      if (sol[i].toLowerCase() !== resp[i].toLowerCase())
        return false;
    }
    return true;
  };
});
