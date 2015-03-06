 
// Google Map V3, Add Marker, Retreive Lng Lat, custom Infobox plugin
// @name ActiveMap plugin
// @Author Achour Omar
// @licence GPL
 
 (function ($) {
	$.fn.extend({
		ActiveMap: function (options) {
			var params = {
				width: '600px', // Map width
				height: '450px', // Map Height
				latInput: "map_lat", // latitude input name
				lngInput: "map_lng", // longitude input name
				zoomInput: "map_zoom", // Zoom input name
				initPpos: [0 , 0 ], // [lat, lng] numeric number like 59.0215422
				initZoom: 5, // Map zoom
				navigationControl: true,
				scaleControl: true,
				pointerTitle: "Drag or click new position"
			};
			var inc = 1;
			var options = $.extend(params, options);
			return this.each(function () {
				var o = options;
				var set = $(this);
				var canvas = 'map_canvas_' + (inc++);
				set.append('<input name="' + o.latInput + '" type="hidden" value="' + o.initPos[0] + '"><input name="' + o.lngInput + '" value="' + o.initPos[1] + '" type="hidden"><input name="' + o.zoomInput + '" type="hidden" value="' + o.initZoom + '"><div class="canvas" id="' + canvas + '" style="width:' + o.width + ';height:' + o.height + ';"></div>');
				var lat = set.find('input[name="' + o.latInput + '"]');
				var lng = set.find('input[name="' + o.lngInput + '"]');
				var zoom = set.find('input[name="' + o.zoomInput + '"]');
				var latlng = new google.maps.LatLng(o.initPos[0], o.initPos[1]);
				var mapOptions = {
					zoom: o.initZoom,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.HYBRID,
					navigationControl: o.navigationControl,
					scaleControl: o.scaleControl
				};
				var map 	= new google.maps.Map(document.getElementById(canvas), mapOptions);
				var marker 	= new google.maps.Marker({
					position: latlng,
					map: map,
					title: o.pointerTitle,
					draggable: true
				});
				
				var boxText 			= document.createElement("div");
				boxText.style.cssText 	= "border: 1px solid black; margin-top: 8px; background: #000; padding: 5px; color: #fff";
				boxText.innerHTML 		= "Salut ! <br /> C'est moi qu'à configuré ca ; il pèse, non ??";

				 var myInfoOptions = {
						 content: boxText,
						 disableAutoPan: false,
						 maxWidth: 0,
						 pixelOffset: new google.maps.Size(-140, 0),
						 zIndex: null,
						 boxStyle: {
							  background: "url('tipbox.gif') no-repeat",
							  opacity: 1,
							  width: "320px",
						 },
						 closeBoxMargin: "10px 2px 2px 2px",
						 closeBoxURL: "close.gif",
						 infoBoxClearance: new google.maps.Size(1, 1),
						 isHidden: false,
						 pane: "floatPane",
						 enableEventPropagation: false
				};
				
				google.maps.event.addListener(map, 'zoom_changed', function () {
					zoomLevel = map.getZoom();
					if (zoomLevel == 0) {
						map.setZoom(10);
						zoomLevel = 10
					}
					zoom.val(zoomLevel)
				});
				
				// Show infoBox
				google.maps.event.addListener(marker, 'click', function() {
					ib.open(map, this);
				});
				
				google.maps.event.addListener(map, 'click', function (a) {
					var b = a.latLng;
					marker.setPosition(b);
					lat.val(b.lat());
					lng.val(b.lng())
				});
				google.maps.event.addListener(marker, 'dragend', function () {
					var a = marker.getPosition();
					lat.val(a.lat());
					lng.val(a.lng())
				});
				
				var ib = new InfoBox(myInfoOptions);
			})
		}
	})
})(jQuery);