"use strict";
app.controller("GoogleCtrl", function($scope, $rootScope, GoogleFactory, $location, UserFactory) {
  $scope.map;
  var service;
  var infowindow;
  // var map;
  var markers = [];
// INITIALIZING MAP
  function initialize() {
    var pyrmont = new google.maps.LatLng(36.174465, -86.767960);
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 8,
      mapTypeId: 'terrain',
      scrollwheel: false
    });
            // This event listener will call addMarker() when the map is clicked.
      $scope.map.addListener('click', function(event) {
          addMarker(event.latLng);
        });

        // Adds a marker at the center of the map.
        addMarker();
      }

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: $scope.map
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }





    var infoWindow = new google.maps.InfoWindow({map: $scope.map});
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            $scope.map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, $scope.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, $scope.map.getCenter());
        }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

    // Create the search box and link it to the UI element.
    $scope.search = function() {
      GoogleFactory.getLocationItems($scope.map, $scope.query)
        .then(function(result) {
          $scope.map.setCenter(result[0].geometry.location)
          var marker = new google.maps.Marker({
            position: result[0].geometry.location,
            map: $scope.map,
            draggable:true,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
          console.log("marker",marker);
          console.log("result of search button click", result);
          var input = document.getElementById('pac-input');
          console.log("input from search box pac-input", result)
          var markers = result;
          console.log("markers", markers);
           $scope.map.markers.push(marker);
           console.log($scope.map.markers);
           $scope.$apply();
        })
    }
    $scope.addMarker = function() {
   

    
  }
  initialize();
});
// };