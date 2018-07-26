import GenerateTemplateUtil from '../common/GenerateTemplateUtil';
import HeaderView from './HeaderView';
import HeaderService from './HeaderService';
import { store } from '../state/state';

export default class HeaderController {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.headerView = new HeaderView();
    this.headerService = new HeaderService();
  }

  createHeaderComponent() {
    const headerTempl = this.headerView.createHeaderComponent();
    const searchIcon = headerTempl.querySelector('#searchIcon');
    const self = this;
    searchIcon.addEventListener('click', () => {
      console.log(' search icon is clicked');
      self.displaySearchedList();
    }, false);
    document.getElementById('header').appendChild(headerTempl);
  }

  displaySearchedList() {
    const pageNUmber = 1;
    console.log('HeaderController:Inside displaySearchedList method .............');
    document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    const moviesList = HeaderService.displayAllSearchedResult();
    const self = this;
    store.subscribe(() => {
      const state = store.getState();
      console.log(`HeaderController:search list from current state found:${state.SearchedList}`);
      if (state.identifier === 'search') {
        self.headerView.createSearchedSectionmoviesList(state.SearchedList);
      }
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
