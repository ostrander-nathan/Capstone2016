"use strict";
app.controller("ReviewCtrl", function($scope, $rootScope, $routeParams, GoogleFactory, $location, UserFactory, ReviewFactory) {
    $scope.list = {
      lat: $routeParams.lat,
      lng: $routeParams.lng
    };
    // console.log("$scope.list", $scope.list);

    $scope.submit = function() {
      // console.log("$scope.list", $scope.list);
      ReviewFactory.postReview($scope.list, $rootScope.user.uid);
      ReviewFactory.getReview($scope.list, $rootScope.user.uid).then(function(reviewId) {
        $location.url("/users/profile");
        $scope.newReview = {};
      });
    };

  // counts characters
  $(document).ready(function() {
    $('input#input_text, textarea#textarea1').characterCounter();
  });
});