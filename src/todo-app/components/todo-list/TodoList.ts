import { Component } from '../../models/Component';
import { TodoCollection } from '../../models/TodoCollection'
import { SelectedItems } from '../../models/SelectedItems'
import IScope = angular.IScope;
import { ComponentController } from '../../models/ComponentController';

export interface ITodoListOptions {
  collection: any;
}

export class TodoListComponentController extends ComponentController{
  list: any;
  collection: TodoCollection;
  $scope: IScope;
  options:  ITodoListOptions;

  static $inject = ["TodoService", "$scope", "$attrs"]

  constructor(TodoService, $scope, $attrs){
    super();
    this.collection = TodoCollection.createTodoCollection([]);
    this.list = new SelectedItems([]);
    this.$scope = $scope;

    // this._setTasks = this._setTasks.bind(this);
  }

  $onInit(){

  }

  $onChanges(values){
    if ( values.options.currentValue && values.options.currentValue.collection ){
      let collectionData = values.options.currentValue.collection;
      this.collection = TodoCollection.createTodoCollection(collectionData);
      this.list = new SelectedItems(values.options.currentValue.selectedIds);
    }
  }

  forseRender(){
    this.$scope.$apply(function callback(){

    })
  }


  onCheckboxClick(id){
    this.list.switchPresence(id)
    if (this.onSelectedListChange){
      this.onSelectedListChange({ list: this.list.getValues() })
    }
  }

  checkboxIsChecked(id){
    return this.list.hasValue(id)
  }
}

export default new class TodoListComponent extends Component{
  constructor(){
    super ({
      templateUrl: 'todo-app/components/todo-list/TodoList.html',
      controller: TodoListComponentController,
      bindings: {
        options: '<',
        onSelectedListChange: '&'
      }
    })
  }
}
