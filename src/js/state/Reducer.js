// reducer
export default function Reducer(currentState = {
  PopularList: [],
  ActionList: [],
  AdventureList: [],
  ComicList: [],
  SearchedList: []
}, action) {
  let nextState = null;
  switch (action.type) {
    case 'SEARCH_RESULT':
     // return Object.assign({}, currentState,{SearchedList:action.data});  
             nextState = Object.assign({}, currentState,{SearchedList:action.data});
            return nextState;
    case 'POPULAR_LIST':
            nextState = Object.assign({}, currentState,{PopularList:action.data});
            return nextState;
    case 'ACTION_LIST':
            nextState = Object.assign({}, currentState,{ActionList:action.data})
            return nextState;
    case 'ADVENTURE_LIST':
             nextState = Object.assign({}, currentState,{AdventureList:action.data})
             return nextState;

    case 'COMIC_LIST':
             nextState = Object.assign({}, currentState,{ComicList:action.data})
             return nextState;

    case 'DISP_ACTION_LIST':
                nextState =Object.assign({}, currentState,{ActionList:action.data})
                return nextState;

    case 'DISP_ADVENTURE_LIST':
                nextState = Object.assign({}, currentState,{AdventureList:action.data})
                return nextState;

    case 'DISP_COMIC_LIST':
                nextState = Object.assign({}, currentState,{ComicList:action.data})
                return nextState


    case 'ADD_TO_ACTION':
      nextState = Object.assign({}, currentState);
      nextState.ActionList = [...currentState.ActionList, action.data];
      return nextState;

    case 'ADD_TO_COMIC':
      nextState = Object.assign({}, currentState);
      nextState.ComicList = [...currentState.ComicList, action.data];
      return nextState;

    case 'ADD_TO_ADVENTURE':
      nextState = Object.assign({}, currentState);
      nextState.AdventureList = [...currentState.AdventureList, action.data];
      return nextState;

    case 'REMOVE_FROM_ACTION':

      nextState = Object.assign({}, currentState);
      const ActionListTemp = nextState.ActionList;
      for (let i = 0; i < ActionListTemp.length; i += 1) {
        if (ActionListTemp[i].id === action.data.id) {
          ActionListTemp.splice(i, 1);
        }
      }
      nextState.ActionList = ActionListTemp;
      return nextState;

    case 'REMOVE_FROM_ADEVENTURE':
      nextState = Object.assign({}, currentState);
      const AdventureListTemp = nextState.AdventureList;
      for (let i = 0; i < AdventureListTemp.length; i += 1) {
        if (AdventureListTemp[i].id === action.data.id) {
          AdventureListTemp.splice(i, 1);
        }
      }
      nextState.AdventureList = AdventureListTemp;
      return nextState;

    case 'REMOVE_FROM_COMIC':
      nextState = Object.assign({}, currentState);
      const ComicListTemp = nextState.ComicList;
      for (let i = 0; i < ComicListTemp.length; i += 1) {
        if (ComicListTemp[i].id === action.data.id) {
          ComicListTemp.splice(i, 1);
        }
      }
      nextState.ComicList = ComicListTemp;
      return nextState;

    default:
      return currentState;
  }
}
