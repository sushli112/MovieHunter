import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import GenerateStaticContent from '../Common/GenerateStaticContent';
import CollectionService from './CollectionService';
import { store } from '../state/state';

export default class CollectionView {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.generateStaticContent = new GenerateStaticContent();
    this.collectionListService = new CollectionService();
  }


  createCollectionListTemplate() {
    const collctionTemp = `<div class="collection row">
        <div class="col-xs-12 col-md-6 col-lg-4">
            <div class="row">
                <div class="col-xs-6">
                    <h3 class="ml-5">Action</h3>
                </div>
                <div class="col-xs-6 ml-5 mt-2">
                    <button type="submit" id="actionLink" class="viewAllLink">View All</button>
                </div>
            </div>
            <ul id="ActionList">

            </ul>

        </div>
        <div class="Adventure col-xs-12 col-md-6 col-lg-4">
            <div class="row">
                <div class="col-xs-6">
                    <h3 class="ml-5">Adventure</h3>
                </div>
                <div class="col-xs-6 ml-5 mt-2">
                <button type="submit" id="adventureLink" class="viewAllLink">View All</button>
                </div>
            </div>
            <ul id="AdventureList">

            </ul>

        </div>
        <div class="Comic col-xs-12 col-md-6 col-lg-4">
            <div class="row">
                <div class="col-xs-6">
                    <h3 class="ml-5">Comic</h3>
                </div>
                <div class="col-xs-6 ml-5 mt-2">
                <button type="submit" id="comicLink" class="viewAllLink">View All</button>
                </div>
            </div>
            <ul id="ComicList">

            </ul>

        </div>
    </div>`;

    const collListTemplate = this.generateTemplateUtil.createAllChildHTMLElement(collctionTemp);
    return collListTemplate;
  }

  createCollListElement(movie, movieListHtml) {
    movieListHtml = `${movieListHtml}
        <li >
        <div class="d-flex flex-row collectionCard">
            <img class="collImage" src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
            <div class="ml-2">
                <h5 class="card-title">${movie.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>
            </div>
        </div>
    </li>`;
    return movieListHtml;
  }


  createCardElement(movie, type) {
    const tempId = movie.title.replace(/\s/g, '');
    console.log(`card id is :${tempId}`);
    const cardTemplate = `<div class="col-xs-12 col-lg-6 mb-3">
                        <div class="card mainCard">
                        <div class= "row">
                            <img class="card-img-left col-6" src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="Card image cap">
                            <div class="card-body col-6">
                                <h5 class="card-title">${movie.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>
                                <p class="card-text">${movie.overview.substr(0, 110)}...
                                </p>
                                <p id="viewMore" class="view-more">
                                    <button type="submit"  class=" btn btn-secondary" id="${movie.id}">Remove</button>

                                </p>
                            </div>
                        </div>
                        </div>
                    </div>`;
    const cardElement = this.generateTemplateUtil.createAllChildHTMLElement(cardTemplate);
    console.log(`card element:${cardElement}`);
    const removeButton = cardElement.getElementById(`${movie.id}`);
    const self = this;
    let currentListType = null;
    removeButton.onclick = function () {
      if (type === 'Comic') {
        currentListType = 'comic';
        store.dispatch({
          type: 'REMOVE_FROM_COMIC',
          data: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview.substr(0, 110),
            release_date: movie.release_date,
            id: movie.id,
          },
        });
      } else if (type === 'Adventure') {
        currentListType = 'adventure';
        store.dispatch({
          type: 'REMOVE_FROM_ADEVENTURE',
          data: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview.substr(0, 110),
            release_date: movie.release_date,
            id: movie.id,
          },
        });
      } else if (type === 'Action') {
        currentListType = 'action';
        store.dispatch({
          type: 'REMOVE_FROM_ACTION',
          data: {
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview.substr(0, 110),
            release_date: movie.release_date,
            id: movie.id,
          },
        });
      }
      console.log(`currentListType is:${currentListType}`);

      self.collectionListService.deleteMovieFromList(movie.id, currentListType);
    };
    return cardElement;
  }

  createCollectionSectionmoviesList(moviesList, type) {
    const oldListTemplate = document.getElementById('collectionSection');
    oldListTemplate.innerHTML = ''; // removing old template

    const collectionHeader = `<h4 id="collectionMovies" class="pt-2">${type} Movies</h4>`;
    const collTemplate = `<div class="CollectionMoviesContainer row" id="collMovieSec">

        </div>`;


    const collTempate = this.generateTemplateUtil.createAllChildHTMLElement(collTemplate);
    const colMovieSec = collTempate.querySelector('#collMovieSec');
    moviesList.forEach((movie) => {
      colMovieSec.appendChild(this.createCardElement(movie, type));
    });
    colMovieSec.appendChild(this.generateStaticContent.createModelTemplate());
    const section = document.getElementById('collectionSection');
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(collectionHeader));
    section.appendChild(colMovieSec);
  }
}
