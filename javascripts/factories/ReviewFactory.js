"use strict";

app.factory("ReviewFactory", function($q, $http, FIREBASE_CONFIG){

	var postReview = function(authData){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/locations.json`, JSON.stringify({
				uid: authData.uid,
				username: authData.username
			}))
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
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
