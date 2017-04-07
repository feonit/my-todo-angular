import { IndexState } from './routes/index'
import { PageState } from './routes/page'
import { TaskState } from './routes/task'
import { TodoState } from './routes/todo'

function Router($stateProvider){
  this.route = function route(path, state){
    // суфикс позволяет писать абсолютные урлы
    state.url = "^" + path;
    $stateProvider.state(state);
    return this;
  }
}

export const routerConfig = ["$stateProvider", "$urlRouterProvider", "$locationProvider", function (
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  $locationProvider: angular.ui.ILocationProvider ) {

  $locationProvider.html5Mode(true).hashPrefix('!')
  $urlRouterProvider.otherwise('/todo');

  let router = new Router($stateProvider);

  router
    .route("/", {
      name: "todoState",
      component: "todoList",
      resolve: {
        options: ["$rootScope", "$stateParams", function($rootScope, $stateParams){
          return $rootScope.optionsTodoList;
        }]
      },
    })
    // .route("/", IndexState)
    // .route("/todo", TodoState)
    // .route("/todo?page", PageState)
    // .route("/todo/{taskId:int}", TaskState)
}]
