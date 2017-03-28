import { ITEMS_TODO_COUNT_PER_PAGE } from '../config';

export const PageState: angular.ui.IState = {
  name: "todoApp.page",
  template: "<todo-list options='options' on-selected-list-change='$ctrl.handleSelectedListChange(list)'></todo-list>",
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
