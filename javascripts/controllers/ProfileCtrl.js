"use strict";

app.controller("ProfileCtrl", function($scope, $rootScope, GoogleFactory, UserFactory, $location, AuthFactory, ProfileFactory, BoardFactory ){

	$scope.reviews = [];

	//reviews
	let getReviews = function(){
		BoardFactory.getreviewsFB($rootScope.user.uid).then(function(reviewsFB){
			console.log("reviews from controller", reviewsFB);
			$scope.reviews = reviewsFB;
			PinFactory.getPinsFB($rootScope.user.uid).then(function(reviewsFB){
			console.log("pins from controller", pinsFB);
			reviewsFB.forEach(function(review){
				$scope.reviews.forEach(function(reviewBoard){
					//console.log('pins', pin);
					if(review.reviewBoardId === reviewBoard.id){
						reviewBoard.pins.push(review);
					}
				});
			});


		});
		});
	};
	getReviews();	

	$scope.deleteReview = function(boardId){
		console.log("delete board", boardId);
		ProfileFactory.deleteBoardFB(boardId).then(function(response){
			getReviews();
		});
	};
});

