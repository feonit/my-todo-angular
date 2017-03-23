/*import IScope = angular.IScope;*/
import { Component } from '../../models/Component';

export interface ICustomButton {
  title: string;
  class: string;
  disabled: boolean;
}

const _defaults = function(target: any, src: any) {
  Object.keys(src).forEach(function(key: string) {
    target[key] = typeof target[key] === 'undefined' ? src[key] : target[key];
  });
  return target;
};

class CustomButtonComponentController {
  options:  ICustomButton;
  class:  string;
  title:  string;
  disabled: boolean;

  constructor(){

  }

  $onInit(){

  }

  $onChanges(props){
    this.title = props.options.currentValue.title;
    this.class = props.options.currentValue.class;
    this.disabled = props.options.currentValue.disabled;
  }
}

export default new class CustomButtonComponent extends Component{
  constructor() {
    super({
      templateUrl: 'todo-app/components/custom-button/CustomButton.html',
      controller: CustomButtonComponentController,
      bindings: {
        options: '<',
        // class: '<',
        // title: '<'
      }
    });
  }
}
