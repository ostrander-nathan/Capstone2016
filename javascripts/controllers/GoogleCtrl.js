"use strict"; 
app.controller("GoogleCtrl", function ($scope, $rootScope, GoogleFactory, $location, UserFactory) {
//GoogleFactory.getLocationItems();

$scope.map;
var service;
var infowindow;

function initialize() {
	var pyrmont = new google.maps.LatLng(36.174465,-86.767960);

	 $scope.map = new google.maps.Map(document.getElementById('map'), {
	     center: pyrmont,
	     zoom: 4,
	     mapTypeId: 'terrain'

	   });
	  }

initialize();

$scope.search = function(){
	GoogleFactory.getLocationItems($scope.map, $scope.query)
	.then(function(result){
		$scope.map.setCenter(result[0].geometry.location)
		new google.maps.Marker({position: result[0].geometry.location, map: $scope.map});

	})
}

// $scope.currentLocation = function(){
// 	GoogleFactory.getLocationItems($scope.map, $scope.query)
// 	.then(function(result){
		

// 	})
// }
});

