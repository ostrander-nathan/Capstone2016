"use strict";

app.controller("ProfileCtrl", function($q, $http, FIREBASE_CONFIG, $scope, $rootScope, GoogleFactory, UserFactory, $location, AuthFactory, ProfileFactory, ReviewFactory) {

    $scope.reviews = [];

    let getReviews = function() {
        ReviewFactory.getReview($rootScope.user.uid).then(function(reviewsFB) {
            $scope.reviews = reviewsFB;
        });
    };
    getReviews();

    $scope.deleteReview = function(deleteId) {
        ProfileFactory.deleteReviewFB(deleteId).then(function(response) {
            getReviews();
        });
    };

    $scope.editReview = function(reviewId) {
        $location.url(`/users/edit/review/${reviewId}`);
    };

    $scope.newReview = function(editResponse) {

    };
    $scope.showMap = function(mapCoord) {
        ProfileFactory.getMapFB(mapCoord).then(function(response) {

        });
    };

});
