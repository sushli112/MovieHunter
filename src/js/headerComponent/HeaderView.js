import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import GenerateStaticContent from '../Common/GenerateStaticContent';
import { store } from '../state/state';
import HeaderService from './HeaderService';

export default class HeaderView {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.generateStaticContent = new GenerateStaticContent();
    this.headerService = new HeaderService();
  }

  createHeaderComponent() {
    console.log('inside createHeaderComponent method');
    const headerTemplate = `<nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" id="compName" href="#">
            MovieHunter
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                Menu
            </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#" id="home">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>

            </ul>
            <button type="submit" class="btn btn-secondary ml-2" data-toggle="modal" data-target="#modalLoginForm">Login</button>
            <button type="submit" class="btn btn-secondary ml-2" data-toggle="modal" data-target="#modalSignupForm">SignUp</button>
        </div>
        </nav>
        <section class="container searchSection">
        <form class="searchForm form-inline active-cyan-4 ml-5">
            <input class="form-control form-control-sm mr-3 w-75" id="searchBar" type="text" placeholder="Search" aria-label="Search">
            <a href="#" id="searchIcon">
                <i class="fa fa-search" aria-hidden="true"></i>
                <span class="sr-only">Search Icon</span>
            </a>
        </form>
        <ul id="searchResult" class="gridList">

        </ul>
        </section>`;

    const headerTemp = this.generateTemplateUtil.createAllChildHTMLElement(headerTemplate);
    const headerTemplte = headerTemp;
    // document.getElementById("header").appendChild(headerTemp);
    return headerTemplte;
  }

  createSearchedSectionmoviesList(moviesList) {
    const SearchHeader = '<h4 id="searchMovies" class="pt-2">Search List</h4>';
    const SearchTemplate = `<div class="SearchedMoviesContainer row" id="searchMovSec">

    </div>`;
    const buttonsTemplate = `  <button class="btn btn-secondary float-left ml-5" id="previous">Previous</button>
    <button class="btn btn-secondary float-right" id="next">Next</button>`;


    const popTemplate = this.generateTemplateUtil.createAllChildHTMLElement(SearchTemplate);
    const searchMovSec = popTemplate.querySelector('#searchMovSec');
    moviesList.forEach((movie) => {
      searchMovSec.appendChild(this.createCardElement(movie));
    });
    searchMovSec.appendChild(this.generateStaticContent.createSearchModelTemplate());
    const section = document.getElementById('searchSection');
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(SearchHeader));
    section.appendChild(searchMovSec);
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(buttonsTemplate));
    console.log(`search section content:${section.innerHTML}`);

    const add = document.getElementById('addsearch');
    const self = this;
    if (add != null) {
      add.addEventListener('click', () => {
        // let exampleModal= document.getElementById("exampleModal");
        // exampleModal.setAttribute("aria-hidden","true");
        // exampleModal.style.display="none";
        // exampleModal.style.paddingRight="0px";
        const selector = document.getElementById('inlineFormCustomSelectsearch');
        const selectedVal = selector[selector.selectedIndex].value;

        const popupImg = document.getElementById('popupImgsearch');
        const src = popupImg.getAttribute('src');
        const lastIndex = src.lastIndexOf('/');
        const poster_path = src.substr(lastIndex);

        const movieTttle = document.getElementById('movieTttlesearch');
        const title = movieTttle.innerHTML;

        const movieRelDate = document.getElementById('movieRelDatesearch');
        const release_date = movieRelDate.innerHTML;
        const movieDesc = document.getElementById('movieDescsearch');
        const overview = movieDesc.innerHTML;

        store.subscribe(() => {
          const state = store.getState();
          if (state.identifier === 'addtoaction' || state.identifier === 'addtocomic' || state.identifier === 'addtoadventure') {
            self.refreshCollectionListComponent(state);
            self.headerService.saveToCollection(title, poster_path, overview, release_date, selectedVal);
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
        actionListHtml = self.headerService
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
        adventureListHtml = self.headerService
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
        comicListHtml = self.headerService.createCollListElement(state.ComicList[i], comicListHtml);
      }
      comicId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(comicListHtml));
    } // /TODO/////////////////////////////////////////////
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
                                <button type="submit" class="modelButton" id="searchModal" class=" btn btn-secondary" data-toggle="modal" data-target="#exampleModalsearch">Add to List</button>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>`;
    const cardElement = this.generateTemplateUtil.createAllChildHTMLElement(cardTemplate);

    const button = cardElement.querySelector('#searchModal');
    button.onclick = function () {
      console.log('to open the modal popup');

      const exampleModal = document.getElementById('exampleModalsearch');
      exampleModal.style.paddingRight = '17px';
      exampleModal.style.display = 'block';
      exampleModal.classList.add('show');
      exampleModal.removeAttribute('aria-hidden');

      const popupImg = document.getElementById('popupImgsearch');
      popupImg.setAttribute('src', `https://image.tmdb.org/t/p/w185${movie.poster_path}`);
      const movieTttle = document.getElementById('movieTttlesearch');
      movieTttle.innerHTML = movie.title;
      const movieRelDate = document.getElementById('movieRelDatesearch');
      movieRelDate.innerHTML = movie.release_date;
      const movieDesc = document.getElementById('movieDescsearch');
      movieDesc.innerHTML = movie.overview.substr(0, 110);
    };
    return cardElement;
  }
}
