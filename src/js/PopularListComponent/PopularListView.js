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

  static createPopularSectionmoviesList(moviesList) {
    const popularHeader = '<h4 id="popularMovies" class="pt-2">Popular Movies</h4>';
    const popularTemplate = `<div class="PopulaMoviesContainer row" id="popMovieSec">

        </div>`;
    const buttonsTemplate = `  <button class="btn btn-secondary float-left ml-5" id="previousPop">Previous</button>
    <button class="btn btn-secondary float-right" id="nextPop">Next</button>`;
    

    const popTemplate = GenerateTemplateUtil.createAllChildHTMLElement(popularTemplate);
    const popMovieSec = popTemplate.querySelector('#popMovieSec');
    
    moviesList.forEach((movie) => {
      popMovieSec.appendChild(PopularListView.createCardElement(movie));
    });
    popMovieSec.appendChild(GenerateStaticContent.createSearchModelTemplate());
    const section = document.getElementById('upperBody');
    section.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(popularHeader));
    section.appendChild(popMovieSec);
    section.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(buttonsTemplate));



    let next = document.getElementById("nextPop");
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
        
            console.log('PopularListView:Inside displaySearchedList method .............');
            document.cookie = `pageNUmber=${pageNUmber}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        const moviesList = PopularListService.getPopularMovies(pageNUmber);
        moviesList.then((movieList) => {
            console.log(`PopularListView : createPopularSectionmoviesList() :moviesList :${movieList}`);
            store.dispatch({
            type: 'POPULAR_LIST',
            data: movieList,
            });
        });

        },false);
    }

    let previous = document.getElementById("previousSearch");
    if(previous !=null){
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
                 type: 'POPULAR_LIST',
                 data: movieList,
            });
      });
    },false);
}




    const add = document.getElementById('addsearch');
    const self = this;
    if (add != null) {
      add.addEventListener('click', () => {
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
            PopularListView.refreshCollectionListComponent(state);
        });
        PopularListService.saveToCollection(title, poster_path, overview, release_date, selectedVal);

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
    comicId.innerHTML="";
    actionId.innerHTML="";
    adventureId.innerHTML="";

    let actionListHtml = '';
    let adventureListHtml = '';
    let comicListHtml = '';
    const self = this;

 
      let count = 4;

      let arrLength = state.ActionList.length;
      if (count < arrLength) {
        arrLength = count;
      }
      for (let i = 0; i < arrLength; i += 1) {
        actionListHtml = PopularListService
          .createCollListElement(state.ActionList[i], actionListHtml);
      }
      actionId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(actionListHtml));
    

   
       arrLength = state.AdventureList.length;
      console.log(`AdventureList size:${state.AdventureList.length} and length:${arrLength}`);
      if (count < arrLength) {
        arrLength = count;
      }
      for (let i = 0; i < arrLength; i += 1) {
        adventureListHtml = PopularListService
          .createCollListElement(state.AdventureList[i], adventureListHtml);
      }
      adventureId.appendChild(GenerateTemplateUtil
        .createAllChildHTMLElement(adventureListHtml));
    
        arrLength = state.ComicList.length;
        if (count < arrLength) {
        arrLength = count;
        }
      for (let i = 0; i < arrLength; i += 1) {
        comicListHtml = PopularListService
          .createCollListElement(state.ComicList[i], comicListHtml);
      }
      comicId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(comicListHtml));
    
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
                                    <button type="submit" class="modelButton" id="popularButton" class=" btn btn-secondary" data-toggle="modal" data-target="#exampleModalsearch">Add to List</button>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>`;
    const cardElement = GenerateTemplateUtil.createAllChildHTMLElement(cardTemplate);

    const button = cardElement.querySelector('#popularButton');
    button.onclick = function () {
      console.log('to open the modal popup');


    //   const popupImg = document.getElementById('popupImg');
    //   popupImg.setAttribute('src', `https://image.tmdb.org/t/p/w185${movie.poster_path}`);
    //   const movieTttle = document.getElementById('movieTttle');
    //   movieTttle.innerHTML = movie.title;
    //   const movieRelDate = document.getElementById('movieRelDate');
    //   movieRelDate.innerHTML = movie.release_date;
    //   const movieDesc = document.getElementById('movieDesc');
    //   movieDesc.innerHTML = movie.overview.substr(0, 110);

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
