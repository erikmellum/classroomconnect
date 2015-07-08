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
  classroomConnect.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
  });
  classroomConnect.controller('NavCtrl', ['$scope', function($scope){
    $scope.selected = {};
   $scope.select= function(item) {
     $scope.selected = item; 
   };

   $scope.isActive = function(item) {

     return $scope.selected === item;
   };

    $scope.links=[{
      content: 'Assignments',
      href: 'assignments'
    },
    {
      content: 'Quizzes',
      href: 'quizzes'
    },
    {
      content: 'Calendar',
      href: 'calendar'
    },
    {
      content: 'Notes & Downloads',
      href: 'notes'
    },
    {
      content: 'Forums',
      href: 'forums'
    },
    {
      content: 'News',
      href: 'news'
    }]
  }]);

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
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

      if ( $window.innerWidth < 640 ) {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'1px'});
      }
      else if ( $window.innerWidth < 900 ) {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'8px'});
      }
      else {
          angular.element(document.querySelector('.topHeader')).css({'letter-spacing':'15px'});
      }

    }
  }

  classroomConnect.controller('HomeworkCtrl', ['$scope', function($scope){
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

    $scope.assignments=[
      {
        title: 'First Day of School', 
        dueDate: '05/31/15', 
        contents: 'the quick brown fox jumps over the lazy dog. this is a sentence that uses every letter of the alphabet.', 
        location: 'homework/homework.pdf',
        subjects: [
            'history',
            'English'
          ]
      },
      {
        title: 'Assignment #2', 
        dueDate: '06/31/15', 
        contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        location: 'homework/homework.pdf',
        subjects: [
            'English'
          ]
      },
      {title: 'Assignment #3', 
      dueDate: '07/31/15', 
      contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
      subjects: [
            'science'
          ]
    },
      {title: 'Assignment #4', 
      dueDate: '08/31/15', 
      contents: 'Prepare to learn the usual.',
      subjects: [
            'English'
            
          ]
    }
    ];
  }]);
})();
