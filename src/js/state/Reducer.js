//reducer
export function Reducer(currentState={
    "PopularList":[],
    "ActionList":[],
    "AdventureList":[],
    "ComicList":[],
    "SearchedList":[],
    "identifier":"popular"
},action){
    let nextState =null;
    switch(action.type){
        case "SEARCH_RESULT":
                                nextState = Object.assign({}, currentState);
                                nextState.SearchedList = action.data;
                                nextState.identifier ="search";
                                return nextState;
                                break;
        case "POPULAR_LIST":  
                               // let nextState = $.extend(true,{},currentState);
                              // let nextState = JSON.parse(JSON.stringify( currentState ));
                                nextState = Object.assign({}, currentState);
                                nextState.PopularList = action.data;
                                nextState.identifier ="popular";
                                return nextState;
                                break;
        case  'ACTION_LIST':     
                                nextState = Object.assign({}, currentState);
                                nextState.ActionList = action.data;
                                nextState.identifier ="action";
                                return nextState
                                break;

        case 'ADVENTURE_LIST':
                                nextState = Object.assign({}, currentState);
                                nextState.AdventureList = action.data;
                                nextState.identifier ="adventure";
                                return nextState
                                break;

        case 'COMIC_LIST':
                                nextState = Object.assign({}, currentState);
                                nextState.ComicList = action.data;
                                nextState.identifier ="comic";
                                return nextState
                                break;

        case  'DISP_ACTION_LIST':     
                                nextState = Object.assign({}, currentState);
                                nextState.ActionList = action.data;
                                nextState.identifier ="dispaction";
                                return nextState
                                break;

        case 'DISP_ADVENTURE_LIST':
                                nextState = Object.assign({}, currentState);
                                nextState.AdventureList = action.data;
                                nextState.identifier ="dispadventure";
                                return nextState
                                break;

        case 'DISP_COMIC_LIST':
                                nextState = Object.assign({}, currentState);
                                nextState.ComicList = action.data;
                                nextState.identifier ="dispcomic";
                                return nextState
                                break;



        case 'ADD_TO_ACTION':
                                nextState = Object.assign({}, currentState);
                                nextState.ActionList =[...currentState.ActionList,action.data] ;
                                nextState.identifier ="addtoaction";
                                return nextState
                                break;

        case 'ADD_TO_COMIC':
                                nextState = Object.assign({}, currentState);
                                nextState.ComicList = [...currentState.ComicList,action.data];
                                nextState.identifier ="addtocomic";
                                return nextState
                                break;

        case 'ADD_TO_ADVENTURE':
                                nextState = Object.assign({}, currentState);
                                nextState.AdventureList = [...currentState.AdventureList,action.data];
                                nextState.identifier ="addtoadventure";
                                return nextState
                                break;

        case 'REMOVE_FROM_ACTION':
                                nextState = Object.assign({}, currentState);
                                let ActionListTemp = nextState.ActionList;
                                for(let i=0;i<ActionListTemp.length;i++){
                                    if(ActionListTemp[i].id === action.data.id){
                                        ActionListTemp.splice(i,1);
                                    }
                                }
                                nextState.ActionList = ActionListTemp;
                                nextState.identifier ="removefromaction";
                                return nextState
                                break;

        case 'REMOVE_FROM_ADEVENTURE':
                                nextState = Object.assign({}, currentState);
                                let AdventureListTemp = nextState.AdventureList;
                                for(let i=0;i<AdventureListTemp.length;i++){
                                    if(AdventureListTemp[i].id === action.data.id){
                                        AdventureListTemp.splice(i,1);
                                    }
                                }
                                nextState.AdventureList = AdventureListTemp;
                                nextState.identifier ="removefromadventure";
                                return nextState
                                break;

        case 'REMOVE_FROM_COMIC':
                                nextState = Object.assign({}, currentState);
                                let ComicListTemp = nextState.ComicList;
                                for(let i=0;i<ComicListTemp.length;i++){
                                    if(ComicListTemp[i].id === action.data.id){
                                        ComicListTemp.splice(i,1);
                                    }
                                }
                                nextState.ComicList = ComicListTemp;
                                nextState.identifier ="removefromcomic";
                                return nextState
                                break;

        default:
            return currentState;
    }
}

