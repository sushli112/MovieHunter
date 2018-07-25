import {FooterView} from './FooterView'
export class FooterController{
    constructor(){
       
        this.footerView = new FooterView();
    }

    createFooterComponent(){

        this.footerView.createFooterComponent();
    }
}