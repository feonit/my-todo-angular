import angular from 'angular';
import MainLayout from './components/main-layout/MainLayout.js';
import CustomButton from './components/custom-button/CustomButton.js';
import TodoList from './components/todo-list/TodoList.js';
import TaskEdit from './components/task-edit/TaskEdit';
import Pagination from './components/pagination/Pagination';

import { routerConfig } from './router';

import {TodoService, TodoItemService, app} from './recources/todo';
import uiRouter from 'angular-ui-router';
import { ITEMS_TODO_COUNT_PER_PAGE, HTTP_BASE_PATH } from './config';


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

    .config(routerConfig)

}


