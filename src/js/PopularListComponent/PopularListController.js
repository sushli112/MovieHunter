import {PopularListService} from '../PopularListComponent/PopularListService';
import {PopularListView} from '../PopularListComponent/PopularListView'

import {store} from '../state/state';

export class PopularListController
{
    constructor(){
        this.popularService = new PopularListService();
        this.popularView =  new PopularListView();
    }

    displayPopularMovies() 
    {
        let pageNUmber =1;
        console.log("Inside getPopularMovies method .............")
        document.cookie = "pageNUmber="+pageNUmber+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        let moviesList =   this.popularService.getPopularMovies(pageNUmber);
        let self =this;
        store.subscribe(()=>{
           
                var state = store.getState();
                console.log("state found:"+ state);
                if(state.identifier ==="popular"){
                this.popularView.createPopularSectionmoviesList(state.PopularList);
                }
            
        });
        moviesList.then(function(moviesList) {
            console.log("PopularListController : displayPopularMovies() :moviesList :"+moviesList)
            // self.popularView.createPopularSectionmoviesList(moviesList);   
            store.dispatch(
                {
                     type:'POPULAR_LIST',
                     data: moviesList
                })
          });
       
       
    }

    // addToCollectionEventHandler()
    // {
    //     let exampleModal= document.getElementById("exampleModal");
    //         exampleModal.setAttribute("aria-hidden","true");
    //         exampleModal.style.display="none";
    //         exampleModal.style.paddingRight="0px";
    //         let selector = document.getElementById('inlineFormCustomSelect');
    //         let selectedVal = selector[selector.selectedIndex].value;

    //         let popupImg = document.getElementById("popupImg");
    //         let src = popupImg.getAttribute("src");
    //         let lastIndex = src.lastIndexOf('/');
    //         let poster_path = src.substr(lastIndex);

    //         let movieTttle = document.getElementById("movieTttle");
    //         let title = movieTttle.innerHTML;

    //         let movieRelDate = document.getElementById("movieRelDate");
    //         let release_date = movieRelDate.innerHTML;
    //         let movieDesc = document.getElementById("movieDesc");
    //         let overview = movieDesc.innerHTML;

    //         this.popularService.saveToCollection(title,poster_path,overview,release_date,selectedVal);
    // }

    onClickNextButton()
    {
        
            console.log("Next button clicked");
            let PageNumberFrmCookie = document.cookie.replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if(PageNumberFrmCookie !=undefined){
                console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
                let nextPageNumber = parseInt(PageNumberFrmCookie,10) ;
                nextPageNumber = nextPageNumber+1;

                document.cookie = "pageNUmber="+nextPageNumber+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";

                if(nextPageNumber>1){
                    let previous = document.getElementById("previous");
                     previous.style.display="grid";
                  }else{
                    let previous = document.getElementById("previous");
                    previous.style.display="none";
                  }
               
            }
            const currentPopListId =  document.getElementById("popMovieSec"); 
            while (currentPopListId.firstChild) {
              currentPopListId.removeChild(currentPopListId.firstChild);
            }
        
    }

    onClickPreviousButton()
    {
        
        let PageNumberFrmCookie = document.cookie.replace(/(?:(?:^|.*;\s*)pageNUmber\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(PageNumberFrmCookie !=undefined){
            console.log("Current Page Number from Cookie :"+PageNumberFrmCookie);
        let nextPageNumber = parseInt(PageNumberFrmCookie,10) ;
            nextPageNumber = nextPageNumber-1;
            document.cookie = "pageNUmber="+nextPageNumber+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }

        const currentPopListId =  document.getElementById("popMovieSec"); 
        while (currentPopListId.firstChild) {
          currentPopListId.removeChild(currentPopListId.firstChild);
        }
    
}
// render(){
//     var state = store.getState();
//     this.popularView.createPopularSectionmoviesList(state.PopularList);
// }



}
