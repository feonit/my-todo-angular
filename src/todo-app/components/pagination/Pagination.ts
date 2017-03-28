import { Component } from '../../models/Component';
import { ComponentController } from '../../models/ComponentController';

class PaginationController extends ComponentController{
  constructor(){
    super();
  }

  $onChanges(values){
    // todo заменить ng-repeat
    let totalCount = values.totalCount && values.totalCount.currentValue;
    let partCount = values.partCount && values.partCount.currentValue;
    let currentPageNumber = values.currentPageNumber && values.currentPageNumber.currentValue;

    if (totalCount){
      this.totalCount = totalCount;
    }

    if (partCount){
      this.partCount = partCount;
    }

    if (currentPageNumber){
      this.currentPageNumber = currentPageNumber;
    }

    this._updateView();
  }

  _updateView(){
    if (this.totalCount && this.partCount){

      let pages = Math.round(this.totalCount / this.partCount)

      let list = [];
      for (let i = 0, len = pages; i < len; i++){
        list[i] = i + 1;
      }
      this.list = list;
    }
  }
}

export interface IPagination{

}

export default new class Pagination extends Component{
  constructor(){
    super({
      templateUrl: 'todo-app/components/pagination/Pagination.html',
      controller: PaginationController,
      bindings: {
        totalCount: '<',
        partCount: '<',
        currentPageNumber: '<'
      }
    })
  }
}
