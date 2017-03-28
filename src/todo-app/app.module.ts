import angular from 'angular';
import MainLayout from './components/main-layout/MainLayout.js';
import CustomButton from './components/custom-button/CustomButton.js';
import TodoList from './components/todo-list/TodoList.js';
import TaskEdit from './components/task-edit/TaskEdit'
import Pagination from './components/pagination/Pagination'
import UILoadingView from './components/loading-view/UILoadingView'

import {TodoService, TodoItemService, app} from './recources/todo';
import uiRouter from 'angular-ui-router';

// import { TaskState } from './routes/task'
// import { PageState } from './routes/page'
// import { TaskState } from './routes/todo'

let thisIsuiRouter = uiRouter;

let module = angular.module('todoAppModule', [
  'ngResource',
  'ui.router'
]);



export function registerServices(){
  module
    .factory('TodoService', ['$resource', TodoService])
    .factory('TodoItemService', ['$resource', TodoItemService])
}

export function registerComponents(){
  module
    .component('todoApp', MainLayout)
    .component('customButton', CustomButton)
    .component('todoList', TodoList)
    .component('taskEdit', TaskEdit)
    .component('pagination', Pagination)
    .component('uiViewLoading', {
      template: "<h1>Hello</h1>"
    })
}

export function registerRoutes(){

  module
    .run(function(
      $trace: angular.ui.Trace,
      $state: angular.ui.IStateService,
      $rootScope: angular.IRootScopeService){

      $trace.enable();

      $rootScope.$on('$stateChangeStart', function (event: ng.IAngularEvent){
        // $state.go('index.todo?page=1')
      })


    })

    .config(["$stateProvider", "$urlRouterProvider", function (
      $stateProvider: angular.ui.IStateProvider,
      $urlRouterProvider: angular.ui.IUrlRouterProvider ) {

      $urlRouterProvider.otherwise('/index/todo');

      let ITEMS_TODO_COUNT_PER_PAGE: number = 6;

      const TodoStateWrapper: angular.ui.IState = {
        name: "todoApp",
        url: "/index",
        component: "todoApp",
        redirectTo: "/todo",
        resolve: {
          collection: ["TodoService", function( todoService: app.service.ITodoService ) {
            let request = todoService.queryByUserId({ userId: '1' });
            return request.$promise;
          }],
          currentPageNumber: ["$stateParams", function($stateParams){
            return parseInt($stateParams.page);
          }],
          partCount: function(){
            return ITEMS_TODO_COUNT_PER_PAGE;
          }
        }
      };

      const PageState: angular.ui.IState = {
        name: "todoApp.page",
        url: "/todo?page",
        template: "<todo-list options='options' on-selected-list-change='$ctrl.handleSelectedListChange(list)'></todo-list>",
        // component: "todoList",
        controller: function($scope, options){
          $scope.options = options;
        },
        resolve: {
          options: ["collection", "$stateParams", function(collection, $stateParams ) {
            let currentPageNumber = $stateParams.page;
            let currentPageNumberIndex = currentPageNumber - 1;
            let begin = currentPageNumberIndex * ITEMS_TODO_COUNT_PER_PAGE;
            let collectionForPage = collection.slice(begin, begin + ITEMS_TODO_COUNT_PER_PAGE );

            return {
              collection: collectionForPage
            };
          }]
        }
      };

      const TaskState: angular.ui.IState = {
        name: "todoApp.task",
        url: "/todo/{taskId:int}",
        component: "taskEdit",
        resolve: {
          index: function($transition$){
            return $transition$.params().taskId
          }
        }
      };

      const TodoState: angular.ui.IState = {
        name: "todoApp.todo",
        url: "/todo",
        component: "todoList",
        resolve: {
          options: ["collection", function(collection){
            return { collection: collection };
          }]
        },
      };

      $stateProvider.state(TodoStateWrapper);
      $stateProvider.state(TodoState);
      $stateProvider.state(PageState);
      $stateProvider.state(TaskState);
    }])

}


