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
      content: 'Notes etc.',
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

  classroomConnect.controller('NewsCtrl', ['$scope', function($scope){

    $scope.news=[{
      title: 'Welcome to a New School Year',
      content: 'Hello and welcome to the beginning of a new school year!',  
      date: 'August 17, 2015'
    }
    /**,
    
    {
      title: 'Quizzes',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: 'date'
    },
    {
      title: 'Calendar',
      content: 'calendar',
      date: 'date'

    },
    {
      title: 'Notes & Downloads',
      content: 'notes',
      date: 'date'

    },
    {
      title: 'Forums',
      content: 'forums',
      date: 'date'

    },
    {
      title: 'News',
      content: 'news', 
      date: 'date'
    }
    ,
    {
      title: 'Test',
      content: 'news',
      date: 'date'
    }
    ,
    {
      title: 'Asdf',
      content: 'news',
      date: 'date'
    }
    ,
    {
      title: 'Hello',
      content: 'news',
      date: 'date'
 
    }
    ,
    {
      title: 'ABC',
      content: 'news', 
      date: 'date'

    },
    {
      title: 'Hello',
      content: 'news', 
      date: 'date'

    }
    ,
    {
      title: 'Hello',
      content: 'news', 
      date: 'date'

    }**/];

    
     
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
        location: '/homework/homework.pdf',
        subjects: [
            'history',
            'English'
          ]
      },
      {
        title: 'Letter to Your Future Self', 
        dueDate: '06/31/15', 
        contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        location: 'homework/homework.pdf',
        subjects: [
            'English'
          ]
      },
      {
        title: 'Solving for X', 
        dueDate: '07/31/15', 
        contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
        subjects: [
              'science'
          ]
      }, 
      {
        title: 'Solving for X', 
        dueDate: '07/31/15', 
        contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
        subjects: [
              'science'
          ]
    }
    ];
  }]);
})();
