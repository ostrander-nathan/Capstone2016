"use strict";

app.controller("ProfileCtrl", function($q, $http, FIREBASE_CONFIG, $scope, $rootScope, GoogleFactory, UserFactory, $location, AuthFactory, ProfileFactory, ReviewFactory ){

	$scope.reviews = [];

	let getReviews = function(){
		ReviewFactory.getReview($rootScope.user.uid).then(function(reviewsFB){
			console.log("reviews from controller", reviewsFB);
			$scope.reviews = reviewsFB;
		});
	};
	getReviews();	

	$scope.deleteReview = function(deleteId){
		// $scope.reviews = deleteId;
		ProfileFactory.deleteReviewFB(deleteId).then(function(response){
		console.log("delete review", deleteId);
			getReviews();
		});
	};	

	$scope.editReview = function(reviewId){
		console.log("edit review", reviewId);
			$location.url(`/users/edit/review/${reviewId}`);
	};

	$scope.newReview = function(editResponse) {
		console.log("editResponse",editResponse );

	};
	$scope.showMap = function(mapCoord){
		ProfileFactory.getMapFB(mapCoord).then(function(response){
		console.log("map coord", mapCoord);
			
		});
	};

});

