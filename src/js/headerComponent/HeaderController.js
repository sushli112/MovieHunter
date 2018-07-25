import  { GenerateTemplateUtil } from '../common/GenerateTemplateUtil';
import {HeaderView} from './HeaderView';
import {HeaderService} from './HeaderService'
import {store} from '../state/state'
export class HeaderController{

    constructor(){
        this.generateTemplateUtil = new GenerateTemplateUtil();
        this.headerView = new HeaderView();
        this.headerService = new HeaderService();

    }
    createHeaderComponent(){
        let headerTempl = this.headerView.createHeaderComponent();
        let searchIcon = headerTempl.querySelector("#searchIcon");
        let self =this;
        searchIcon.addEventListener("click",function(e){
                console.log(" search icon is clicked");
                self.displaySearchedList();
        
        },false);
        document.getElementById("header").appendChild(headerTempl);
    }

    displaySearchedList()
    {
    let pageNUmber =1;
        console.log("HeaderController:Inside displaySearchedList method .............")
        document.cookie = "pageNUmber="+pageNUmber+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        let moviesList =   this.headerService.displayAllSearchedResult();
        let self =this;
        store.subscribe(()=>{
           
            var state = store.getState();
            console.log("HeaderController:search list from current state found:"+ state.SearchedList);
            if(state.identifier ==="search"){
                self.headerView.createSearchedSectionmoviesList(state.SearchedList); 
            }
        
    });
        moviesList.then(function(moviesList) {
            console.log("HeaderController : displaySearchedList() :moviesList :"+moviesList)
             store.dispatch({
                type:'SEARCH_RESULT',
                data: moviesList
             })
          });
        }

   
}