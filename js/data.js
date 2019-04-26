//Some variables
var species = ["common_pipistrelle", "nathusius_pipistrelle", "soprano_pipistrelle", "myotis", "leislers_bat", "brown_long_eared", "lesser_Horseshoe", "unknown", "not_identified"];

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

//Helpful functions
function presentData(data){

  $("#call-count").text('Calls: ' + data['calls'].length);

  var counts = [0,0,0,0,0,0,0,0,0];

  $.each(data['calls'], function(key, value){

    var specie = value['species'].toLowerCase();
    specie = specie.replace(" ", "_")

    if(specie == "not_identified"){
      counts[8] += 1;
    }else{
      var index = species.indexOf(specie);
      counts[index] += 1;
    }

  })

  $.each(species, function(key, value){
    $("#" + value + "-count").text(counts[key]);
  })

  $("#no-calls-queryed").hide();
  $(".queryed-info").attr('style', 'display: flex');

}

//The main things
$(document).ready(function(){

  tld = window.location.hostname.split(".")[2]

  var apiURL = "https://api.batidentification." + tld + "/api/";

  $("#submit-btn").click(function(){

    var formData = {"species": ""};

    $("input:checked").each(function(index){

        formData['species'] += $(this).attr("name") + ',';

    });

    formData['range'] = $("#date_range").val();

    $.get(apiURL + "calls", formData, function(response){
      var params = Object.keys(formData).map(key => key + '=' + formData[key]).join('&');
      $("#preview_link").attr('href', apiURL + "calls?" + params);
      presentData(response);
    });

  });

  // Adds all the bat species to the filter box and the queryed box

  $.each(species, function(index, value){

    if(index % 2 == 0){
      $("#bat-species > table").append("<tr></tr>");
      $("#species-count").append("<tr></tr>");
    }

    var name = toTitleCase(value.replace(new RegExp("_", 'g'), " "));
    var trIndex = Math.floor(index/2) + 1;

    $(`#bat-species > table tr:nth-of-type(${trIndex})`).append(`
      <td><input checked type="checkbox" id="${value}" name="${value}"></td>
      <td><label for="${value}">${name}</label></td>
    `)

    $(`#species-count tr:nth-of-type(${trIndex})`).append(`
      <td><label for="${value}">${name}</label></td>
      <td id="${value}-count"></td>
    `)

  })

});
