"use strict";
app.controller("GoogleCtrl", function($scope, $rootScope, GoogleFactory, $location, UserFactory) {
  // $scope.map;
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
      var icon = {
        url: "/images/droneIcon.png",
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
      };
      
      var markerAdd = new google.maps.Marker({
        position: location,
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        icon: icon
      });
      markerAdd.addListener('click', toggleBounce);

      function toggleBounce() {
        if (markerAdd.getAnimation() !== null) {
          markerAdd.setAnimation(null);
        } else {
          markerAdd.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      var contentString = `<div><a href='#/users/review/lat/${location.lat()}/lng/${location.lng()}'>Add Review</a></div>`;
      var infoWindow = new google.maps.InfoWindow({
        map: $scope.map,
        content: contentString
      });

      markerAdd.addListener('click', function() {
        infoWindow.open($scope.map, markerAdd);
      });

      // console.log("markerAdd in addMarker Function", markerAdd);
      markers.push({
        lat: markerAdd.getPosition().lat(),
        lng: markerAdd.getPosition().lng()
      });
      console.log("markers", markers);
      $scope.$apply();
    }


    // Create the search box and link it to the UI element.
    $scope.search = function() {
      GoogleFactory.getLocationItems($scope.map, $scope.query)
        .then(function(result) {
          $scope.map.setCenter(result[0].geometry.location);
          var marker = new google.maps.Marker({
            position: result[0].geometry.location,
            map: $scope.map,
            draggable: true,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
          console.log("marker", marker);
          console.log("result of search button click", result);

          var input = document.getElementById('pac-input');
          console.log("input from search box pac-input", result);
          var markers = result;
          console.log("markers", markers);
        });
    };
    // var infoWindow = new google.maps.InfoWindow({map: map});

    //     // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         };

    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Location found.');
    //         map.setCenter(pos);
    //       }, function() {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //       });
    //     } else {
    //       // Browser doesn't support Geolocation
    //       handleLocationError(false, infoWindow, map.getCenter());
    //     }


    //   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //                           'Error: The Geolocation service failed.' :
    //                           'Error: Your browser doesn\'t support geolocation.');
    //   }
    // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //   infoWindow.setPosition(pos);
    //   infoWindow.setContent(browserHasGeolocation ?
    //     'Error: The Geolocation service failed.' :
    //     'Error: Your browser doesn\'t support geolocation.');
    // }
  }
  initialize();

});