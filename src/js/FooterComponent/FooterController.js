import FooterView from './FooterView';

export default class FooterController {
  constructor() {
    this.footerView = new FooterView();
  }

  createFooterComponent() {
    this.footerView.createFooterComponent();
  }
}
