export class PopularListService{

 getPopularMovies(pageNUmber) 
  {
        console.log("Inside getPopularMovies method .............")
        let list =null;
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=aef122b97215b0783d385328924c3a26&language=en-US&page='+pageNUmber;
        console.log("Composed url is: "+url);
       let response = fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {

           let moviesList = data.results;
            console.log("movielist size from TMDB:" + moviesList.length );
            return moviesList;

        })
        .catch(function(error) {
            console.log(error);
        }); 
         return response.then(function(value){
              return value;
         });
}

saveToCollection(title,posterPath,overview,releaseDate,selectedVal)
{
 let url= null;
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
         // getAllMoviewCollection(); //to update collection sections
        })
        .catch(error => console.error('Error:', error));
   })
  .catch(function(error) {
    console.log(error);
  });   

}

createCollListElement(movie, movieListHtml)
    {
        movieListHtml =`${movieListHtml}
        <li >
        <div class="d-flex flex-row collectionCard">
            <img class="collImage" src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
            <div class="ml-2">
                <h5 class="card-title">${movie.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${ movie.release_date}</h6>
            </div>
        </div>
    </li>`
    return movieListHtml;
    }
}
