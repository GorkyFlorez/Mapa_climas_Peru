!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([,function(e,t,n){},function(e,t){!function(){"use strict";L.Marker.Measurement=L[L.Layer?"Layer":"Class"].extend({options:{pane:"markerPane"},initialize:function(e,t,n,s,a){L.setOptions(this,a),this._latlng=e,this._measurement=t,this._title=n,this._rotation=s},addTo:function(e){return e.addLayer(this),this},onAdd:function(e){this._map=e;var t=this.getPane?this.getPane():e.getPanes().markerPane,n=this._element=L.DomUtil.create("div","leaflet-zoom-animated leaflet-measure-path-measurement",t),s=L.DomUtil.create("div","",n);s.title=this._title,s.innerHTML=this._measurement,e.on("zoomanim",this._animateZoom,this),this._setPosition()},onRemove:function(e){e.off("zoomanim",this._animateZoom,this),(this.getPane?this.getPane():e.getPanes().markerPane).removeChild(this._element),this._map=null},_setPosition:function(){L.DomUtil.setPosition(this._element,this._map.latLngToLayerPoint(this._latlng)),this._element.style.transform+=" rotate("+this._rotation+"rad)"},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();L.DomUtil.setPosition(this._element,t),this._element.style.transform+=" rotate("+this._rotation+"rad)"}}),L.marker.measurement=function(e,t,n,s,a){return new L.Marker.Measurement(e,t,n,s,a)};var e=function(e){var t;return this._measurementOptions.imperial?e>404.685642?(e/=4046.85642,t="ac"):(e/=.09290304,t="ft²"):e>1e5?(e/=1e5,t="km²"):t="m²",e<100?e.toFixed(1)+" "+t:Math.round(e)+" "+t},t=function(e,t,n){return n?function(){t.apply(this,arguments),e.apply(this,arguments)}:function(){e.apply(this,arguments),t.apply(this,arguments)}};L.Polyline.include({showMeasurements:function(e){return!this._map||this._measurementLayer?this:(this._measurementOptions=L.extend({showOnHover:!1,minPixelDistance:30,showDistances:!0,showArea:!0,lang:{totalLength:"Total length",totalArea:"Total area",segmentLength:"Segment length"}},e||{}),this._measurementLayer=L.layerGroup().addTo(this._map),this.updateMeasurements(),this._map.on("zoomend",this.updateMeasurements,this),this)},hideMeasurements:function(){return this._map.off("zoomend",this.updateMeasurements,this),this._measurementLayer?(this._map.removeLayer(this._measurementLayer),this._measurementLayer=null,this):this},onAdd:t(L.Polyline.prototype.onAdd,function(){this.options.showMeasurements&&this.showMeasurements(this.options.measurementOptions)}),onRemove:t(L.Polyline.prototype.onRemove,function(){this.hideMeasurements()},!0),setLatLngs:t(L.Polyline.prototype.setLatLngs,function(){this.updateMeasurements()}),spliceLatLngs:t(L.Polyline.prototype.spliceLatLngs,function(){this.updateMeasurements()}),formatDistance:function(e){var t,n;return this._measurementOptions.imperial?(n=e/.3048)>3e3?(e/=1609.344,t="mi"):(e=n,t="ft"):e>1e3?(e/=1e3,t="km"):t="m",e<100?e.toFixed(1)+" "+t:Math.round(e)+" "+t},formatArea:e,updateMeasurements:function(){if(this._measurementLayer){var e,t,n,s,a,i,r=this.getLatLngs(),o=this instanceof L.Polygon,m=this._measurementOptions,h=0;if(r&&r.length&&L.Util.isArray(r[0])&&(r=r[0]),this._measurementLayer.clearLayers(),this._measurementOptions.showDistances&&r.length>1){e=this._measurementOptions.formatDistance||L.bind(this.formatDistance,this);for(var u=1,l=r.length;o&&u<=l||u<l;u++)t=r[u-1],n=r[u%l],h+=i=t.distanceTo(n),s=this._map.latLngToLayerPoint(t),a=this._map.latLngToLayerPoint(n),s.distanceTo(a)>=m.minPixelDistance&&L.marker.measurement(this._map.layerPointToLatLng([(s.x+a.x)/2,(s.y+a.y)/2]),e(i),m.lang.segmentLength,this._getRotation(t,n),m).addTo(this._measurementLayer);o||L.marker.measurement(n,e(h),m.lang.totalLength,0,m).addTo(this._measurementLayer)}if(o&&m.showArea&&r.length>2){e=m.formatArea||L.bind(this.formatArea,this);var p=function(e){var t,n,s,a,i,r=function(e){return e*Math.PI/180},o=0,m=e.length;if(m>2){for(var h=0;h<m;h++)h===m-2?(s=m-2,a=m-1,i=0):h===m-1?(s=m-1,a=0,i=1):(s=h,a=h+1,i=h+2),t=e[s],n=e[a],o+=(r(e[i].lng)-r(t.lng))*Math.sin(r(n.lat));o=6378137*o*6378137/2}return Math.abs(o)}(r);L.marker.measurement(this.getBounds().getCenter(),e(p),m.lang.totalArea,0,m).addTo(this._measurementLayer)}}},_getRotation:function(e,t){var n=this._map.project(e),s=this._map.project(t);return Math.atan((s.y-n.y)/(s.x-n.x))}}),L.Polyline.addInitHook(function(){this.options.showMeasurements&&this.showMeasurements()}),L.Circle.include({showMeasurements:function(e){return!this._map||this._measurementLayer?this:(this._measurementOptions=L.extend({showOnHover:!1,showArea:!0,lang:{totalArea:"Total area"}},e||{}),this._measurementLayer=L.layerGroup().addTo(this._map),this.updateMeasurements(),this._map.on("zoomend",this.updateMeasurements,this),this)},hideMeasurements:function(){return this._map.on("zoomend",this.updateMeasurements,this),this._measurementLayer?(this._map.removeLayer(this._measurementLayer),this._measurementLayer=null,this):this},onAdd:t(L.Circle.prototype.onAdd,function(){this.options.showMeasurements&&this.showMeasurements(this.options.measurementOptions)}),onRemove:t(L.Circle.prototype.onRemove,function(){this.hideMeasurements()},!0),setLatLng:t(L.Circle.prototype.setLatLng,function(){this.updateMeasurements()}),setRadius:t(L.Circle.prototype.setRadius,function(){this.updateMeasurements()}),formatArea:e,updateMeasurements:function(){if(this._measurementLayer){var e,t,n=this.getLatLng(),s=this._measurementOptions,a=s.formatArea||L.bind(this.formatArea,this);if(this._measurementLayer.clearLayers(),s.showArea){a=s.formatArea||L.bind(this.formatArea,this);var i=(e=this.getRadius(),t=e/6378137,2*Math.PI*6378137*6378137*(1-Math.cos(t)));L.marker.measurement(n,a(i),s.lang.totalArea,0,s).addTo(this._measurementLayer)}}}}),L.Circle.addInitHook(function(){this.options.showMeasurements&&this.showMeasurements()})}()},function(e,t,n){n(2),e.exports=n(1)}]);
//# sourceMappingURL=lfx-measure-path-prod.js.map