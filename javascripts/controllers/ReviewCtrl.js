"use strict";
app.controller("ReviewCtrl", function($scope, $rootScope, GoogleFactory, $location, UserFactory, ReviewFactory) {
      $scope.maxRating = 5;
      $scope.ratedBy = 0;
      $scope.rateBy = function (star) {
      $scope.ratedBy = star;
      }
      
      $scope.submit = function(){
      $scope.list = {};
        if($scope.text){
          $scope.list.push(this.text);
          $scope.text = '';
      }
        if($scope.drone){
          $scope.list.push(this.drone);
          $scope.drone = '';
        }
        if ($scope.terrain){
          $scope.list.push(this.location);
          $scope.location = '';
        }
        if ($scope.terrain){
          $scope.list.push(this.date);
          $scope.date = '';
        }     
        if ($scope.terrain){
          $scope.list.push(this.star);
          $scope.star = '';
        }       
        if ($scope.terrain){
          $scope.list.push(this.terrain);
          $scope.terrain = '';
        }        
        if ($scope.terrain){
          $scope.list.push(this.terrain1);
          $scope.terrain = '';
        }        
        if ($scope.terrain){
          $scope.list.push(this.terrain2);
          $scope.terrain = '';
        }        
        if ($scope.terrain){
          $scope.list.push(this.terrain3);
          $scope.terrain = '';
        }        
        if ($scope.terrain){
          $scope.list.push(this.terrain4);
          $scope.terrain = '';
        }
      }

  // date picker pop up function
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // amount of years
 
  });
  // counts characters
  $(document).ready(function() {
    $('input#input_text, textarea#textarea1').characterCounter();
  });
});