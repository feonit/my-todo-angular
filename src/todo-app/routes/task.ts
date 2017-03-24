export const TaskState = {
  name: "task",
  url: "/todo/{taskId}",
  component: "taskEdit",
  resolve: {
    index: function($transition$){
      return $transition$.params().taskId
    }
  }
}
