var m = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

var queryedData, heatMapLayer;

function isElementInViewport(elem){
  var $elem = $(elem);

  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();

  return ((elemTop < viewportBottom) && (elemBottom > viewportTop))
}

function checkAnimation() {
  var $elem = $(".floating-content");

  $.each($elem, function(key, value){

    if($(value).hasClass('start')) return;

    if(isElementInViewport($(value))){
      var id = $(value).attr('id');
      $(value).addClass(id + "-animation");
      $(value).addClass("floating-content-animated");
    }

  })
}

$(window).scroll(function(){
  checkAnimation();
});

function setupMap(data){

  queryedData = data;

  layer = new ol.layer.Tile({
      source: new ol.source.OSM()
  });

  var dateControl = (function (Control){
    function dateControl(opt_options){
      var options = opt_options || [];

      var input = document.createElement('input');
      input.setAttribute('type', 'range');
      input.setAttribute('min', '0');
      input.setAttribute('max', '12');
      input.setAttribute('value', '0');
      input.setAttribute('class', 'slider');
      input.setAttribute('id', 'date-selector');

      var label = document.createElement('a');
      label.setAttribute('id', 'month-label');

      label.innerHTML = "Janurary";

      $(input).on('input', function(e){
        $(label).text(m[$(this).val()]);
        tmpData = getHeatMapData();
        heatMapLayer.setSource(tmpData);
      })

      var element = document.createElement('div');
      element.className = 'date-control ol-unselectable ol-control';
      element.appendChild(input);
      element.appendChild(label);

      ol.control.Control.call(this, {
        element: element,
        target: options.target
      });


    }

    if (ol.control.Control) dateControl.__proto__ = ol.control.Control;
    dateControl.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
    dateControl.prototype.constructor = dateControl;

    return dateControl
  }(ol.control.Control));

  var scrollControl = (function (Control){
    function scrollControl(opt_options){
      var options = opt_options || [];

      var button = document.createElement('button');
      button.setAttribute('class', 'downIcon')

      $(button).click(function(){
          $('html, body').animate({
            scrollTop: $(".content").offset().top
          }, 50, function(){});
      })

      var element = document.createElement('div');
      element.className = 'scroll-control ol-unselectable ol-control';
      element.appendChild(button);
      ol.control.Control.call(this, {
        element: element,
        target: options.target
      });
    }
    if (ol.control.Control) scrollControl.__proto__ = ol.control.Control;
    scrollControl.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
    scrollControl.prototype.constructor = scrollControl;

    return scrollControl

  }(ol.control.Control));

  map = new ol.Map({
    controls: ol.control.defaults().extend([
      new dateControl(),
      new scrollControl()
    ]),
    layers: [layer],
    target: document.getElementById('heatmap'),
    view: new ol.View({
      center: ol.proj.fromLonLat([-6.2539820, 53.3405900]),
      zoom:7,
      extent: [-13037508.342789244, -9037508.342789244, 13037508.342789244, 9037508.342789244],
      minZoom: 3
    })
  })

  heatData = getHeatMapData();

  heatMapLayer = new ol.layer.Heatmap({
     source: heatData,
     radius: 10
  });
  // add to the map
  map.addLayer(heatMapLayer);

}

function getHeatMapData(){

  var tmpData = new ol.source.Vector();
  queryedData.forEachFeature(function(f){
    month = f.values_.date_recorded.split("-")[1]
    if(month == $("#date-selector").val() - 1){
      tmpData.addFeature(f);
    }
  });

  return tmpData;

}

function getData(url, params, callback){

  var data = new ol.source.Vector();

  $.post(url, params, function(response){

    for(var i = 0; i < response['calls'].length; i++){

      var batCall = response['calls'][i]

      var loc = [parseFloat(batCall['lng']), parseFloat(batCall['lat'])]

      var coord = ol.proj.transform(loc, 'EPSG:4326', 'EPSG:3857');

      var lonLat = new ol.geom.Point(coord);

      var pointFeature = new ol.Feature({
          geometry: lonLat,
          weight: 10, // e.g. temperature
          date_recorded: batCall['date_recorded']
      });

      data.addFeature(pointFeature);

    }

    callback(data);

  });

}


$(document).ready(function(){

  var apiURL = "https://api.batidentification.loc/api/";

  getData(apiURL + "calls", {}, setupMap);


});
