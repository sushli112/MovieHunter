import { createStore } from 'redux';
import Reducer from './Reducer';

const state = {
  PopularList: [],
  ActionList: [],
  AdventureList: [],
  ComicList: [],
  SearchedList: [],
  identifier: 'popular',
};
export const store = createStore(Reducer, state);


// //Actions
// document.getElementById("actionLink").addEventListener('click',function(){
//     store.dispatch({
//         type:'ACTION_LIST'
//     })
// })
