function adapter(absUrl: string): string {
  let filePath = '/todo-app/data' + absUrl + '.json';
  return filePath;
}

declare namespace app.service {
  interface ITodoService extends angular.resource.IResourceClass<any>{
    queryByUserId: angular.resource.IResourceArray<any>
  }
  interface ITodoItemService extends angular.resource.IResourceClass<any>{
    deleteByTodoId: angular.resource.IResourceArray<any>
  }
}

export function TodoService($resource: angular.resource.IResourceService): app.service.ITodoService{
  let url: string,
      paramDefaults: any,
      queryAction: angular.resource.IActionDescriptor,
      actions: any;

  url = adapter('/todo');

  queryAction = {
    method: 'GET',
    isArray: true,
    headers: {
      "Content-Type": "application/json"
    }
  };

  paramDefaults = { userId: '@id' };
  actions = { "queryByUserId": queryAction };
  return $resource(url, paramDefaults, actions);
}

export function TodoItemService($resource: angular.resource.IResourceService): app.service.ITodoItemService{
  let url: string,
      paramDefaults: any,
      deleteAction: angular.resource.IActionDescriptor,
      actions: any;

  url = adapter('/todo/:todoId');

  deleteAction = {
    method: 'DELETE',
    params: {todoId: 'todoId'},
    isArray: true,
    headers: {
      "Content-Type": "application/json"
    }
  };

  paramDefaults = { todoId: '@id' };
  actions = { "deleteByTodoId": deleteAction };
  return $resource(url, paramDefaults, actions)
}
