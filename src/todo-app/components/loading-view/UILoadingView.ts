import { Component } from '../../models/Component';

class UILoadingViewController{

}

export default new class UILoadingViewComponent extends Component{
  constructor() {
    super({
      templateUrl: 'todo-app/components/loading-view/UILoadingView.html',
      controller: UILoadingViewController
    });
  }
}
