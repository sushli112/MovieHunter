import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import GenerateStaticContent from '../Common/GenerateStaticContent';
import CollectionService from './CollectionService';
import { store } from '../state/state';

export default class CollectionView {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.generateStaticContent = new GenerateStaticContent();
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

    const collListTemplate = GenerateTemplateUtil.createAllChildHTMLElement(collctionTemp);
    return collListTemplate;
  }

  static createCollListElement(movie, movieListHtml) {
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
    const cardElement = GenerateTemplateUtil.createAllChildHTMLElement(cardTemplate);
    console.log(`card element:${cardElement}`);
    const removeButton = cardElement.getElementById(`${movie.id}`);
    const self = this;
    let currentListType = null;
    removeButton.onclick = function () {

  

      if (type === 'Comic') {
        currentListType = 'comic';
        CollectionService.deleteMovieFromList(movie.id, currentListType);
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
        CollectionService.deleteMovieFromList(movie.id, currentListType);
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
        CollectionService.deleteMovieFromList(movie.id, currentListType);
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
    };
    return cardElement;
  }

  createCollectionSectionmoviesList(state) {
    let oldActionTemplate = document.getElementById('ActionSection');
    oldActionTemplate.innerHTML = ''; // removing old template

    const actionHeader = `<h4 id="collectionMovies" class="pt-2">Action Movies</h4>`;
    const collActTemplate = `<div class="CollectionMoviesContainer row" id="actionMovieSec">

        </div>`;


    const actionTempate = GenerateTemplateUtil.createAllChildHTMLElement(collActTemplate);
    const actionMovieSec = actionTempate.querySelector('#actionMovieSec');
    state.ActionList.forEach((movie) => {
        actionMovieSec.appendChild(this.createCardElement(movie, "Action"));
    });
    actionMovieSec.appendChild(GenerateStaticContent.createModelTemplate());
    const actSection = document.getElementById('ActionSection');
    actSection.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(actionHeader));
    actSection.appendChild(actionMovieSec);

    

    let oldAdvenTemplate = document.getElementById('AdventureSection');
    oldAdvenTemplate.innerHTML = ''; // removing old template

    const AdvenHeader = `<h4 id="collectionMovies" class="pt-2">Adventure Movies</h4>`;
    const collAdveTemplate = `<div class="CollectionMoviesContainer row" id="advnMovieSec"> </div>`;

    const advnTempate = GenerateTemplateUtil.createAllChildHTMLElement(collAdveTemplate);
    const advnMovieSec = advnTempate.querySelector('#advnMovieSec');
    state.AdventureList.forEach((movie) => {
        advnMovieSec.appendChild(this.createCardElement(movie, "Adventure"));
    });
    advnMovieSec.appendChild(GenerateStaticContent.createModelTemplate());
    const advenSection = document.getElementById('AdventureSection');
    advenSection.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(AdvenHeader));
    advenSection.appendChild(advnMovieSec);





    const oldComTemplate = document.getElementById('ComicSection');
    oldComTemplate.innerHTML = ''; // removing old template

    const comicHeader = `<h4 id="collectionMovies" class="pt-2">Comic Movies</h4>`;
    const collComTemplate = `<div class="CollectionMoviesContainer row" id="comicMovieSec">
        </div>`;

    const comicTempate = GenerateTemplateUtil.createAllChildHTMLElement(collComTemplate);
    const comicMovieSec = comicTempate.querySelector('#comicMovieSec');
    state.ComicList.forEach((movie) => {
        comicMovieSec.appendChild(this.createCardElement(movie, "Comic"));
    });
    comicMovieSec.appendChild(GenerateStaticContent.createModelTemplate());
    const comicSection = document.getElementById('ComicSection');
    comicSection.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(comicHeader));
    comicSection.appendChild(comicMovieSec);
  }
}
