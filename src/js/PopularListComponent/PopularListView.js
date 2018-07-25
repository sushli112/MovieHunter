import {GenerateTemplateUtil} from '../Common/GenerateTemplateUtil';
import {GenerateStaticContent} from '../Common/GenerateStaticContent';
import { PopularListController } from './PopularListController';
import { PopularListService } from './PopularListService';
import {store} from '../state/state';
export class PopularListView
{
    constructor(){
        this.generateTemplateUtil = new GenerateTemplateUtil();
        this.generateStaticContent = new GenerateStaticContent();
        this.popularService = new PopularListService();
        //this.popularListController = new PopularListController();
    }
    createPopularSectionmoviesList(moviesList)
    {
        const popularHeader =`<h4 id="popularMovies" class="pt-2">Popular Movies</h4>`;
        const popularTemplate =`<div class="PopulaMoviesContainer row" id="popMovieSec">

        </div>`;
        // const buttonsTemplate=`  <button class="btn btn-secondary float-left ml-5" id="previous">Previous</button>
        // <button class="btn btn-secondary float-right" id="next">Next</button>`
      

        const popTemplate = this.generateTemplateUtil.createAllChildHTMLElement(popularTemplate);
        const popMovieSec = popTemplate.querySelector('#popMovieSec');
        moviesList.forEach(movie => {
            popMovieSec.appendChild( this.createCardElement(movie));
        });
        popMovieSec.appendChild( this.generateStaticContent.createModelTemplate());
        let section = document.getElementById("upperBody");
        section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(popularHeader));
        section.appendChild(popMovieSec);
       // section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(buttonsTemplate));


        let add= document.getElementById("add");
        let self = this;
        if(add !=null){
        add.onclick = function(){
            // let exampleModal= document.getElementById("exampleModal");
            // exampleModal.setAttribute("aria-hidden","true");
            // exampleModal.style.display="none";
            // exampleModal.style.paddingRight="0px";
            let selector = document.getElementById('inlineFormCustomSelect');
            let selectedVal = selector[selector.selectedIndex].value;

            let popupImg = document.getElementById("popupImg");
            let src = popupImg.getAttribute("src");
            let lastIndex = src.lastIndexOf('/');
            let poster_path = src.substr(lastIndex);

            let movieTttle = document.getElementById("movieTttle");
            let title = movieTttle.innerHTML;

            let movieRelDate = document.getElementById("movieRelDate");
            let release_date = movieRelDate.innerHTML;
            let movieDesc = document.getElementById("movieDesc");
            let overview = movieDesc.innerHTML;

            store.subscribe(()=>{
                let state = store.getState();
                   if(state.identifier ==="addtoaction" || state.identifier ==="addtocomic" || state.identifier ==="addtoadventure"){
                    self.refreshCollectionListComponent(state);   
                    self.popularService.saveToCollection(title,poster_path,overview,release_date,selectedVal);
                       
                   }
              
               })

            if(selectedVal ==="action" ){
                store.dispatch(
                    {
                         type:'ADD_TO_ACTION',
                         data:{"title":title,
                                "poster_path": poster_path,
                                "overview": overview,
                                "release_date": release_date
                                }
                    }) 
            }else if(selectedVal ==="adventure"){
                store.dispatch(
                    {
                         type:'ADD_TO_ADVENTURE',
                         data: {"title":title,
                                "poster_path": poster_path,
                                "overview": overview,
                                "release_date": release_date
                                }
                    }) 
            }else if(selectedVal ==="comic"){
                store.dispatch(
                    {
                         type:'ADD_TO_COMIC',
                         data: {"title":title,
                                "poster_path": poster_path,
                                "overview": overview,
                                "release_date": release_date
                                }
                    }) 
            }
          
           
        }
        }
    }


refreshCollectionListComponent(state)
{
   
    let comicId = document.getElementById("ComicList");
    let actionId = document.getElementById("ActionList");
    let adventureId = document.getElementById("AdventureList");
    let actionListHtml =``;
    let adventureListHtml =``;
    let comicListHtml =``;
    let self =this;
    
        if(state.identifier ==="addtoaction"){
            let count = 4;
          
            while (actionId.firstChild) {
                actionId.removeChild(actionId.firstChild);
              }
            let length = state.ActionList.length;
            if(count<length){
                length = count;
            }
            for(let i=0;i<length;i++){
                actionListHtml = self.popularService.createCollListElement(state.ActionList[i],actionListHtml);
            }
            actionId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(actionListHtml));
        }

        if(state.identifier ==="addtoadventure"){
            let count = 4;
           
            while (adventureId.firstChild) {
                adventureId.removeChild(adventureId.firstChild);
              }
            let length = state.AdventureList.length;
            console.log("AdventureList size:"+state.AdventureList.length+" and length:"+length);
            if(count<length){
                length = count;
            }
            for(let i=0;i<length;i++){
                adventureListHtml = self.popularService.createCollListElement(state.AdventureList[i],adventureListHtml);
            }
            adventureId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(adventureListHtml));
        }
        if(state.identifier ==="addtocomic"){
            let count = 4;

            while (comicId.firstChild) {
                comicId.removeChild(comicId.firstChild);
              }
            let length = state.ComicList.length;
            if(count<length){
                length = count;
            }
            for(let i=0;i<length;i++){
                comicListHtml = self.popularService.createCollListElement(state.ComicList[i],comicListHtml);
            }
            comicId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(comicListHtml));
        } ///TODO/////////////////////////////////////////////

    }



    createCardElement(movie)
    {
        let cardTemplate=`<div class="col-xs-12 col-lg-6 mb-3">
                        <div class="card mainCard">
                        <div class= "row">
                            <img class="card-img-left col-6" src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="Card image cap">
                            <div class="card-body col-6">
                                <h5 class="card-title">${movie.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>
                                <p class="card-text">${movie.overview.substr(0,110)}...
                                </p>
                                <p id="viewMore" class="view-more">
                                    <button type="submit" class="modelButton" class=" btn btn-secondary" data-toggle="modal" data-target="#exampleModal">Add to List</button>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>`;
        const cardElement = this.generateTemplateUtil.createAllChildHTMLElement(cardTemplate);

        let button = cardElement.querySelector('.modelButton')
        button.onclick = function() {
            console.log('to open the modal popup');
      
            let exampleModal= document.getElementById("exampleModal");
           exampleModal.style.paddingRight="17px";
           exampleModal.style.display="block";
           exampleModal.classList.add("show");
           exampleModal.removeAttribute("aria-hidden");
      
           let popupImg = document.getElementById("popupImg");
          popupImg.setAttribute("src","https://image.tmdb.org/t/p/w185"+movie.poster_path);
          let movieTttle = document.getElementById("movieTttle");
          movieTttle.innerHTML = movie.title;
          let movieRelDate = document.getElementById("movieRelDate");
          movieRelDate.innerHTML =movie.release_date;
          let movieDesc = document.getElementById("movieDesc");
          movieDesc.innerHTML = movie.overview.substr(0,110);
      
          }
        return cardElement;
  }


    createPopularListTemplate()
    {
  
            let modelButtonArray = document.getElementsByClassName("modelButton"); 
            modelButtonArray.forEach(button=>{

            button.onclick = function() {
            console.log('to open the modal popup');
            let parentElement = button.parentElement;
            let previousSiblingCardText = parentElement.previousSibling;
            let cardText = previousSibling.innerHTML;

            let previousSiblingSubTitle = previousSiblingCardText.previousSibling;
            let cardSubTitle = previousSiblingSubTitle.innerHTML;

            let previousSibcardTitle = previousSiblingSubTitle.previousSibling;
            let cardTitle = previousSibcardTitle.innerHTML;

            let parentELCardBody = previousSibcardTitle.parentElement;
            let previousSibImg = parentELCardBody.previousSibling;
            let imageSrc = previousSibImg.getAttribute("src");
            
            let exampleModal= document.getElementById("exampleModal");
            exampleModal.style.paddingRight="17px";
            exampleModal.style.display="block";
            exampleModal.classList.add("show");
            exampleModal.removeAttribute("aria-hidden");
        
            let popupImg = document.getElementById("popupImg");
            let lastIndex = imageSrc.lastIndexOf('/');
            let poster_path = imageSrc.substr(lastIndex);
            popupImg.setAttribute("src","https://image.tmdb.org/t/p/w185"+poster_path);

            let movieTttle = document.getElementById("movieTttle");
            movieTttle.innerHTML =cardTitle;
            let movieRelDate = document.getElementById("movieRelDate");
            movieRelDate.innerHTML = cardSubTitle;
            let movieDesc = document.getElementById("movieDesc");
            movieDesc.innerHTML = cardText;
        }
})



    let next = document.getElementById("next");
    next.addEventListener("click",function(){
        onClickNextButton();
        document.getElementById('mainSection').appendChild(popularMovies);
    },false);

    let previous = document.getElementById("previous");
    previous.addEventListener("click",function(){
        console.log("previuos button clicked ");
        onClickPreviousButton();
        document.getElementById('mainSection').appendChild(popularMovies);
    },false);


}


}
