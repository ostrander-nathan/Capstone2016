"use strict";
app.controller("ReviewCtrl", function($scope, $rootScope, $routeParams, GoogleFactory, $location, UserFactory, ReviewFactory) {
    $scope.list = {
        lat: $routeParams.lat,
        lng: $routeParams.lng
    };

    $scope.submit = function() {
        ReviewFactory.postReview($scope.list, $rootScope.user.uid);
        ReviewFactory.getReview($scope.list, $rootScope.user.uid).then(function(reviewId) {
            $location.url("/users/profile");
            $scope.newReview = {};
        });
    };

    $(document).ready(function() {
        $('input#input_text, textarea#textarea1').characterCounter();
    });
});
