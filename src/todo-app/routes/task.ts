export const TaskState: angular.ui.IState = {
  name: "todoApp.task",
  component: "taskEdit",
  resolve: {
    index: function($transition$){
      return $transition$.params().taskId
    }
  }
};
