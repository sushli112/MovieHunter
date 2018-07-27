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
    const moviesList = PopularListService.getPopularMovies(pageNUmber);
    store.subscribe(() => {
      let state = store.getState();
        let upperBody = document.getElementById("upperBody");
        upperBody.innerHTML ="";
        console.log("popularList from state: "+state.PopularList);
        PopularListView.createPopularSectionmoviesList(state.PopularList);
      
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
