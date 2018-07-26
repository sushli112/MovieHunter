import CollectionView from './CollectionView';
import CollectionService from './CollectionService';
import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';
import { store } from '../state/state';

export default class CollectionController {
  constructor() {
    this.collectionService = new CollectionService();
    this.collectionView = new CollectionView();
    this.generateTemplateUtil = new GenerateTemplateUtil();
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


    const actionList = this.collectionService.getDataFromServer('Action');
    const self = this;


    store.subscribe(() => {
      const state = store.getState();
      if (state.identifier === 'dispaction' || state.identifier === 'removefromaction') {
        const count = 4;
        let actionListHtml = '';
        while (actionId.firstChild) {
          actionId.removeChild(actionId.firstChild);
        }
        let length = state.ActionList.length;
        if (count < length) {
          length = count;
        }

        for (let i = 0; i < length; i += 1) {
          actionListHtml = self.collectionView.createCollListElement(state.ActionList[i], actionListHtml);
        }
        actionId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(actionListHtml));
      }
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


    const adventureList = this.collectionService.getDataFromServer('Adventure');

    store.subscribe(() => {
      const state = store.getState();
      if (state.identifier === 'dispadventure' || state.identifier === 'removefromadventure') {
        while (adventureId.firstChild) {
          adventureId.removeChild(adventureId.firstChild);
        }
        let adventureListHtml = '';
        const count = 4;
        let length = state.AdventureList.length;
        if (count < length) {
          length = count;
        }

        for (let i = 0; i < length; i += 1) {
          adventureListHtml = self.collectionView.createCollListElement(state.AdventureList[i], adventureListHtml);
        }
        adventureId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(adventureListHtml));
      }
    });

    adventureList.then((adventuresList) => {
      console.log(`CollectionController : createCollectionList() :adventureList :${adventuresList}`);
      store.dispatch({
        type: 'DISP_ADVENTURE_LIST',
        data: adventuresList,
      });
    });

    const comicList = this.collectionService.getDataFromServer('Comic');

    store.subscribe(() => {
      const state = store.getState();
      if (state.identifier === 'dispcomic' || state.identifier === 'removefromcomic') {
        const count = 4;
        let comicListHtml = '';
        while (comicId.firstChild) {
          comicId.removeChild(comicId.firstChild);
        }
        let length = state.ComicList.length;
        if (count < length) {
          length = count;
        }

        for (let i = 0; i < length; i += 1) {
          comicListHtml = self.collectionView.createCollListElement(state.ComicList[i], comicListHtml);
        }
        comicId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(comicListHtml));
      }
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
    const actionLink = document.getElementById('actionLink');
    actionLink.addEventListener('click', () => {
      store.subscribe(() => {
        const state = store.getState();
        console.log(`CollectionController: ActionList list from current state found:${state.ActionList}`);
        if (state.identifier === 'action' || state.identifier === 'removefromaction') {
          self.collectionView.createCollectionSectionmoviesList(state.ActionList, 'Action');
        }
      });
      moviesList = self.collectionService.getDataFromServer('action');
      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'ACTION_LIST',
            data: movieList,
          },
        );
      });

      // let previous = document.getElementById("previous");
      // previous.style.display="none";
      // let previous = document.getElementById("next");
      // previous.style.display="none";
    }, false);
    const adventureLink = document.getElementById('adventureLink');
    adventureLink.addEventListener('click', () => {
      store.subscribe(() => {
        const state = store.getState();
        console.log(`CollectionController:adventure list from current state found:${state.AdventureList}`);
        if (state.identifier === 'adventure' || state.identifier === 'removefromadventure') {
          self.collectionView.createCollectionSectionmoviesList(state.AdventureList, 'Adventure');
        }
      });
      moviesList = self.collectionService.getDataFromServer('adventure');

      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'ADVENTURE_LIST',
            data: movieList,
          },
        );
      });
    }, false);
    const comicLink = document.getElementById('comicLink');
    comicLink.addEventListener('click', () => {
      store.subscribe(() => {
        const state = store.getState();
        console.log(`CollectionController:comic list from current state found::${state.ComicList}`);
        if (state.identifier === 'comic' || state.identifier === 'removefromcomic') {
          self.collectionView.createCollectionSectionmoviesList(state.ComicList, 'Comic');
        }
      });
      moviesList = self.collectionService.getDataFromServer('comic');
      moviesList.then((movieList) => {
        console.log(`CollectionController : createEventOnCollectionClick() :moviesList :${movieList}`);
        store.dispatch(
          {
            type: 'COMIC_LIST',
            data: movieList,
          },
        );
      });
    }, false);
  }
}
