import { Component } from '../../models/Component';
import { ComponentController } from '../../models/ComponentController';
import { ICustomButton } from '../custom-button/CustomButton';
import { workspace } from '../../workspace.module'
import { TodoCollection } from '../../models/TodoCollection'
import { ITodoListOptions } from "../todo-list/TodoList";

import { addDelay } from '../../utils/helpers'


interface IoptionsTextArea {
  text: string,
  placeholder: string,
  disabled: boolean
}

class MainLayoutController extends ComponentController{
  optionsLoadButton: ICustomButton;
  optionsAddButton: ICustomButton;
  optionsDeleteButton: ICustomButton;
  optionsTextArea: IoptionsTextArea;
  optionsTodoList: ITodoListOptions;

  todoCollection: TodoCollection;
  selectedList: number[];

  static $inject = ['$scope']

  constructor($scope){
    super();
    this.$scope = $scope;
    this.optionsLoadButton = null;
    this.optionsAddButton = null;
    this.optionsDeleteButton = null;
    this.optionsTextArea = null;
    this.optionsTodoList = null;
    this.optionsPaginator = null;

    this.todoCollection = null;
    this.selectedList = [];

    this.onLoadTasks = this.onLoadTasks.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  $onInit(){
    this._subscribeToTextAreaChange();
    // this._loadTasks(); // auto-loader

    // isInitialDataState
    this.setState({
      optionsLoadButton: {
        title: "Загрузить",
        class: 'btn-success',
        disabled: false
      },
      optionsTextArea: {
        text: "",
        placeholder: "",
        disabled: true
      },
      optionsAddButton: {
        title: 'Добавить',
        disabled: true
      },
    });
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

  _loadTasks(){

    // isStartLoadDataState
    this.setState({
      optionsLoadButton: {
        title: "Загрузка...",
        class: 'btn-info',
        disabled: true
      },
    });

    let resource = workspace.todoService.query({userId:'1'}, addDelay(this, this.onLoadTasks, 1000));
  }

  onLoadTasks(tasks){
    this.todoCollection = TodoCollection.createTodoCollection(tasks);

    // isFinishLoadDataState
    this.setState({
      optionsLoadButton: {
        title: "Загружено",
        class: 'btn-info',
        disabled: true
      },
      optionsTodoList: {
        collection: this.todoCollection.models,
        selectedList: this.selectedList
      },
      optionsTextArea: {
        text: "",
        placeholder: "Введите новую задачку",
        disabled: false
      },
      optionsDeleteButton: {
        title: "Удалить",
        disabled: true
      }
    });
    this.forceRender()
  }
  onAddClick(){
    let text = this.optionsTextArea.text;
    text = text.trim();
    if ( text ){
      this.todoCollection.addNewTodo({ description: text });

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

  onDeleteClick(){
    if ( this.selectedList.length ){

      let self = this;

      let successHandler = function(){
        self.errorsView("шеф одно удалилось")
      }
      let errorHandler = function(error) {
        // self.errorsView(error.data)
        self.errorsView("шеф одно ошибко")
      }

      let fullSuccessHandler = function(){
        self.errorsView("шеф все удалилось")
      }

      let someErrorsHandler = function(){
        self.errorsView("шеф все пропало")
      }

      let resources = this.selectedList.map(function(id){
        return workspace.todoItemService.delete({todoId: id}, successHandler, errorHandler);
      })

      let promises = resources.map(function (src) {
        return src.$promise;
      });

      workspace.$q.all(promises)
        .then(fullSuccessHandler, someErrorsHandler);
    }
  }

  onLoadClick(){
    this._loadTasks()
  }

  getSelectedCount(){
    return this.selectedList.length
  }

  getTotalCount(){
    if (this.todoCollection){
      return this.todoCollection.models.length
    } else {
      return 0;
    }
  }

  badgeCanShowed(){
    return this.getSelectedCount() > 0
  }

  handleSelectedListChange(list){
    this.selectedList = list;

     this.setState({
       optionsDeleteButton: {
         title: "Удалить",
         disabled: !list.length,
         class: list.length ? 'btn-success' : 'btn-default'
       }
     })

  }

  errorsView(textError){
    alert(textError)
  }

  forceRender(){
    this.$scope.$apply(function callback(){
      // if (cb){
      //   cb()
      // }
    })
  }
}

export default new class AppComponent extends Component{

  constructor(){
    super({
      templateUrl: 'todo-app/components/main-layout/MainLayout.html',
      controller: MainLayoutController
    })
  }
}
