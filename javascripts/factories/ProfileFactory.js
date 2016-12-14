"use strict";

app.factory("ProfileFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY){

	var getReviewFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/locations.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let reviewsArray = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					response[key].pins = [];
					reviewsArray.push(response[key]);
				});
				resolve(reviewsArray);
			}).error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	var postReviewFB = function(newBoard){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/locations.json`, JSON.stringify({
				title: newBoard.title,
				uid: newBoard.uid
				})
			).success(function(postResponse){
				resolve(postResponse);
			}).error(function(postError){
				reject(postError);
			});
		});
	};

	var deleteReviewFB = function(reviewId){
		console.log("reviewId",reviewId );
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/locations/${reviewId}.json`)
			.success(function(deleteReviewResponse){
				console.log("deleteReviewResponse in profile factory",deleteReviewResponse);
				resolve(deleteReviewResponse);
			}).error(function(postError){
				reject(postError);
			});
		});
	};

	var editReviewFB = function(editItem){
    return $q((resolve, reject) =>{
      $http.put(`${FIREBASE_CONFIG.databaseURL}/locations/${editItem}.json`,
         JSON.stringify({
			name: editItem.name,
			review: editItem.review

         })
       )
        .success(function(editResponse){
          resolve(editResponse);
        })
        .error(function(editError){
          reject(editError);
        });
    });
  };

	return {
		getReviewFB: getReviewFB, 
		postReviewFB: postReviewFB,
		deleteReviewFB:deleteReviewFB,
		editReviewFB: editReviewFB
	};


});
