//initializing variables.
var peristeri = ol.proj.fromLonLat([23.6903,38.007525]);
var piraeus = ol.proj.fromLonLat([23.652674,37.94171]);
var zagreb = ol.proj.fromLonLat([15.978928,45.800084]);
var athens = ol.proj.fromLonLat([23.7275,37.9838]);
var pentagon = ol.proj.fromLonLat([23.782665,37.999707]);
var interamerican = ol.proj.fromLonLat([23.696065,37.942180]);
var buttonPeristeri = $('<button>Start the Journey!</button>');
var buttonPiraeus = $('<button>Studied in University of Piraeus from 2009 to 2012 and 2013 to 2015. Wonder where I was from 2012 to 2013?</button>');
var buttonZagreb = $('<button>Participated in the Erasmus program for both studies and internship. Next station?</button>');
var buttonAthens = $('<button>Back home! The last 6 months of my studies I was working in Velti, while finishing my thesis. Now for the final stop...</button>'); 
var buttonPentagon = $('<button>Worked as a programmer for the Hellenic Army at the Center of Information Support.</button>');
var buttonInteramerican = $('<strong><i>Currently working as a software engineer in Interamerican.  Here our journey ends and we reach the present!</i></strong>');

var view = new ol.View({
  // the view's initial state
  center: peristeri,
  zoom: 10
});

var peristeriFeature = new ol.Feature({
  geometry: new ol.geom.Point(peristeri),
  name: 'Peristeri'
});

var piraeusFeature = new ol.Feature({
  geometry: new ol.geom.Point(piraeus),
  name: 'Piraeus'
});

var zagrebFeature = new ol.Feature({
  geometry: new ol.geom.Point(zagreb),
  name: 'Zagreb'
});

var athensFeature = new ol.Feature({
  geometry: new ol.geom.Point(athens),
  name: 'Athens'
});

var pentagonFeature = new ol.Feature({
  geometry: new ol.geom.Point(pentagon),
  name: 'Pentagon'
});

var interamericanFeature = new ol.Feature({
  geometry: new ol.geom.Point(interamerican),
  name: 'Interamerican'
});

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '../icon.png'
  }))
});

peristeriFeature.setStyle(iconStyle);
piraeusFeature.setStyle(iconStyle);
zagrebFeature.setStyle(iconStyle);
athensFeature.setStyle(iconStyle);
pentagonFeature.setStyle(iconStyle);
interamericanFeature.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
  features: [peristeriFeature]
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

var map = new ol.Map({
  layers: [
  new ol.layer.Tile({
    preload: 4,
    source: new ol.source.OSM()
  }), vectorLayer
  ],
  // Improve user experience by loading tiles while animating. Will make
  // animations stutter on mobile or slow devices.
  loadTilesWhileAnimating: true,
  target: document.getElementById('map'),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: view
});

var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -50]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature) {
      return feature;
    });
    if (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates);
      //check feature name and display according info.
      if(feature.get('name') === 'Peristeri'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonPeristeri
        });
      } else if(feature.get('name') === 'Piraeus'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonPiraeus
        });
      } else if(feature.get('name') === 'Zagreb'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonZagreb
        });
      } else if(feature.get('name') === 'Athens'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonAthens
        });
      } else if(feature.get('name') === 'Pentagon'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonPentagon
        });
      } else if(feature.get('name') === 'Interamerican'){
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': buttonInteramerican
        });
      } 
      $(element).popover('show');
    } else {
      $(element).popover('destroy');
  }
});

//Functions for switching from a place to another.
function go(location, remove, add){
  var pan = ol.animation.pan({
    duration: 1000,
    source: /** @type {ol.Coordinate} */ (view.getCenter())
  });
  map.beforeRender(pan);
  view.setCenter(location);

  vectorSource.removeFeature(remove);
  vectorSource.addFeature(add);
};

function fly(location, remove, add){
  var duration = 6000;
  var start = +new Date();
  var pan = ol.animation.pan({
    duration: duration,
    source: /** @type {ol.Coordinate} */ (view.getCenter()),
    start: start,
  });
  var bounce = ol.animation.bounce({
    duration: duration,
    resolution: 4 * view.getResolution(),
    start: start,
  });
  map.beforeRender(pan, bounce);
  view.setCenter(location);

  vectorSource.removeFeature(remove);
  vectorSource.addFeature(add);
}

buttonPeristeri.click(function() {
  go(piraeus, peristeriFeature, piraeusFeature);
});

buttonPiraeus.click(function(){
  fly(zagreb, piraeusFeature, zagrebFeature);
});

buttonZagreb.click(function(){
  fly(athens, zagrebFeature, athensFeature);
});

buttonAthens.click(function() {
  go(pentagon, athensFeature, pentagonFeature);
});

buttonPentagon.click(function() {
  go(interamerican, pentagonFeature, interamericanFeature);
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
      return;
    }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});