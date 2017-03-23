import { ICollections, Collection } from './Collection'
import { TodoModel, ITodoModel } from './TodoModel'

export interface ITodoCollection extends ICollections{
  models: TodoModel[]
}

export class TodoArray extends Array{

}

export class TodoCollection extends Collection{
  constructor(options: ITodoCollection){
    super(options)
  }

  addNewTodo(todo){
    let model;
    let options;
    if ( todo instanceof TodoModel){
      model = todo;
    } else {
      options = todo;
      options.isCompleted = false;
      model = new TodoModel(options)
    }
    this.models.push(model);
    return model;
  }

  static createTodoCollection(arr: ITodoModel[]){
    if ( arr ){

    }
    if ( !Array.isArray(arr) ){ throw Error('arg must be array') }
    let todos = new TodoArray();
    todos = todos.concat(arr);

    let list: TodoModel[] = todos.map(function(obj: ITodoModel){
      return obj instanceof TodoModel ? obj : new TodoModel(obj)
    });
    let options: ITodoCollection = { models: list };
    return new TodoCollection(options)
  }
}
