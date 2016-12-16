"use strict";
app.controller("EditReviewCtrl", function($scope, $rootScope, $routeParams, GoogleFactory, $location, UserFactory, ReviewFactory, ProfileFactory) {
      $scope.newReview = {};
      let reviewID = $routeParams.reviewId;

      ProfileFactory.getSingleReviewFB(reviewID).then(function(response) {
        response.date = new Date(response.Date);
        $scope.list = response;
        console.log("$scope.list in editReviewCtrl", $scope.list);
      });

      $scope.submit = function() {
        $scope.list.id = reviewID;
        ReviewFactory.editReviewFB($scope.list).then(function(reviewId) {
          $location.url("/users/profile");
        });
      };
});