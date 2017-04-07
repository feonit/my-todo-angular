/**
 * Отвечает за загрузку данных с сервера и последующие сохранение на сервер при изменениях
 * */

import { Component } from '../../models/Component';
import { ComponentController } from '../../models/ComponentController';
import { ICustomButton } from '../custom-button/CustomButton';
import { workspace } from '../../workspace.module'

import { delayFn } from '../../utils/helpers'



class MainLayoutController extends ComponentController{
  optionsLoadButton: ICustomButton;



  currentPageNumber: number;

  static $inject = ['$scope']

  constructor($scope){
    super();
    this.ITEMS_TODO_COUNT_PER_PAGE = null;
    this.$scope = $scope;
    this.optionsLoadButton = null;

    this.currentPageNumber = null;

  }

  $onInit(){
    // this._loadTasks(); // auto-loader

    // isInitialDataState
    this.setState({
      optionsLoadButton: {
        title: "Загрузить",
        class: 'btn-success',
        disabled: false
      }
    });
  }

  $onChanges(values){
    if ( values.collection && values.collection.currentValue ){
      let tasks = values.collection.currentValue;
      this.todoCollection = TodoCollection.createTodoCollection(tasks);
    }
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

    function load(res, cb, statusCode, statusText){
      if ( statusCode == 200 ){
        this.onLoadTasks(res)
      }
    }

    let resource = workspace.todoService.query({userId:'1'}, delayFn(load, this, 3000));
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


    });
    this.forceRender()
  }



  onDeleteClick(){
    if ( this.selectedIds.length ){

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

      let resources = this.selectedIds.map(function(id){
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
      controller: MainLayoutController,
      bindings: {
        collection: '<',
        currentPageNumber: '<',
        partCount: '<'
      }
    })
  }
}
