"use strict";

app.controller("NavCtrl", function($scope, $rootScope){ // NAV CONTROLLER LINE 4 holds a array of nav headers 
	
	$scope.navItems = [{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"All Items",
		url: "#/users/profile"
	},
	{
		name:"Search Item",
		url:"#/users/google"
	}
	// {
	// 	name:"Add Boards",
	// 	url:"#/search/add"
	// }
	];



$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
});