import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../scss/index.scss';

import HeaderController from './headerComponent/HeaderController';
import FooterController from './FooterComponent/FooterController';
import PopularListController from './PopularListComponent/PopularListController';
import CollectionController from './CollectionComponent/CollectionController';

const headerObj = new HeaderController();
const footerObj = new FooterController();
const PopularListObj = new PopularListController();
const collectionObj = new CollectionController();

headerObj.createHeaderComponent();

PopularListObj.displayPopularMovies();

collectionObj.createCollectionList();

footerObj.createFooterComponent();
