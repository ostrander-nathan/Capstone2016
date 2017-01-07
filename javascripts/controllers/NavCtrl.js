"use strict";

app.controller("NavCtrl", function($scope, $rootScope, UserFactory){ // NAV CONTROLLER LINE 4 holds a array of nav headers 
	
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
	];

$('.button-collapse').sideNav({
      menuWidth: 300, 
      edge: 'left',
      closeOnClick: true, 
      draggable: true
    }
  );
});