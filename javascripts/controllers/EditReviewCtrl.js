"use strict";
app.controller("EditReviewCtrl", function($scope, $rootScope, $routeParams, GoogleFactory, $location, UserFactory, ReviewFactory, ProfileFactory) {
    $scope.newReview = {};
	let reviewID = $routeParams.reviewId;

	ProfileFactory.getSingleReviewFB(reviewID).then(function(response){
		$scope.list = response;
		console.log("response in editReview",response );
		$scope.newReview = response;
	});
	$scope.submit = function() {
      ReviewFactory.postReview($scope.list, $rootScope.user.uid);
      console.log("$scope.list", $scope.list);
      // ReviewFactory.getReview($scope.list, $rootScope.user.uid).then(function(reviewId) {
        $location.url("/users/profile");
      
    };
});