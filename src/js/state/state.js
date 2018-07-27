import { createStore } from 'redux';
import Reducer from './Reducer';

const state = {
  PopularList: [],
  ActionList: [],
  AdventureList: [],
  ComicList: [],
  SearchedList: []
};
export const store = createStore(Reducer, state);

