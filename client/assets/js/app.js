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

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
  classroomConnect.controller('HomeworkCtrl', ['$scope', function($scope){
    $scope.assignments=[
      {title: 'Homework #1', dueDate: '05/31/15', contents: 'Prepare to learn.', location: 'homework/homework.pdf'},
      {title: 'Homework #2', dueDate: '06/31/15', contents: 'Prepare to learn more.'},
      {title: 'Homework #3', dueDate: '07/31/15', contents: 'Prepare to learn less.'},
      {title: 'Homework #4', dueDate: '08/31/15', contents: 'Prepare to learn the usual.'}
    ];
  }]);
})();
