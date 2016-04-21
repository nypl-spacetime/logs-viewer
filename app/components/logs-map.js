// import React from 'react'
// import { findDOMNode } from 'react-dom'
//
// import './logs-map.scss'
//
// const LogsMap = React.createClass({
//
//   render: function() {
//     return (
//       <div className='map' ref='map' />
//     )
//   },
//
//   componentDidMount: function() {
//     var node = findDOMNode(this.refs.map)
//
//     var map = L.map(node, {
//       center: [40.7127837, -74.0059413],
//       zoom: 12,
//       zoomControl: false
//     })
//
//     var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
//     }).addTo(map)
//
//     // L.Icon.Default.imagePath = './'
//
//
//     var geojson = {
//       type: 'FeatureCollection',
//       features: this.props.logs.map((feature) => {
//         feature.geometry = feature.geometry.geometries[1]
//         return feature
//       })
//     }
//
//     var markers = L.markerClusterGroup({
//       maxClusterRadius: 120,
//       iconCreateFunction: function (cluster) {
//         var markers = cluster.getAllChildMarkers();
//         var n = markers.length
//
//         var lineLengths = markers.map((marker) => {
//           return marker.feature.properties.line_length
//         })
//
//         // var average = lineLengths.reduce(function(sum, a) { return sum + a }, 0) / (lineLengths.length || 1)
//         var max = Math.max.apply(null, lineLengths)
//
//         var className: 'marker-clusterA marker-cluster-large'
//         if (max > 15) {
//           className += ' marker-cluster-inspect'
//         } else {
//           className += ' marker-cluster-ok'
//         }
//
//         return L.divIcon({
//           html: `${n}<br />(${Math.round(max)} m.)`,
//           className: className,
//           iconSize: L.point(40, 40)
//         })
//       },
//       disableClusteringAtZoom: 18,
//       animate: false,
//
//       spiderfyOnMaxZoom: false,
//       showCoverageOnHover: false,
//       zoomToBoundsOnClick: false
//     })
//
//     // var markers = L.markerClusterGroup({
//     //   iconCreateFunction: function(cluster) {
//     //     return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' })
//     //   }
//     // })
//
//     var geoJsonLayer = L.geoJson(geojson, {
//       onEachFeature: function (feature, layer) {
//         // layer.bindPopup(feature.properties.address)
//       },
//       pointToLayer: function(feature, latlon) {
//        var color = '#ffd510'
//        var circleMarker = L.circleMarker(latlon, {
//          radius: 8,
//          fillColor: color,
//          color: color,
//          weight: 1,
//          opacity: 1,
//          opacity: 0.8,
//          fillOpacity: 0.8
//        });
//
//        return circleMarker
//       //  return L.layerGroup([circleMarker])
//
//
//      }
//     })
//
//     markers.addLayer(geoJsonLayer)
//     map.addLayer(markers)
//
//     // map.fitBounds(markers.getBounds())
//
//
//
//
//
//
//
//     //
//     // var markers = L.markerClusterGroup()
//     // // markers.addLayer({
//     // //   type: 'FeatureCollection',
//     // //   features: this.props.logs
//     // // })
//     // map.addLayer(markers)
//
//   }
//
// })
//
// export default LogsMap
