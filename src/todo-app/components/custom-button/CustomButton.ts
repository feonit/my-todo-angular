import { Component } from '../../models/Component';

export interface ICustomButton {
  title: string;
  class: string;
  disabled: boolean;
}

class CustomButtonController {
  class:  string;
  title:  string;
  disabled: boolean;

  $onChanges(props){
    if (props.title){
      this.title = props.title.currentValue;
    }
    if (props.class){
      this.class = props.class.currentValue;
    }
    if ( props.disabled){
      this.disabled = props.disabled.currentValue;
    }
  }
}

class CustomButton extends Component{
  constructor() {
    super({
      templateUrl: 'todo-app/components/custom-button/CustomButton.html',
      controller: CustomButtonController,
      bindings: {
        class: '<',
        disabled: '<',
        title: '<'
      }
    });
  }
}

export default new CustomButton
