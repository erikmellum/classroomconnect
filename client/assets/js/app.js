
(function() {
  'use strict';

  var classroomConnect=angular.module('classroomConnect', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  classroomConnect.controller('NavCtrl', ['$scope', '$http', function($scope, $http){
    $scope.selected = {};
   $scope.select= function(item) {
     $scope.selected = item;
   };

   $scope.isActive = function(item) {

     return $scope.selected === item;
   };

    $scope.links=[];
    $http.get('assets/json/links.json').success(function(data){
      $scope.links=data;
    });
  }]);

  classroomConnect.controller('NewsCtrl', ['$scope', '$http', function($scope, $http){

    $scope.news=[];

    $http.get('assets/json/news.json').success(function(data){
      $scope.news=data;
    });
    $scope.currentPage = 0;
    $scope.pageSize = 5;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.news.length/$scope.pageSize);
    }

  }]);
  classroomConnect.filter('startFrom', function() {
    return function(list, firstItem) {
        firstItem = +firstItem; //parse to int
        return list.slice(firstItem);
    }
  });
  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
  function config($urlProvider, $locationProvider, $stateProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run($rootScope, $window) {
    $rootScope.subjects=['math', 'English', 'history', 'science'];
    $rootScope.test="and";
    FastClick.attach(document.body);
    var w = angular.element($window);
    w.bind('resize', function () {
      checkWindowSize();
    });
    w.bind('load', function () {
      checkWindowSize();
    });
    function checkWindowSize() {
      if ( $window.innerWidth < 400 ) {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'1px', 'font-size':'80%', 'position':'relative', 'right':'1.5rem'});
      }
      else if ( $window.innerWidth < 640 ) {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'1px', 'font-size':'80%', 'position':'relative', 'right':'1rem'});
      }
      else if ( $window.innerWidth < 900 ) {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'8px'});
      }
      else {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'15px'});
      }

    }
  }

  classroomConnect.controller('HomeworkCtrl', ['$scope', '$http', function($scope, $http){
    $scope.setSubject=function(subject){
      $scope.subjects=[];
      $scope.subjects.push(subject)
    }
    $scope.containsSubject=function(assignment){
      var intersect=$scope.subjects.filter(function(n) {
        return assignment.subjects.indexOf(n) != -1
      });
      if(intersect.length > 0) return true
      return false;
    }

    $scope.assignments=[];

    $http.get('assets/json/assignments.json').success(function(data){
      $scope.assignments=data;
    });


  }]);
  classroomConnect.controller('NotesCtrl', ['$scope', '$http', function($scope, $http){
    $scope.weeks=[];
    $scope.tabs=[1, 2];
    $scope.currentWeek=0;
    $scope.setWeek=function(week){
      $scope.currentWeek=week;
    }
    $http.get('assets/json/notes.json').success(function(data){
      $scope.weeks=data;
    });

  }]);
})();
