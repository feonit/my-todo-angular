function adapter(absUrl){
  let filePath = '/todo-app/data' + absUrl + '.json';
  return filePath;
}

export function TodoService($resource){
  let url = adapter('/todo');
  return $resource(url, {userId: '@id'}, {
    query: {
      method: 'GET',
      isArray: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
  })
}


export function TodoItemService($resource){
  let url = adapter('/todo/:todoId');
  return $resource(url, {todoId: '@id'}, {
    "delete": {
      method: 'DELETE',
      params: {todoId: 'todoId'},
      isArray: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
  })
}
