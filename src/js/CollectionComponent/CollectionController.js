import CollectionView from './CollectionView';
import CollectionService from './CollectionService';
import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import { store } from '../state/state';

export default class CollectionController {
  constructor() {
    this.collectionView = new CollectionView();
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.intervalId = 0;
  }

  createCollectionList() {
    console.log('Inside createCollectionList method .............');

    const section = document.getElementById('lowerBody');

    const collectionTemplate = this.collectionView.createCollectionListTemplate();
    section.appendChild(collectionTemplate);

    const actionId = document.getElementById('ActionList');
    const adventureId = document.getElementById('AdventureList');
    const comicId = document.getElementById('ComicList');

    console.log(`actoon..:${actionId} adventure...${adventureId}   comic...${comicId}`);


    const actionList = CollectionService.getDataFromServer('Action');
    const self = this;


    store.subscribe(() => {
      const state = store.getState();
        const count = 4;
        let actionListHtml = '';
        actionId.innerHTML="";
        let arrlength = state.ActionList.length;
        if (count < arrlength) {
          arrlength = count;
        }

        for (let i = 0; i < arrlength; i += 1) {
          actionListHtml = CollectionView
            .createCollListElement(state.ActionList[i], actionListHtml);
        }
        actionId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(actionListHtml));
    });

    actionList.then((actionsList) => {
      console.log(`CollectionController : createCollectionList() :actionList :${actionsList}`);
      console.log(`response from api:${actionsList}`);

      store.dispatch(
        {
          type: 'DISP_ACTION_LIST',
          data: actionsList,
        },
      );
    });


    const adventureList = CollectionService.getDataFromServer('Adventure');

    store.subscribe(() => {
      const state = store.getState();
      adventureId.innerHTML="";
        let adventureListHtml = '';
        const count = 4;
        let arrlength = state.AdventureList.length;
        if (count < arrlength) {
          arrlength = count;
        }

        for (let i = 0; i < arrlength; i += 1) {
          adventureListHtml = CollectionView
            .createCollListElement(state.AdventureList[i], adventureListHtml);
        }
        adventureId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(adventureListHtml));
      
    });

    adventureList.then((adventuresList) => {
      console.log(`CollectionController : createCollectionList() :adventureList :${adventuresList}`);
      store.dispatch({
        type: 'DISP_ADVENTURE_LIST',
        data: adventuresList,
      });
    });

    const comicList = CollectionService.getDataFromServer('Comic');

    store.subscribe(() => {
      const state = store.getState();
        const count = 4;
        let comicListHtml = '';
        comicId.innerHTML="";
        let arrlength = state.ComicList.length;
        if (count < arrlength) {
          arrlength = count;
        }

        for (let i = 0; i < arrlength; i += 1) {
          comicListHtml = CollectionView
            .createCollListElement(state.ComicList[i], comicListHtml);
        }
        comicId.appendChild(GenerateTemplateUtil.createAllChildHTMLElement(comicListHtml));
      
    });

    comicList.then((comicsList) => {
      console.log(`CollectionController : createCollectionList() :comicList :${comicsList}`);
      store.dispatch({
        type: 'DISP_COMIC_LIST',
        data: comicsList,
      });
    });

    this.createEventOnCollectionClick();
  }

  createEventOnCollectionClick() {
    let moviesList = null;
    const self = this;

    store.subscribe(() => {
        const state = store.getState();
        console.log(`CollectionController: ActionList list from current state found:${state.ActionList}`);
          self.collectionView.createCollectionSectionmoviesList(state);
      });


    let actionSecId = document.getElementById("ActionSection") ;
    let advenSecId = document.getElementById("AdventureSection");
    let comicSecId = document.getElementById("ComicSection");

    const actionLink = document.getElementById('actionLink');
    actionLink.addEventListener('click', () => {
      
       actionSecId.style.display = "block";
       advenSecId.style.display = "none";
       comicSecId.style.display = "none";

      moviesList = CollectionService.getDataFromServer('action');
      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'ACTION_LIST',
            data: movieList,
          },
        );
      });
      document.documentElement.scrollTop = 0;
    }, false);

    const adventureLink = document.getElementById('adventureLink');
    adventureLink.addEventListener('click', () => {
        actionSecId.style.display = "none";
        advenSecId.style.display = "block";
        comicSecId.style.display ="none";
      moviesList = CollectionService.getDataFromServer('adventure');
      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'ADVENTURE_LIST',
            data: movieList,
          },
        );
      });
      document.documentElement.scrollTop = 0;
    }, false);
    const comicLink = document.getElementById('comicLink');
    comicLink.addEventListener('click', () => {
        actionSecId.style.display ="none";
        advenSecId.style.display = "none";
        comicSecId.style.display = "block";

      moviesList = CollectionService.getDataFromServer('comic');
      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'COMIC_LIST',
            data: movieList,
          },
        );
      });
      document.documentElement.scrollTop = 0;
    }, false);
  }   

}
