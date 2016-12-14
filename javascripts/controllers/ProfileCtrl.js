"use strict";

app.controller("ProfileCtrl", function($scope, $rootScope, GoogleFactory, UserFactory, $location, AuthFactory, ProfileFactory, ReviewFactory ){

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
		ProfileFactory.editReviewFB(reviewId).then(function(response){
			// $scope.newReview = {};
			$location.url('/users/review/lat/:lat/lng/:lng');
			getReviews();
		});
	};
	$(document).ready(function(){
    	$('.materialboxed').materialbox();
  });
});

