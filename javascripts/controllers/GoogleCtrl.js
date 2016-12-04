"use strict";

app.controller("GoogleCtrl", function($scope, $rootScope, GoogleFactory, $location, UserFactory){
	

var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -34.397, lng: 150.644},
		  zoom: 8
		  .then(function(userCreds){
			$location.url("/#/users/google");
		})
	});
}

});