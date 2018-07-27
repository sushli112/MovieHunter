import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import HeaderView from './HeaderView';
import HeaderService from './HeaderService';
import { store } from '../state/state';

export default class HeaderController {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.headerView = new HeaderView();
    this.headerService = new HeaderService();
    //$('#searchSection').on('click', '#searchIcon', displaySearchedList);
  }

  createHeaderComponent() {
    const headerTempl = this.headerView.createHeaderComponent();
    const searchForm = headerTempl.querySelector('#searchForm');
    const self = this;
    searchForm.addEventListener('submit', (evt) => {
      console.log(' search icon is clicked');
      evt.preventDefault();
      this.displaySearchedList();
      document.documentElement.scrollTop = 0;
    }, false);
    
    document.getElementById('header').appendChild(headerTempl);
  }



   displaySearchedList() {

    console.log('HeaderController:Inside displaySearchedList method .............');
    let pageNUmber =1;
    document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

    const moviesList = HeaderService.displayAllSearchedResult(pageNUmber);
    const self = this;
    store.subscribe(() => {
        let upperBody = document.getElementById("searchSection");
        upperBody.innerHTML ="";
        const state = store.getState();
        HeaderView.createSearchedSectionmoviesList(state.SearchedList);
      
    });

    moviesList.then((movieList) => {
      console.log(`HeaderController : displaySearchedList() :moviesList :${movieList}`);
      store.dispatch({
        type: 'SEARCH_RESULT',
        data: movieList,
      });
    });
  }
}
