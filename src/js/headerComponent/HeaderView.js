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
        <form class="searchForm form-inline active-cyan-4 ml-5" id="searchForm">
            <input class="form-control form-control-sm mr-3 w-75" id="searchBar" type="text" placeholder="Search" aria-label="Search">
            <a href="#" id="searchIcon">
                <i class="fa fa-search" aria-hidden="true"></i>
                <span class="sr-only">Search Icon</span>
            </a>
        </form>
        <ul id="searchResult" class="gridList">

        </ul>
        </section>`;

    const headerTemp = GenerateTemplateUtil.createAllChildHTMLElement(headerTemplate);
    const headerTemplte = headerTemp;
    // document.getElementById("header").appendChild(headerTemp);
    return headerTemplte;
  }

  static createSearchedSectionmoviesList(moviesList) {

    const SearchHeader = '<h4 id="searchMovies" class="pt-2">Search List</h4>';
    const SearchTemplate = `<div class="SearchedMoviesContainer row" id="searchMovSec">

    </div>`;
    const buttonsTemplate = `  <button class="btn btn-secondary float-left ml-5" id="previousSearch">Previous</button>
    <button class="btn btn-secondary float-right" id="nextSearch">Next</button>`;


    const searcTemplate = GenerateTemplateUtil.createAllChildHTMLElement(SearchTemplate);
    const searchMovSec = searcTemplate.querySelector('#searchMovSec');
    moviesList.forEach((movie) => {
      searchMovSec.appendChild(HeaderView.createCardElement(movie));
    });
    searchMovSec.appendChild(GenerateStaticContent.createModelTemplate());
    const section = document.getElementById('searchSection');
    section.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(SearchHeader));
    section.appendChild(searchMovSec);
    section.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(buttonsTemplate));


////TO DO ////////////////////////////////////////

     let next = document.getElementById("nextSearch");
        if(next!=null){
        next.addEventListener("click",function(){
            console.log("Next button clicked");
            let pageNUmber = null;
            let PageNumberFrmCookie = document.cookie.
            replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if(PageNumberFrmCookie !=undefined){
            console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
             pageNUmber = parseInt(PageNumberFrmCookie,10) ;
             pageNUmber = pageNUmber+1;
            }else{
                pageNUmber =1;
            }
        
            console.log('HeaderController:Inside displaySearchedList method .............');
            document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        const moviesList = HeaderService.displayAllSearchedResult(pageNUmber);
        moviesList.then((movieList) => {
            console.log(`HeaderController : displaySearchedList() :moviesList :${movieList}`);
            store.dispatch({
              type: 'SEARCH_RESULT',
              data: movieList,
            });
          });

        },false);
    }

        let previous = document.getElementById("previousSearch");
        if(previous!=null){
        previous.addEventListener("click",function(){
            console.log("Next button clicked");
            let pageNUmber = null;
            let PageNumberFrmCookie = document.cookie.
            replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if(PageNumberFrmCookie !=undefined){
            console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
             pageNUmber = parseInt(PageNumberFrmCookie,10) ;
             pageNUmber = pageNUmber-1;
            }else{
                pageNUmber =1;
            }
        
            console.log('HeaderController:Inside displaySearchedList method .............');
            document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
            const moviesList = HeaderService.displayAllSearchedResult(pageNUmber);
            moviesList.then((movieList) => {
                console.log(`HeaderController : displaySearchedList() :moviesList :${movieList}`);
                store.dispatch({
                     type: 'SEARCH_RESULT',
                     data: movieList,
                });
          });
        },false);
    }


    const add = document.getElementById('add');
    const self = this;
    if (add != null) {
      add.addEventListener('click', () => {
        // let exampleModal= document.getElementById("exampleModal");
        // exampleModal.setAttribute("aria-hidden","true");
        // exampleModal.style.display="none";
        // exampleModal.style.paddingRight="0px";
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
            HeaderView.refreshCollectionListComponent(state);
        });
        HeaderService.saveToCollection(title, poster_path, overview, release_date, selectedVal);
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


  static refreshCollectionListComponent(state) {
    const comicId = document.getElementById('ComicList');
    const actionId = document.getElementById('ActionList');
    const adventureId = document.getElementById('AdventureList');
    let actionListHtml = '';
    let adventureListHtml = '';
    let comicListHtml = '';
    const self = this;


      while (actionId.firstChild) {
        actionId.removeChild(actionId.firstChild);
      }
      let actLength = state.ActionList.length;
      if (count < actLength) {
        actLength = count;
      }
      for (let i = 0; i < actLength; i += 1) {
        actionListHtml = HeaderService
          .createCollListElement(state.ActionList[i], actionListHtml);
      }
      actionId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(actionListHtml));
    

      const count = 4;

      while (adventureId.firstChild) {
        adventureId.removeChild(adventureId.firstChild);
      }
      let advnLength = state.AdventureList.length;
      console.log(`AdventureList size:${state.AdventureList.length} and length:${advnLength}`);
      if (count < advnLength) {
        advnLength = count;
      }
      for (let i = 0; i < advnLength; i += 1) {
        adventureListHtml = HeaderService
          .createCollListElement(state.AdventureList[i], adventureListHtml);
      }
      adventureId.appendChild(GenerateTemplateUtil
        .createAllChildHTMLElement(adventureListHtml));
    

      while (comicId.firstChild) {
        comicId.removeChild(comicId.firstChild);
      }
      let comLength = state.ComicList.length;
      if (count < comLength) {
        comLength = count;
      }
      for (let i = 0; i < comLength; i += 1) {
        comicListHtml = HeaderService.createCollListElement(state.ComicList[i], comicListHtml);
      }
      comicId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(comicListHtml));
     // /TODO/////////////////////////////////////////////
  }

  static createCardElement(movie) {
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
                                <button type="submit" class="modelButton" id="searchModal" class=" btn btn-secondary" data-toggle="modal" data-target="#exampleModalPop">Add to List</button>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>`;
    const cardElement =GenerateTemplateUtil.createAllChildHTMLElement(cardTemplate);

    const button = cardElement.querySelector('#searchModal');
    button.onclick = function () {
      console.log('to open the modal popup');

    //   const exampleModal = document.getElementById('exampleModalsearch');
    //   exampleModal.style.paddingRight = '17px';
    //   exampleModal.style.display = 'block';
    //   exampleModal.classList.add('show');
    //   exampleModal.removeAttribute('aria-hidden');

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
