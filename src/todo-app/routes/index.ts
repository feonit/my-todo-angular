import { ITEMS_TODO_COUNT_PER_PAGE, HTTP_BASE_PATH } from '../config';

export const IndexState: angular.ui.IState = {
  name: "todoApp",
  component: "todoApp",
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
