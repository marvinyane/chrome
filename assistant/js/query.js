$(document).ready(function(){
  var tables = $('#GridViewPUNCH_CARD_INFO');

  var items = {};
  tables.each(function(){
    var tbody = $(this).find('tbody');
    tbody.each(function(){
      $(this).find('tr').each(function(){
        var item = {};
        var i = 0;
        $(this).find('td').each(function(){
          item[i] = $(this).text().replace(/\s/g, "");
          i++;
        });

        if(i >= 9 && item[4] != null && item[4] != ""){
          if(item[0] >= '2013-10-01' && item[0] <= '2013-10-06')
          {
            items[item[0]] = item;
          }
          else if(item[1] == '六' || item[1] == '日')
          {
            items[item[0]] = item;
          }
          else if(item[4] > '19:00:00' || item[4] < '05:30:00' && item[4] != ""){
            item[3] = '18:30:00';
            items[item[0]] = item;
          }
        }
      });
    });		
  });

  var data = "";

  $.each(items, function(key, value){
    $.each(value, function(key, value){
      data += value;
      data += " ";
    });
    data += '\r';
  });

  localStorage.setItem('myInfo', data);
  localStorage.setItem('step', '0');
  localStorage.setItem('myCount', '0');
  localStorage.setItem('query', '0');




  //var taxi = "<button name=\"Taxi\">Taxi</button>";
  $("body").prepend("<input type='button' value='Taxi' id='Taxi'>");


  $('#Taxi').click(function() {
    var content = '<table cellspace="0" rules="all" border="1">';
    $.each(items, function(key, item) {
      if(item[4] > '22:01:00' || item[4] < '05:30:00' && item[4] != "") {
        content += '<tr align="center" style="height:20px;">';
        content += '<td style="width:80px">'+item[0]+"</td>";
        content += '<td style="width:80px">'+item[1]+"</td>";
        content += '<td style="width:80px">'+"Reason"+"</td>";
        content += '<td style="width:80px">'+item[4]+"</td>";
        content += '<td style="width:80px">'+item[4]+"</td>";
        content += '<td style="width:80px">'+"Taxi"+"</td>";
        content += '<td style="width:80px">'+"100"+"</td>";
        content += "</tr>"
      }
    });
  
   content += "</table>";
   console.log(content);
   $("body").append(content);

  });


});
