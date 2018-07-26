import FooterView from './FooterView';

export default class FooterController {
  constructor() {
    this.footerView = new FooterView();
  }

  static createFooterComponent() {
    FooterView.createFooterComponent();
  }
}
