import 'jquery'
import 'bootstrap'
import 'popper.js'
import '../scss/index.scss'

//const getPopularMovies = require('./Server.js'); //working
//const createLocalDB = require('./Server.js');

import { getPopularMovies,getAllMoviewCollection,displayCompleteList,getAllSearchResult,displayAllSearchedResult } from './Server';

window.onload =function(){
    console.log("onload methid...."+document);
     // createLocalDB();
    const pageNUmber =1;
    getPopularMovies(pageNUmber); 
    console.log("Popular Movies has been Displayed ");
    let home = document.getElementById("home");
    if(home !=null){
        home.addEventListener("click",function(){
            console.log("Home page displayed");
            let popularMovies =  document.getElementById("popularMovies");
            if(popularMovies !==null){
              popularMovies.innerHTML="Popular Moviess";
            }
            getPopularMovies(pageNUmber); 
        },false);
    }
  
    let compName = document.getElementById("compName");
    if(compName !=null){
        compName.addEventListener("click",function(){
            console.log("Home page displayed");
            let popularMovies =  document.getElementById("popularMovies");
            if(popularMovies !==null){
              popularMovies.innerHTML="Popular Moviess";
            }
            getPopularMovies(pageNUmber); 
        },false);
    }
  
    getAllMoviewCollection();
    console.log("All collections has been Displayed ");
    let next = document.getElementById("next");
    next.addEventListener("click",function(){
        console.log("Next button clicked");
        let PageNumberFrmCookie = document.cookie.replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(PageNumberFrmCookie !=undefined){
            console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
            let nextPageNumber = parseInt(PageNumberFrmCookie,10) ;
            nextPageNumber = nextPageNumber+1;
            getPopularMovies(nextPageNumber);
        }
    },false);

    let previous = document.getElementById("previous");
    previous.addEventListener("click",function(){
        console.log("previuos button clicked ");
        let PageNumberFrmCookie = document.cookie.replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(PageNumberFrmCookie !=undefined){
            console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
        let nextPageNumber = parseInt(PageNumberFrmCookie,10) ;
            nextPageNumber = nextPageNumber-1;
            getPopularMovies(nextPageNumber);
        }
    },false);
    console.log("Collection full details ");
    let actionLink = document.getElementById("actionLink");
    actionLink.addEventListener("click",function(){
        displayCompleteList("action");
        let previous = document.getElementById("previous");
        previous.style.display="none";
        let previous = document.getElementById("next");
        previous.style.display="none";
    },false);
    let adventureLink = document.getElementById("adventureLink");
    adventureLink.addEventListener("click",function(){
        displayCompleteList("adventure");
        let previous = document.getElementById("previous");
        previous.style.display="none";
        let previous = document.getElementById("next");
        previous.style.display="none";
    },false);
    let comicLink = document.getElementById("comicLink");
    comicLink.addEventListener("click",function(){
        displayCompleteList("comic");
        let previous = document.getElementById("previous");
        previous.style.display="none";
        let previous = document.getElementById("next");
        previous.style.display="none";
    },false);
    let searchBar = document.getElementById("searchBar");
   
    searchBar.addEventListener("keyup",function(e){
        let key = e.which || e.keyCode;
        if (key != 13) { // 13 is enter
         console.log("key other than enter pressed");
         getAllSearchResult();
        }else{
            console.log(" enter is pressed");
            displayAllSearchedResult();
        }
       
    },false);

    let searchIcon = document.getElementById("searchIcon");
    searchIcon.addEventListener("click",function(e){
            console.log(" search icon is clicked");
            displayAllSearchedResult();
       
    },false);
  
}
console.log("hello");
