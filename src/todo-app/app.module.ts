import angular from 'angular';
import MainLayout from './components/main-layout/MainLayout.js';
import CustomButton from './components/custom-button/CustomButton.js';
import TodoList from './components/todo-list/TodoList.js';
import { TodoService, TodoItemService } from './recources/todo'
import uiRouter from 'angular-ui-router';

let thisIsuiRouter = uiRouter;

let module = angular.module('todoAppModule', [
  'ngResource',
  'ui.router'
]);

module
  .factory('TodoService', ['$resource', TodoService])
  .factory('TodoItemService', ['$resource', TodoItemService])

export function registerComponents(){
  module
    .component('todoApp', MainLayout)
    .component('customButton', CustomButton)
    .component('todoList', TodoList)
}



