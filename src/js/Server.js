//var fs = require('fs');

//module.exports= function getPopularMovies() {
  function getPopularMovies(pageNUmber) 
  {
  console.log("Inside getPopularMovies method .............")
  document.cookie = "pageNUmber="+pageNUmber+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";

   // const popularMovieList =document.getElementById('popularMovieList');
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=aef122b97215b0783d385328924c3a26&language=en-US&page='+pageNUmber;
    console.log("Composed url is: "+url);
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data.results;
    if(pageNUmber>1){
      var previous = document.getElementById("previous");
       previous.style.display="grid";
    }else{
      var previous = document.getElementById("previous");
      previous.style.display="none";
    }
    console.log("response from api:"+  moviesList);
    const currentPopListId =  document.getElementById("popMovieSec"); 
    while (currentPopListId.firstChild) {
      currentPopListId.removeChild(currentPopListId.firstChild);
    }
    for(var i=0;i<moviesList.length;i++){

      createMovieDetailElements(moviesList,i,"popular");
      }
  })
  .catch(function(error) {
    console.log(error);
  });   
}


function createMovieDetailElements(moviesList,sequenceId,displayType)
{
  var currentTobeDisplayedListId =null;
  if(displayType ==="popular"){
     currentTobeDisplayedListId =  document.getElementById("popMovieSec"); 
  }else if(displayType === "search"){
    currentTobeDisplayedListId =  document.getElementById("searchedMovies"); 
  }else{
    currentTobeDisplayedListId =  document.getElementById("popMovieSec"); 
  }
  
    let movie = moviesList[sequenceId];
    console.log("Sequence:"+sequenceId+"detail :"+ movie);
    let column = document.createElement('div'),
        card = document.createElement('div'),
        row = document.createElement('div'),
        img = document.createElement('img'),
        cardBody = document.createElement('div'),
        h5 = document.createElement('h5'),
        h6 = document.createElement('h6'),
        cardText = document.createElement('p'),
        viewMore = document.createElement('p'),
        button = document.createElement('button'),
        recordId = document.createElement("h4");
        
    img.src = "https://image.tmdb.org/t/p/w185"+movie.poster_path;
    img.alt = movie.title;
    img.classList.add("card-img-left","col-6");

    cardBody.classList.add("card-body","col-6");

    let shortDisc = movie.overview;
    cardText.innerHTML = shortDisc.substr(0,110)+"...";
    cardText.classList.add("card-text");

    h6.innerHTML = movie.release_date;
    h6.classList.add("card-subtitle", "mb-2", "text-muted");

    h5.innerHTML = movie.title;
    h6.classList.add("card-title");

    button.innerHTML = "Add To List";
    button.setAttribute("type","submit");
    button.setAttribute("data-toggle","model");
    button.setAttribute("data-target","#exampleModal");
    button.setAttribute("id","add"+sequenceId);
    button.classList.add("btn", "btn-secondary");
    

    recordId.innerHTML = movie.id;
    recordId.hidden =true;
    // a.addEventListener("click", function(){
    //   addToListEventHandler(movie.poster_path,movie.title,movie.overview,movie.release_date);
    // })
    viewMore.classList.add("view-more")
    row.classList.add("row");
    card.classList.add("card", "mainCard");
    column.classList.add("col-xs-12", "col-lg-6", "mb-3");

    cardBody.appendChild(h5);
    cardBody.appendChild(h6);
    cardBody.appendChild(cardText);
    viewMore.appendChild(button);

    if((displayType !="popular") && (displayType != "search")){

      var removeButton = document.createElement('button')
      removeButton.innerHTML="Remove";
      removeButton.setAttribute("type","submit");
      removeButton.setAttribute("id","remove"+sequenceId);
      removeButton.classList.add("btn","btn-secondary","ml-2");
      viewMore.appendChild(removeButton);
    }

    cardBody.appendChild(viewMore);
    row.appendChild(img);
    row.appendChild(cardBody);
    card.appendChild(row);
    column.appendChild(card);

    currentTobeDisplayedListId.appendChild(column); //appending list to ul tag

    button.onclick = function() {
      console.log('to open the modal popup');

     var exampleModal= document.getElementById("exampleModal");
     exampleModal.style.paddingRight="17px";
     exampleModal.style.display="block";
     exampleModal.classList.add("show");
     exampleModal.removeAttribute("aria-hidden");

    var popupImg = document.getElementById("popupImg");
    popupImg.setAttribute("src","https://image.tmdb.org/t/p/w185"+movie.poster_path);
    var movieTttle = document.getElementById("movieTttle");
    movieTttle.innerHTML = movie.title;
    var movieRelDate = document.getElementById("movieRelDate");
    movieRelDate.innerHTML =movie.release_date;
    var movieDesc = document.getElementById("movieDesc");
    movieDesc.innerHTML =movie.overview;

    }
    var close= document.getElementById("close");
      if(close !=null){
      close.onclick = function(){
        exampleModal.setAttribute("aria-hidden","true");
        exampleModal.style.display="none";
        exampleModal.style.paddingRight="0px";
      }
  }

  var add= document.getElementById("add");
      if(add !=null){
      add.onclick = function(){
        exampleModal.setAttribute("aria-hidden","true");
        exampleModal.style.display="none";
        exampleModal.style.paddingRight="0px";
        var selector = document.getElementById('inlineFormCustomSelect');
        var selectedVal = selector[selector.selectedIndex].value;

        var popupImg = document.getElementById("popupImg");
        var src = popupImg.getAttribute("src");
        var lastIndex = src.lastIndexOf('/');
        var poster_path = src.substr(lastIndex);

        var movieTttle = document.getElementById("movieTttle");
        var title = movieTttle.innerHTML;

        var movieRelDate = document.getElementById("movieRelDate");
        var release_date = movieRelDate.innerHTML;
        var movieDesc = document.getElementById("movieDesc");
        var overview = movieDesc.innerHTML;

        saveToCollection(title,poster_path,overview,release_date,selectedVal);
      }
  }

  var remove = document.getElementById("remove"+sequenceId);
  if(remove !=null){
    console.log("Remove Button clicked");
    remove.addEventListener("click",function(){
        var currentDisplayedType = document.getElementById("popularMovies");
        var currentDisplayedTypeVal = currentDisplayedType.innerHTML;
        var currentListType =null;
        if(currentDisplayedTypeVal ==="Comic Movies"){
          currentListType ="comic";
        }else if(currentDisplayedTypeVal ==="Adventure Movies"){
          currentListType ="adventure";
        }else if(currentDisplayedTypeVal ==="Action Movies"){
          currentListType ="action";
        }
        console.log("currentListType is:"+currentListType);
        deleteMovieFromList(movie.id,currentListType);
    });
  }
}



function deleteMovieFromList(movieId,currentListType){
  console.log("inside deleteMovieFromList :movieId"+movieId+" currentListType"+currentListType);
  var url=null;
  if(currentListType ==="action"){
    url = 'http://localhost:8080/Action/'+movieId;
  }else if(currentListType==="adventure"){
    url = 'http://localhost:8080/Adventure/'+movieId;

  }else if(currentListType ==="comic"){
    url = 'http://localhost:8080/Comic/'+movieId;
  }

  // fetch(url)
  // .then((resp) => resp.json())
  // .then(function(data) {   
    fetch(url, {
          method: 'DELETE'
        })
        .then((res) => res.json())
        .then(function(data){
          console.log('Success:', data);
          console.log("entry has beed deleted");
          getAllMoviewCollection(); //to update all collections after deletion
          displayCompleteList(currentListType); // to update current opened collection view
        })
        .catch(error => console.error('Error:', error));
  //  })
  // .catch(function(error) {
  //   console.log(error);
  // });   



}




function saveToCollection(title,posterPath,overview,releaseDate,selectedVal)
{
  var url= null;
  if(selectedVal ==="action"){
    url = 'http://localhost:8080/Action';
  }else if(selectedVal==="adventure"){
    url = 'http://localhost:8080/Adventure';

  }else if(selectedVal ==="comic"){
    url = 'http://localhost:8080/Comic';
  }
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data;
    // var newEntry="{\"title\": "+title+","+
    //   +" \"poster_path\": "+posterPath+","+
    //  +" \"overview\": "+overview+","+
    //   +" \"release_date\": "+releaseDate+"}";

    var newEntry=`\"title\": \"${title}\",
    \"poster_path\": \"${posterPath}\",
   \"overview\": \"${overview}\",
    \"release_date\": \"${releaseDate}\"`;
    
   // newEntry = newEntry.replace(/\\/g,"\\\\");
    console.log("response from api before :"+  newEntry);
    var newEntryVal = `{${newEntry}}`;
    console.log("response from api before newEntryVal:"+  newEntryVal);
  //   var array = new Array(newEntry);
  //   for(var i=0;i<moviesList.length;i++){
  //     array.push(JSON.stringify(moviesList[i]));
  //   }

  //   console.log("response from api after :"+  array);
  //  var data = `{results:[${array}]}`;
  //   console.log("final data to be send: "+data);
    //Add new entry to collection 
    fetch(url, {
          method: 'POST', // or 'PUT'
         // body: JSON.stringify(newEntryVal), // data can be `string` or {object}!
         body: JSON.stringify({title:title,poster_path:posterPath,overview:overview,release_date:releaseDate}),
         headers:{
           'Accept': 'application/json, text/plain,*/*',
           'Content-type': 'application/json'
         }
          
        })
        .then((res) => res.json())
        .then(function(data){
          console.log('Success:', data);
          console.log("New entry has beed updated");
          getAllMoviewCollection(); //to update collection sections
        })
        .catch(error => console.error('Error:', error));
   })
  .catch(function(error) {
    console.log(error);
  });   

}
function getAllMoviewCollection(){
  console.log("Inside getAllMoviewCollection method .............")

    const actionurl = 'http://localhost:8080/Action';
    const adventureurl = 'http://localhost:8080/Adventure';
    const comicurl = 'http://localhost:8080/Comic';
    console.log("Composed actionurl is: "+actionurl+" adventureurl: "+adventureurl+" comicurl: "+comicurl);
   fetch(actionurl)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data;

    console.log("response from api:"+  moviesList);

    var type ="action";
    var count = 4;
    var length = moviesList.length;
    if(count<length){
      length = count;
    }
    const currentActionList =  document.getElementById("ActionList"); 
    while (currentActionList.firstChild) {
      currentActionList.removeChild(currentActionList.firstChild);
    }
    for(var i=0;i<length;i++){
      createMovieColletionList(type,moviesList[i]);
    }
    
  })
  .catch(function(error) {
    console.log(error);
  });   

  fetch(adventureurl)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data;

    console.log("response from api:"+  moviesList);

    var type ="adventure";
    var count = 4;
    var length = moviesList.length;
    if(count<length){
      length = count;
    }
    const currentAdventureList =  document.getElementById("AdventureList"); 
    while (currentAdventureList.firstChild) {
      currentAdventureList.removeChild(currentAdventureList.firstChild);
    }
    for( var i=0;i<length;i++){
      createMovieColletionList(type,moviesList[i]);
    }
  })
  .catch(function(error) {
    console.log(error);
  });   
  
  fetch(comicurl)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data;

    console.log("response from api:"+  moviesList);
    var type ="comic";
    var count = 4;
    var length = moviesList.length;
    if(count<length){
      length = count;
    }
    const currentComicList =  document.getElementById("ComicList"); 
    while (currentComicList.firstChild) {
      currentComicList.removeChild(currentComicList.firstChild);
    }
    for(var i=0;i<length;i++){
      createMovieColletionList(type,moviesList[i]);
    }
  })
  .catch(function(error) {
    console.log(error);
  });   
}

function createMovieColletionList(collectionType,movie){
  console.log("collectionType :"+collectionType);
  var currentPopListId = null;
  if(collectionType === 'action'){
     currentPopListId =  document.getElementById("ActionList");
  }else if(collectionType === 'adventure'){
     currentPopListId =  document.getElementById("AdventureList");
  }else if(collectionType === 'comic'){
     currentPopListId =  document.getElementById("ComicList");
  }
  
  console.log("current movie :"+ movie);
  let li = document.createElement('li'),
      card = document.createElement('div'),
      img = document.createElement('img'),
      info = document.createElement('div'),
      h5 = document.createElement('h5'),
      h6 = document.createElement('h6');
     
      
  img.src = "https://image.tmdb.org/t/p/w185"+movie.poster_path;
  img.alt = movie.title;
  img.classList.add("collImage");


  h6.innerHTML = movie.release_date;
  h6.classList.add("card-subtitle", "mb-2", "text-muted");

  h5.innerHTML = movie.title;
  h5.classList.add("card-title");

  card.classList.add("d-flex","flex-row", "collectionCard");
  info.classList.add("ml-2");

  info.appendChild(h5);
  info.appendChild(h6);
  card.appendChild(img);
  card.appendChild(info);
  li.appendChild(card);

  currentPopListId.appendChild(li);
}

// function addToListEventHandler(posterPath,title,overview,releaseDate){

// }
function displayCompleteList(type){
  console.log("Inside displayCompleteList method .............")
  clearfilterAndSearchedList();
  if(type ==="action"){
          const actionurl = 'http://localhost:8080/Action';
          console.log("Composed actionurl is: "+actionurl);
          fetch(actionurl)
          .then((resp) => resp.json())
          .then(function(data) {
        
            let moviesList = data;
        
            console.log("response from api:"+  moviesList);
            const currentPopListId =  document.getElementById("popMovieSec"); 
            while (currentPopListId.firstChild) {
              currentPopListId.removeChild(currentPopListId.firstChild);
            }
            var type ="action";
            var length = moviesList.length;
            var popularMovies =  document.getElementById("popularMovies");
            if(popularMovies !==null){
              popularMovies.innerHTML="Action Movies";
            }
            
            for(var i=0;i<length;i++){
              createMovieDetailElements(moviesList,i,"");
            }
           
          })
          .catch(function(error) {
            console.log(error);
          });   
  }else if(type ==="adventure"){
          const adventureurl = 'http://localhost:8080/Adventure';
          console.log("Composed adventureurl: "+adventureurl);
          fetch(adventureurl)
        .then((resp) => resp.json())
        .then(function(data) {

          let moviesList = data;

          console.log("response from api:"+  moviesList);
          const currentPopListId =  document.getElementById("popMovieSec"); 
          while (currentPopListId.firstChild) {
            currentPopListId.removeChild(currentPopListId.firstChild);
          }
          var type ="adventure";
          var length = moviesList.length;
          for( var i=0;i<length;i++){
            createMovieDetailElements(moviesList,i,"");
          }
          var popularMovies =  document.getElementById("popularMovies");
          if(popularMovies !==null){
          popularMovies.innerHTML="Adventure Movies";
          }
        })
        .catch(function(error) {
          console.log(error);
        });   
  }else if(type === "comic"){
        const comicurl = 'http://localhost:8080/Comic';
        console.log("Composed comicurl: "+comicurl);
        fetch(comicurl)
      .then((resp) => resp.json())
      .then(function(data) {

        let moviesList = data;
        console.log("response from api:"+  moviesList);
        const currentPopListId =  document.getElementById("popMovieSec"); 
        while (currentPopListId.firstChild) {
          currentPopListId.removeChild(currentPopListId.firstChild);
        }
        var type ="comic";
        var length = moviesList.length;
        for(var i=0;i<length;i++){
          createMovieDetailElements(moviesList,i,"");
        }
        var popularMovies =  document.getElementById("popularMovies");
        if(popularMovies !==null){
        popularMovies.innerHTML="Comic Movies";
        }
      })
      .catch(function(error) {
        console.log(error);
      });   
    }
    
}

function clearfilterAndSearchedList(){
  var searchResultList =  document.getElementById("searchResult"); 
    while (searchResultList.firstChild) {
      searchResultList.removeChild(searchResultList.firstChild);
    }
    var searchedMoviesList =  document.getElementById("searchedMovies"); 
    while (searchedMoviesList.firstChild) {
      searchedMoviesList.removeChild(searchedMoviesList.firstChild);
    }
}

function getAllSearchResult(){
  var value = document.getElementById("searchBar").value;
  var searchurl1 = 'https://api.themoviedb.org/3/search/movie?api_key=aef122b97215b0783d385328924c3a26&language=en-US&query=';
  var searchurl2 ='&page=1&include_adult=false';
  var finalSearchUrl = searchurl1.concat(value).concat(searchurl2);
 // const finalSearchUrl ='https://api.themoviedb.org/3/search/movie?api_key=aef122b97215b0783d385328924c3a26&language=en-US&query=aven&page=1&include_adult=false';
  console.log("Composed finalSearchUrl: "+finalSearchUrl);
  fetch(finalSearchUrl)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data.results;
    console.log("response from api:"+  moviesList);
    var searchResultList =  document.getElementById("searchResult"); 
    searchResultList.style.display ="grid";
    searchResultList.style.height = "190px";
    searchResultList.style.overflow ="hidden";
    searchResultList.style.marginLeft = "40px";

    while (searchResultList.firstChild) {
      searchResultList.removeChild(searchResultList.firstChild);
    }
    var length = moviesList.length;
    for(var i=0;i<length;i++){
      let li = document.createElement('li'),
          h6 = document.createElement('h6');
          h6.innerHTML=moviesList[i].title;
          li.appendChild(h6);
          searchResultList.appendChild(li);
    }
  })
  .catch(function(error) {
    console.log(error);
  });   
}
function displayAllSearchedResult(){
  var value = document.getElementById("searchBar").value;
  var searchurl1 = 'https://api.themoviedb.org/3/search/movie?api_key=aef122b97215b0783d385328924c3a26&language=en-US&query=';
  var searchurl2 ='&page=1&include_adult=false';
  var finalSearchUrl = searchurl1.concat(value).concat(searchurl2);
  console.log("Composed finalSearchUrl: "+finalSearchUrl);
  var searchResultList =  document.getElementById("searchResult"); 
  while (searchResultList.firstChild) {
  searchResultList.removeChild(searchResultList.firstChild);
  }
  var searchedMoviesList =  document.getElementById("searchedMovies"); 
  while (searchedMoviesList.firstChild) {
  searchedMoviesList.removeChild(searchedMoviesList.firstChild);
  }
  fetch(finalSearchUrl)
  .then((resp) => resp.json())
  .then(function(data) {

    let moviesList = data.results;
    console.log("response from api:"+  moviesList);
    
    
    var length = moviesList.length;
    for(var i=0;i<moviesList.length;i++){

      createMovieDetailElements(moviesList,i,"search");
      }
      searchResultList.style.display ="none";
      var searchHeader =  document.getElementById("searchHeader"); 
      searchHeader.style.display ="grid";

  })
  .catch(function(error) {
    console.log(error);
  });  

 
  
}
export {getPopularMovies,getAllMoviewCollection,displayCompleteList,getAllSearchResult,displayAllSearchedResult};