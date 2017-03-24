import angular from 'angular';
import MainLayout from './components/main-layout/MainLayout.js';
import CustomButton from './components/custom-button/CustomButton.js';
import TodoList from './components/todo-list/TodoList.js';
import TaskEdit from './components/task-edit/TaskEdit'
import Pagination from './components/pagination/Pagination'

import { TodoService, TodoItemService } from './recources/todo';
import uiRouter from 'angular-ui-router';

import { TaskState } from './routes/task'

let thisIsuiRouter = uiRouter;

let module = angular.module('todoAppModule', [
  'ngResource',
  'ui.router'
]);

module
  .factory('TodoService', ['$resource', TodoService])
  .factory('TodoItemService', ['$resource', TodoItemService])

   .config(function($stateProvider) {



     $stateProvider.state(TaskState);
   })

export function registerComponents(){
  module
    .component('todoApp', MainLayout)
    .component('customButton', CustomButton)
    .component('todoList', TodoList)
    .component('taskEdit', TaskEdit)
    .component('pagination', Pagination)
}



