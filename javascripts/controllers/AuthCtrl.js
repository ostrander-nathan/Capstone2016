"use strict"; 

app.controller("AuthCtrl", function($scope, $location, $rootScope, AuthFactory, UserFactory){
	$rootScope.user = false;
	$scope.signInContainer = true;
	$scope.registerContainer = false;
		$scope.signIn = {
		email: "f@f.com",
		password:"123456"
	};

	if($location.path() === "/logout"){
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/auth");
	}

	var signMeIn = function(signInInfo){
		AuthFactory.authenticate(signInInfo)
		.then(function(didSignIn){
			return UserFactory.getUser(didSignIn.uid);
		})
		.then(function(userCreds){
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url("/users/google");
		});
	};

	$scope.setSignInContainer = function(){
		$scope.signInContainer = true;
		$scope.registerContainer = false;
	};
	$scope.setRegisterContainer = function(){
		$scope.signInContainer = false;
		$scope.registerContainer = true;
	};
	$scope.registerNewUser = function(registerUser){
		AuthFactory.registerWithEmail(registerUser)
		.then(function(didRegister){
			registerUser.uid = didRegister.uid;
			return UserFactory.postUser(registerUser);
		}).then(function(completeRegistration){
			signMeIn(registerUser);
		});
	};
	$scope.signInUser = function(signIn){
		signMeIn(signIn);
	};
	
// function onSignIn(googleUser) {
//         // Useful data for your client-side scripts:
//         var profile = googleUser.getBasicProfile();
//         console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//         console.log('Full Name: ' + profile.getName());
//         console.log('Given Name: ' + profile.getGivenName());
//         console.log('Family Name: ' + profile.getFamilyName());
//         console.log("Image URL: " + profile.getImageUrl());
//         console.log("Email: " + profile.getEmail());

//         // The ID token you need to pass to your backend:
//         var id_token = googleUser.getAuthResponse().id_token;
//         console.log("ID Token: " + id_token);
//       }

});
