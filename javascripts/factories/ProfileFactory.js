"use strict";

app.factory("ProfileFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY){

	var getBoardsFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let boards = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					response[key].pins = [];
					boards.push(response[key]);
				});
				resolve(boards);
			}).error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	var postBoardsFB = function(newBoard){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`, JSON.stringify({
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

	var deleteBoardFB = function(boardId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
			.success(function(postResponse){
				resolve(postResponse);
			}).error(function(postError){
				reject(postError);
			});
		});
	};

	return {
		getBoardsFB: getBoardsFB, 
		postBoardsFB: postBoardsFB,
		deleteBoardFB:deleteBoardFB
	};


});
