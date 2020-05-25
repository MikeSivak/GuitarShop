//Filter list

function show(){   
    if(document.getElementById('listSearch').value !== ""){
        document.getElementById('myList').style.display = 'block';
    } 
    if(document.getElementById('listSearch').value == ""){
        document.getElementById('myList').style.display = 'none';
    }     
}

$(document).ready(function(){
  $("#listSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});