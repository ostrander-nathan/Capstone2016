"use strict";
app.controller("EditReviewCtrl", function($scope, $rootScope, $routeParams, GoogleFactory, $location, UserFactory, ReviewFactory, ProfileFactory) {
	let reviewID = $routeParams.reviewId;
	ProfileFactory.getSingleReviewFB(reviewID).then(function(response){
		$scope.list = response;
		console.log("response in editReview",response );
	});
	$scope.submit = function() {
      console.log("$scope.list", $scope.list);
      ReviewFactory.postReview($scope.list, $rootScope.user.uid);
      ReviewFactory.getReview($scope.list, $rootScope.user.uid).then(function(reviewId) {
        $location.url("/users/profile");
        $scope.newReview = {};
      });
    };
});