"use strict";

app.controller("ProfileCtrl", function($scope, $rootScope){
	
	// $scope.boards = [];
	// $scope.pins = [];

	

	// //Boards
	// let getBoards = function(){
	// 	BoardFactory.getBoardsFB($rootScope.user.uid).then(function(boardsFB){
	// 		console.log("boards from controller", boardsFB);
	// 		$scope.boards = boardsFB;
	// 		PinFactory.getPinsFB($rootScope.user.uid).then(function(pinsFB){
	// 		console.log("pins from controller", pinsFB);
	// 		pinsFB.forEach(function(pin){
	// 			$scope.boards.forEach(function(board){
	// 				//console.log('pins', pin);
	// 				if(pin.boardId === board.id){
	// 					board.pins.push(pin);
	// 				}
	// 			});
	// 		});


	// 	});
	// 	});
	// };
	// getBoards();	

	// $scope.deleteBoard = function(boardId){
	// 	console.log("delete board", boardId);
	// 	BoardFactory.deleteBoardFB(boardId).then(function(response){
	// 		getBoards();
	// 	});
	// };




	// $scope.deletePin = function(pinId){
	// 	console.log("delete pin", pinId);
	// 	PinFactory.deletePin(pinId).then(function(deletePinResponse){
	// 		console.log("delete pin response", deletePinResponse);
	// 		getBoards();
	// 	});
	// };
});