"use strict";

app.controller("NavCtrl", function($scope, $rootScope, UserFactory) {

    $scope.navItems = [{
        name: "Logout",
        url: "#/logout"
    }, {
        name: "All Items",
        url: "#/users/profile"
    }, {
        name: "Search Item",
        url: "#/users/google"
    }];

    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
    });
});
