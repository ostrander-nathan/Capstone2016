"use strict";

app.factory("ReviewFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY) {

    var postReview = function(reviewData, uid) {
        console.log("reviewData", reviewData);
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/locations.json`, JSON.stringify({
                    userName: reviewData.userName,
                    image: reviewData.image,
                    name: reviewData.name,
                    drone: reviewData.drone,
                    date: reviewData.date,
                    review: reviewData.review,
                    uid: uid,
                    lng: reviewData.lng,
                    lat: reviewData.lat,
                    terrain: reviewData.terrain,
                    terrain1: reviewData.terrain1,
                    terrain2: reviewData.terrain2,
                    terrain3: reviewData.terrain3,
                    terrain4: reviewData.terrain4
                }))
                .success(function(postResponse) {
                    resolve(postResponse);
                })
                .error(function(postError) {
                    reject(postError);
                });
        });
    };

    var getReview = function(userId) {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
                .success(function(response) {
                    let locations = [];
                    Object.keys(response).forEach(function(key) {
                        response[key].id = key;
                        locations.push(response[key]);
                    });
                    resolve(locations);
                }).error(function(error) {
                    reject(error);
                });
        });
    };
    var editReviewFB = function(editItem) {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/locations/${editItem.id}.json`,
                    JSON.stringify({
                        userName: editItem.userName,
                        image: editItem.image,
                        name: editItem.name,
                        drone: editItem.drone,
                        date: editItem.date,
                        review: editItem.review,
                        uid: editItem.uid,
                        lng: editItem.lng,
                        lat: editItem.lat,
                        terrain: editItem.terrain,
                        terrain1: editItem.terrain1,
                        terrain2: editItem.terrain2,
                        terrain3: editItem.terrain3,
                        terrain4: editItem.terrain4
                    })
                )
                .success(function(editResponse) {
                    resolve(editResponse);
                })
                .error(function(editError) {
                    reject(editError);
                });
        });
    };
    return { postReview: postReview, getReview: getReview, editReviewFB: editReviewFB };
});
