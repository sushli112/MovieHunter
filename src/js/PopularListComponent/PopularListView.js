import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import GenerateStaticContent from '../Common/GenerateStaticContent';
import PopularListService from './PopularListService';
import { store } from '../state/state';

export default class PopularListView {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.generateStaticContent = new GenerateStaticContent();
    this.popularService = new PopularListService();
  }

  createPopularSectionmoviesList(moviesList) {
    const popularHeader = '<h4 id="popularMovies" class="pt-2">Popular Movies</h4>';
    const popularTemplate = `<div class="PopulaMoviesContainer row" id="popMovieSec">

        </div>`;


    const popTemplate = this.generateTemplateUtil.createAllChildHTMLElement(popularTemplate);
    const popMovieSec = popTemplate.querySelector('#popMovieSec');
    moviesList.forEach((movie) => {
      popMovieSec.appendChild(this.createCardElement(movie));
    });
    popMovieSec.appendChild(this.generateStaticContent.createModelTemplate());
    const section = document.getElementById('upperBody');
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(popularHeader));
    section.appendChild(popMovieSec);


    const add = document.getElementById('add');
    const self = this;
    if (add != null) {
      add.addEventListener('click', () => {
        const selector = document.getElementById('inlineFormCustomSelect');
        const selectedVal = selector[selector.selectedIndex].value;

        const popupImg = document.getElementById('popupImg');
        const src = popupImg.getAttribute('src');
        const lastIndex = src.lastIndexOf('/');
        const poster_path = src.substr(lastIndex);

        const movieTttle = document.getElementById('movieTttle');
        const title = movieTttle.innerHTML;

        const movieRelDate = document.getElementById('movieRelDate');
        const release_date = movieRelDate.innerHTML;
        const movieDesc = document.getElementById('movieDesc');
        const overview = movieDesc.innerHTML;

        store.subscribe(() => {
          const state = store.getState();
          if (state.identifier === 'addtoaction' || state.identifier === 'addtocomic' || state.identifier === 'addtoadventure') {
            self.refreshCollectionListComponent(state);
            self.popularService.saveToCollection(title, poster_path, overview, release_date, selectedVal);
          }
        });

        if (selectedVal === 'action') {
          store.dispatch(
            {
              type: 'ADD_TO_ACTION',
              data: {
                title,
                poster_path,
                overview,
                release_date,
              },
            },
          );
        } else if (selectedVal === 'adventure') {
          store.dispatch(
            {
              type: 'ADD_TO_ADVENTURE',
              data: {
                title,
                poster_path,
                overview,
                release_date,
              },
            },
          );
        } else if (selectedVal === 'comic') {
          store.dispatch(
            {
              type: 'ADD_TO_COMIC',
              data: {
                title,
                poster_path,
                overview,
                release_date,
              },
            },
          );
        }
      }, false);
    }
  }


  refreshCollectionListComponent(state) {
    const comicId = document.getElementById('ComicList');
    const actionId = document.getElementById('ActionList');
    const adventureId = document.getElementById('AdventureList');
    let actionListHtml = '';
    let adventureListHtml = '';
    let comicListHtml = '';
    const self = this;

    if (state.identifier === 'addtoaction') {
      const count = 4;

      while (actionId.firstChild) {
        actionId.removeChild(actionId.firstChild);
      }
      let arrLength = state.ActionList.length;
      if (count < arrLength) {
        arrLength = count;
      }
      for (let i = 0; i < arrLength; i += 1) {
        actionListHtml = self.popularService
          .createCollListElement(state.ActionList[i], actionListHtml);
      }
      actionId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(actionListHtml));
    }

    if (state.identifier === 'addtoadventure') {
      const count = 4;

      while (adventureId.firstChild) {
        adventureId.removeChild(adventureId.firstChild);
      }
      let arrLength = state.AdventureList.length;
      console.log(`AdventureList size:${state.AdventureList.length} and length:${arrLength}`);
      if (count < arrLength) {
        arrLength = count;
      }
      for (let i = 0; i < arrLength; i += 1) {
        adventureListHtml = self.popularService
          .createCollListElement(state.AdventureList[i], adventureListHtml);
      }
      adventureId.appendChild(self.generateTemplateUtil
        .createAllChildHTMLElement(adventureListHtml));
    }
    if (state.identifier === 'addtocomic') {
      const count = 4;

      while (comicId.firstChild) {
        comicId.removeChild(comicId.firstChild);
      }
      let arrLength = state.ComicList.length;
      if (count < arrLength) {
        arrLength = count;
      }
      for (let i = 0; i < arrLength; i += 1) {
        comicListHtml = self.popularService
          .createCollListElement(state.ComicList[i], comicListHtml);
      }
      comicId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(comicListHtml));
    }
  }


  createCardElement(movie) {
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
                                    <button type="submit" class="modelButton" id="popularButton" class=" btn btn-secondary" data-toggle="modal" data-target="#exampleModal">Add to List</button>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>`;
    const cardElement = this.generateTemplateUtil.createAllChildHTMLElement(cardTemplate);

    const button = cardElement.querySelector('#popularButton');
    button.onclick = function () {
      console.log('to open the modal popup');

      const exampleModal = document.getElementById('exampleModal');
      exampleModal.style.paddingRight = '17px';
      exampleModal.style.display = 'block';
      exampleModal.classList.add('show');
      exampleModal.removeAttribute('aria-hidden');

      const popupImg = document.getElementById('popupImg');
      popupImg.setAttribute('src', `https://image.tmdb.org/t/p/w185${movie.poster_path}`);
      const movieTttle = document.getElementById('movieTttle');
      movieTttle.innerHTML = movie.title;
      const movieRelDate = document.getElementById('movieRelDate');
      movieRelDate.innerHTML = movie.release_date;
      const movieDesc = document.getElementById('movieDesc');
      movieDesc.innerHTML = movie.overview.substr(0, 110);
    };
    return cardElement;
  }
}
