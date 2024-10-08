(function() {

    L.Control.MagnifyingGlass = L.Control.extend({

	_magnifyingGlass: false,

	options: {
	    position: 'topleft',
	    title: 'Toggle Magnifying Glass',
	    radius: 200,
		forceSeparateButton: false
	},

	initialize: function (magnifyingGlass, options) {
	    this._magnifyingGlass = magnifyingGlass;
	    // Override default options
	    for (var i in options) if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i)) this.options[i] = options[i];
	},

	onAdd: function (map) {
	    var className = 'leaflet-control-magnifying-glass', container;

	    if (map.zoomControl && !this.options.forceSeparateButton) {
		container = map.zoomControl._container;
	    } else {
		container = L.DomUtil.create('div', 'leaflet-bar');
	    }

	    this._createButton(this.options.title, className, container, this._clicked, map, this._magnifyingGlass);
	    return container;
	},

	_createButton: function (title, className, container, method, map, magnifyingGlass) {
	    var link = L.DomUtil.create('a', className, container);
	    link.href = '#';
	    link.title = title;

	    L.DomEvent
		.addListener(link, 'click', L.DomEvent.stopPropagation)
		.addListener(link, 'click', L.DomEvent.preventDefault)
		.addListener(link, 'click', function() {method(map, magnifyingGlass);}, map);

	    return link;
	},

	_clicked: function (map, magnifyingGlass) {
	    if (!magnifyingGlass) {
		return;
	    }

	    if (map.hasLayer(magnifyingGlass)) {
		map.removeLayer(magnifyingGlass);
	    } else {
		magnifyingGlass.addTo(map);
	    }
	}
    });

    L.control.magnifyingglass = function (magnifyingGlass, options) {
	return new L.Control.MagnifyingGlass(magnifyingGlass, options);
    };

})();

function init() {
  var tileUrl = "https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  var tileOptions = {
    attribution: 'arcgis'
  };


  

  var magnifyingGlass = L.magnifyingGlass({
    radius: 200,
	zoomOffset: 3,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ]
  });

  L.control.magnifyingglass(magnifyingGlass, {
    forceSeparateButton: true
  }).addTo(map);
}

window.onload = init;