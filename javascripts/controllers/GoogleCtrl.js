"use strict";
app.controller("GoogleCtrl", function($scope, $rootScope, GoogleFactory, $location, UserFactory) {
  $scope.map;
  var service;
  var infowindow;
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

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
      //GoogleFactory.getLocationItems($scope.map, $scope.query)
      var markerAdd = new google.maps.Marker({
        position: location,
        map: $scope.map
      });

      var contentString = `<div><a href='#/users/review/lat/${location.lat()}/lng/${location.lng()}'>Add Review</a></div>`;      
      var infoWindow = new google.maps.InfoWindow({
        map: $scope.map,
        content: contentString
      });

      markerAdd.addListener('click', function() {
        infoWindow.open($scope.map, markerAdd);
      });

      console.log("markerAdd in addMarker Function", markerAdd);
      markers.push({
        lat: markerAdd.getPosition().lat(),
        lng: markerAdd.getPosition().lng()
      });
      console.log("markers", markers);
      $scope.$apply();
    }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent('Location found.');
    //     $scope.map.setCenter(pos);
    //   }, function() {
    //     handleLocationError(true, infoWindow, $scope.map.getCenter());
    //   });
    // } else {
    //   // Browser doesn't support Geolocation
    //   handleLocationError(false, infoWindow, $scope.map.getCenter());
    // }

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
            draggable: true,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
          console.log("marker", marker);
          console.log("result of search button click", result);
          var input = document.getElementById('pac-input');
          console.log("input from search box pac-input", result)
          var markers = result;
          
          console.log("markers", markers);
    //BEGINING OF INFOWINDOW TEST
      // contentString = '<div id="content">'+
      // '<div id="siteNotice">'+
      // '</div>'+
      // '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      // '<div id="bodyContent">'+
      // '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      // 'sandstone rock formation in the southern part of the '+
      // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
      // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      // 'Aboriginal people of the area. It has many springs, waterholes, '+
      // 'rock caves and ancient paintings. Uluru is listed as a World '+
      // 'Heritage Site.</p>'+
      // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      // '(last visited June 22, 2009).</p>'+
      // '</div>'+
      // '</div>';
      // console.log("contentString",contentString );

    //END OF INFOWINDOW
        });
    }
  }
  initialize();
});
// // Sets the map on all markers in the array.
// function setMapOnAll(map) {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }

// // Removes the markers from the map, but keeps them in the array.
// function clearMarkers() {
//   setMapOnAll(null);
// }

// // Shows any markers currently in the array.
// function showMarkers() {
//   setMapOnAll(map);
// }

// // Deletes all markers in the array by removing references to them.
// function deleteMarkers() {
//   clearMarkers();
//   markers = [];
// }

//