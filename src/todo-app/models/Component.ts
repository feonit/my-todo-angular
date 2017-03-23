export interface IComponent {
  controller: any;
  templateUrl: string;
  bindings?: any;
}

export class Component{
  controller: any;
  templateUrl: string;
  bindings?: any;

  constructor(props: IComponent){
    this.controller = props.controller;
    this.templateUrl = props.templateUrl;
    this.bindings = props.bindings;
  }
}
