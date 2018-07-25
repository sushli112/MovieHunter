import {createStore} from 'redux';
import {Reducer} from '../state/Reducer';
var state =
{
    "PopularList":[],
    "ActionList":[],
    "AdventureList":[],
    "ComicList":[],
    "SearchedList":[],
    "identifier":"popular"
}
export let store = createStore(Reducer,state);



// //Actions
// document.getElementById("actionLink").addEventListener('click',function(){
//     store.dispatch({
//         type:'ACTION_LIST'
//     })
// })





