"use strict";

app.factory("ProfileFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY) {

    var getReviewFB = function(userId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
                .success(function(response) {
                    let reviewsArray = [];
                    Object.keys(response).forEach(function(key) {
                        response[key].id = key;
                        response[key].pins = [];
                        reviewsArray.push(response[key]);
                    });
                    resolve(reviewsArray);
                }).error(function(errorResponse) {
                    reject(errorResponse);
                });
        });
    };

    var postReviewFB = function(newBoard) {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/locations.json`, JSON.stringify({
                title: newBoard.title,
                uid: newBoard.uid
            })).success(function(postResponse) {
                resolve(postResponse);
            }).error(function(postError) {
                reject(postError);
            });
        });
    };

    var deleteReviewFB = function(reviewId) {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/locations/${reviewId}.json`)
                .success(function(deleteReviewResponse) {
                    resolve(deleteReviewResponse);
                }).error(function(postError) {
                    reject(postError);
                });
        });
    };

    var getSingleReviewFB = function(reviewId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/locations/${reviewId}.json`)
                .success(function(getSingleReview) {
                    resolve(getSingleReview);
                })
                .error(function(getSingleError) {
                    reject(getSingleError);
                });
        });
    };

    return {
        getSingleReviewFB: getSingleReviewFB,
        getReviewFB: getReviewFB,
        postReviewFB: postReviewFB,
        deleteReviewFB: deleteReviewFB
    };
});
