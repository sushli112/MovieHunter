import {store} from './state';

store.subscribe(render);

function render(){
let state = store.getState();

}