import PopularListService from './PopularListService';
import PopularListView from './PopularListView';

import { store } from '../state/state';

export default class PopularListController {
  constructor() {
    this.popularService = new PopularListService();
    this.popularView = new PopularListView();
  }

  displayPopularMovies() {
    const pageNUmber = 1;
    console.log('Inside getPopularMovies method .............');
    document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    const moviesList = this.popularService.getPopularMovies(pageNUmber);
    store.subscribe(() => {
      const state = store.getState();
      console.log(`state found:${state}`);
      if (state.identifier === 'popular') {
        this.popularView.createPopularSectionmoviesList(state.PopularList);
      }
    });
    moviesList.then((movieList) => {
      console.log(`PopularListController : displayPopularMovies() :moviesList :${movieList}`);
      store.dispatch(
        {
          type: 'POPULAR_LIST',
          data: movieList,
        },
      );
    });
  }
}
