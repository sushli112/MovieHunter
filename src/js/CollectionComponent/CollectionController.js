import {CollectionView} from './CollectionView';
import {CollectionService} from './CollectionService';
import { GenerateTemplateUtil } from '../Common/GenerateTemplateUtil';
import {store} from '../state/state';

export class CollectionController{
    constructor(){
        this.collectionService = new CollectionService();
        this.collectionView = new CollectionView();
        this.generateTemplateUtil = new GenerateTemplateUtil();
    }
    createCollectionList(){
        console.log("Inside createCollectionList method .............")
      
        let section = document.getElementById("lowerBody");
      
       let collectionTemplate = this.collectionView.createCollectionListTemplate();
       section.appendChild(collectionTemplate);

       let actionId = document.getElementById("ActionList");
       let adventureId = document.getElementById("AdventureList");
       let comicId = document.getElementById("ComicList");

       console.log("actoon..:"+actionId+" adventure..."+adventureId+ "   comic..."+comicId);
       

        let actionList =  this.collectionService.getDataFromServer("Action");
        let self =this;
       
     

        store.subscribe(()=>{
            var state = store.getState();
            if(state.identifier ==="dispaction" || state.identifier ==="removefromaction"){
                    let count = 4;
                    let actionListHtml =``;
                    while (actionId.firstChild) {
                        actionId.removeChild(actionId.firstChild);
                      }
                    let length = state.ActionList.length;
                    if(count<length){
                    length = count;
                    }
                
                    for(let i=0;i<length;i++){
                    actionListHtml = self.collectionView.createCollListElement(state.ActionList[i],actionListHtml);
                    }
                    actionId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(actionListHtml));
                }
        });

        actionList.then(function(actionList) {
            console.log("CollectionController : createCollectionList() :actionList :"+actionList)
            console.log("response from api:"+  actionList);
    
            store.dispatch(
                {
                     type:'DISP_ACTION_LIST',
                     data: actionList
                })
           
         });
    
        
       

     let adventureList = this.collectionService.getDataFromServer("Adventure");

     store.subscribe(()=>{
        let state = store.getState();
        if(state.identifier ==="dispadventure" || state.identifier==="removefromadventure"){
            while (adventureId.firstChild) {
                adventureId.removeChild(adventureId.firstChild);
              }
              let adventureListHtml =``;
                let count = 4;
                let length = state.AdventureList.length;
                if(count<length){
                length = count;
                }
            
                for(let i=0;i<length;i++){
                    adventureListHtml = self.collectionView.createCollListElement(state.AdventureList[i],adventureListHtml);
                }
                adventureId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(adventureListHtml));
            }
     })

     adventureList.then(function(adventureList) {
         console.log("CollectionController : createCollectionList() :adventureList :"+adventureList)
            store.dispatch({
                type:"DISP_ADVENTURE_LIST",
                data: adventureList
            })
       
    })

   let comicList = this.collectionService.getDataFromServer("Comic");
  
   store.subscribe(()=>{
            let state = store.getState();
            if(state.identifier==="dispcomic" || state.identifier==="removefromcomic"){
                    let count = 4;
                    let comicListHtml =``;
                    while (comicId.firstChild) {
                        comicId.removeChild(comicId.firstChild);
                      }
                    let length = state.ComicList.length;
                    if(count<length){
                    length = count;
                    }
                
                    for(let i=0;i<length;i++){
                        comicListHtml = self.collectionView.createCollListElement(state.ComicList[i],comicListHtml);
                    }
                    comicId.appendChild(self.generateTemplateUtil.createAllChildHTMLElement(comicListHtml));
                }
        })

    comicList.then(function(comicList) {
    
        console.log("CollectionController : createCollectionList() :comicList :"+comicList)
        store.dispatch({
           type:"DISP_COMIC_LIST",
           data:comicList
       })
       
      })

      this.createEventOnCollectionClick();
     
    }  

    createEventOnCollectionClick(){

        let moviesList =null;
        let self =this;
        let actionLink = document.getElementById("actionLink");
        actionLink.addEventListener("click",function(){
            store.subscribe(()=>{
           
                var state = store.getState();
                console.log("CollectionController: ActionList list from current state found:"+ state.ActionList);
                if(state.identifier ==="action"  || state.identifier ==="removefromaction"){
                    self.collectionView.createCollectionSectionmoviesList(state.ActionList,"Action");
                }
            
        });
            moviesList = self.collectionService.getDataFromServer("action");
            moviesList.then(function(moviesList) {
                console.log("CollectionController : createEventOnCollectionClick() :moviesList :"+moviesList)
                store.dispatch(
                    {
                         type:'ACTION_LIST',
                         data: moviesList
                    })  
              });

            // let previous = document.getElementById("previous");
            // previous.style.display="none";
            // let previous = document.getElementById("next");
            // previous.style.display="none";
        },false);
        let adventureLink = document.getElementById("adventureLink");
        adventureLink.addEventListener("click",function(){
            store.subscribe(()=>{
           
                var state = store.getState();
                console.log("CollectionController:adventure list from current state found:"+ state.AdventureList);
                if(state.identifier ==="adventure" || state.identifier ==="removefromadventure"){
                    self.collectionView.createCollectionSectionmoviesList(state.AdventureList, "Adventure");
                }
            
        });
            moviesList = self.collectionService.getDataFromServer("adventure");
           
            moviesList.then(function(moviesList) {
                console.log("CollectionController : createEventOnCollectionClick() :moviesList :"+moviesList)
                store.dispatch(
                    {
                         type:'ADVENTURE_LIST',
                         data: moviesList
                    })     
              });

            // let previous = document.getElementById("previous");
            // previous.style.display="none";
            // let previous = document.getElementById("next");
            // previous.style.display="none";
        },false);
        let comicLink = document.getElementById("comicLink");        
        comicLink.addEventListener("click",function(){
            store.subscribe(()=>{
                
                var state = store.getState();
                console.log("CollectionController:comic list from current state found::"+ state.ComicList);
                if(state.identifier ==="comic" || state.identifier ==="removefromcomic" ){
                    self.collectionView.createCollectionSectionmoviesList(state.ComicList, "Comic");
                }
            
        });
            moviesList =self.collectionService.getDataFromServer("comic");
            moviesList.then(function(moviesList) {
                console.log("CollectionController : createEventOnCollectionClick() :moviesList :"+moviesList)
                store.dispatch(
                    {
                         type:'COMIC_LIST',
                         data: moviesList
                    })      
              });
            // let previous = document.getElementById("previous");
            // previous.style.display="none";
            // let previous = document.getElementById("next");
            // previous.style.display="none";
        },false);
    }

        
    }
   