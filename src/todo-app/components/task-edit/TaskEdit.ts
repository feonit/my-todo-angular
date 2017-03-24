import { Component } from '../../models/Component';
import { ComponentController } from '../../models/ComponentController';

class Controller extends ComponentController{
  constructor(){
    super();
  }
}

export interface ITaskEdit{

}

export default new class TaskEdit extends Component{
  constructor(){
    super({
      templateUrl: 'todo-app/components/task-edit/TaskEdit.html',
      controller: Controller,
      bindings: {
        index: '<'
      }
    })
  }
}
