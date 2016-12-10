"use strict";

app.factory("ReviewFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY){

	var postReview = function(reviewData, uid){
		console.log("reviewData",reviewData );
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/locations.json`, JSON.stringify({
				UserImage: reviewData.UserImage,
				name: reviewData.name,
				drone: reviewData.drone,
				date: reviewData.date,
				review: reviewData.review,
				// userRating: reviewData.userRating,
				uid: uid,
				lng: reviewData.lng,
				lat: reviewData.lat
			}))
			.success(function(postResponse){
				console.log("postResponse",postResponse );
				resolve(postResponse);
			})
			.error(function(postError){
				console.log("postError",postError );
				reject(postError);
			});
		});
	};

	var getReview = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let locations = [];
				Object.keys(response).forEach(function(key){
					locations.push(response[key]);
				});
				resolve(locations[0]);
			}).error(function(error){
				reject(error);
			});
		});
	};
return {postReview: postReview, getReview: getReview};
});
