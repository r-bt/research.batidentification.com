//Some variables
var species = ["common_pipistrelle", "nathusius_pipistrelle", "soprano_pipistrelle", "myotis", "leislers_bat", "brown_long_eared", "lesser_Horseshoe", "unknown", "not_identified"];

var map, layer;

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function getCircleFeature(coordinate, radius) {
    var view = map.getView();
    var projection = view.getProjection();
    var resolutionAtEquator = view.getResolution();
    var pointResolution = layer.getSource().getProjection().getPointResolutionFunc_(resolutionAtEquator, coordinate);
    var resolutionFactor = resolutionAtEquator/pointResolution;
    var radius = (radius * 1000 / ol.proj.Units.METERS_PER_UNIT.m) * resolutionFactor;

    var circle = new ol.geom.Circle(coordinate, radius);
    var circleFeature = new ol.Feature(circle);

    return circleFeature
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
    
    if($("#lon").val() != "" || $("#lat").val() != "" || $("#radius").val() != ""){
      formData['lon'] = $("#lon").val();
      formData['lat'] = $("#lat").val();
      formData['radius'] = $("#radius").val();
    }


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

  $("#select-location").click(function(){
    $(".overlay").toggle();
  })

  //Setup the Map

  var vectorSource = new ol.source.Vector({
      projection: 'EPSG:4326'
  });

  layer = new ol.layer.Tile({
      source: new ol.source.OSM()
  });

  var circleLayer = new ol.layer.Vector({
      source: vectorSource
  });

  map = new ol.Map({
    layers: [layer, circleLayer],
    target: document.getElementById('location-picker'),
    view: new ol.View({
      center: ol.proj.fromLonLat([-6.2539820, 53.3405900]),
      zoom:7,
      extent: [-13037508.342789244, -9037508.342789244, 13037508.342789244, 9037508.342789244],
      minZoom: 3
    })
  })

  map.getViewport().addEventListener("dblclick", function(e) {
    var coordinate = map.getEventCoordinate(e);
    radius = $("#location-picker-radius").val();
    feature = getCircleFeature(coordinate, radius)
    vectorSource.clear();
    vectorSource.addFeature(feature);
    //Add the selected center and radius to the form
    var lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    $("#lon").val(lonlat[0]);
    $("#lat").val(lonlat[1]);
    $("#radius").val(radius);
  });

  $(".overlay").hide();

  $("#location-picker-radius").on('input', function(e){
    $("#location-picker-label").text("Radius: " + $(this).val() + "km");
  })

  $("#finish-overlay").click(function(){
    $(".overlay").hide();
  })

  $("#cancel-overlay").click(function(){
    $(".overlay").hide();
    $("#lon").removeAttr('value');
    $("#lat").removeAttr('value');
    $("#radius").removeAttr('value');
    vectorSource.clear();
  })

});
