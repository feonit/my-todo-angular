import { Component } from '../../models/Component';
import { ComponentController } from '../../models/ComponentController';
import { ICustomButton } from '../custom-button/CustomButton';
import { ITodoListOptions } from "../todo-list/TodoList";
import { IPagination } from "../pagination/Pagination";
import { TodoCollection } from '../../models/TodoCollection'

interface ITextAreaOptions {
  text: string,
  placeholder: string,
  disabled: boolean
}

class TodoLayoutController extends ComponentController{
  optionsTextArea: ITextAreaOptions;
  optionsTodoList: ITodoListOptions;
  optionsAddButton: ICustomButton;
  optionsDeleteButton: ICustomButton;
  optionsPaginator: IPagination;
  selectedIds: number[];
  collection: any;
  todoCollection: TodoCollection;

  static $inject = ['$scope', '$rootScope', '$state']

  constructor($scope, $rootScope, $state){
    super();
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.optionsAddButton = null;
    this.optionsDeleteButton = null;
    this.optionsTextArea = null;
    this.optionsTodoList = null;
    this.optionsPaginator = null;
    this.selectedIds = [];
    this.collection = [];
    this.todoCollection = null;

  }
  //todo чем отличается конструктор от init?
  $onInit(){
    this._subscribeToTextAreaChange();
    this._subscribeToProps();
    this.todoCollection = TodoCollection.createTodoCollection(this.collection);

    this.setState({
      optionsTextArea: {
        text: "",
        placeholder: "Введите новую задачку",
        disabled: false
      },
      optionsAddButton: {
        title: 'Добавить',
        disabled: true
      },
      optionsTodoList: {
        collection: this.todoCollection.models,
        selectedIds: this.selectedIds
      },
    });
  }
  //todo попробовать сделать обертку в родителе компонент прокидывающую параметры автоматом
  $onChanges(values){
    // todo заменить ng-repeat
    let collection = values.collection && values.collection.currentValue;

    if (collection){
      this.todoCollection = TodoCollection.createTodoCollection(collection);

    }
  }

  onAddClick(){
    let text = this.optionsTextArea.text;
    text = text.trim();
    if ( text ){
      this.todoCollection.addNewTodo({ description: text });

      // todo immutable не хватает прям
      this.todoCollection = angular.copy(this.todoCollection)

      this.setState({
        optionsTodoList: {
          collection: this.todoCollection.models
        },
        optionsTextArea: {
          text: "",
          placeholder: "Введите еще новую задачку"
        }
      })
    } else {
      this.setState({
        optionsTextArea: {
          placeholder: "Пожалуйста, введите новую задачу"
        }
      })
    }
  }

  // getCurrentPageNumber(){
  //   return this.currentPageNumber;
  // }

  getTotalCount(){
    if (this.todoCollection){
      return this.todoCollection.models.length
    } else {
      return 0;
    }
  }
  forceRender(){
    this.$scope.$apply(function callback(){
      // if (cb){
      //   cb()
      // }
    })
  }
  onDeleteClick(){
    if ( this.selectedIds.length ){

    }
  }
  _subscribeToTextAreaChange (){
    let self = this;
    this.$scope.$watch('$ctrl.optionsTextArea.text', function(newValue, oldValue) {

      // isReadyForAddNewTaskDataState
      self.setState({
        optionsAddButton: {
          class: newValue.trim() ? 'btn-success' : 'btn-default',
          disabled: !newValue.trim()
        },
      })
    });
  }

  _subscribeToProps (){
    let self = this;
    this.$scope.$watch('$ctrl.todoCollection', function(newValue, oldValue) {

      // isReadyForAddNewTaskDataState
      // todo прямую связь с прибывшими данными
      self.setState({
        optionsTodoList: {
          collection: newValue.models
        }
      });
      self.$rootScope.optionsTodoList = self.optionsTodoList;
      self.$state.reload('todoState')
    });
  }

  getSelectedCount(){
    return this.selectedIds.length
  }
  badgeCanShowed(){
    return this.getSelectedCount() > 0
  }

  handleSelectedListChange(ids){
    this.selectedIds = ids;

    this.setState({
      optionsDeleteButton: {
        title: "Удалить",
        disabled: !ids.length,
        class: ids.length ? 'btn-success' : 'btn-default'
      }
    })

  }
}

export interface ITodoLayout{

}

export default new class TodoLayout extends Component{
  constructor(){
    super({
      templateUrl: 'todo-app/components/todo-layout/TodoLayout.html',
      controller: TodoLayoutController,
      bindings: {
        collection: '<'
      }
    })
  }
}
