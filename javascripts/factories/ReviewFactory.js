"use strict";

app.factory("ReviewFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY){

	var postReview = function(reviewData, uid){
		console.log("reviewData",reviewData );
		return $q((resolve, reject)=>{
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
					response[key].id = key;                    
					locations.push(response[key]);
                });
				resolve(locations);
				console.log("locations in review factory",locations );
			}).error(function(error){
				reject(error);
			});
		});
	};
return {postReview: postReview, getReview: getReview};
});
