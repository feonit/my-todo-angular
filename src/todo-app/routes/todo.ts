export const TodoState: angular.ui.IState = {
  name: "todoApp.todo",
  component: "todoList",
  resolve: {
    options: ["collection", function(collection){
      return { collection: collection };
    }]
  },
};
