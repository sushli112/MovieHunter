export class HeaderService{
    constructor(){

    }
  
     displayAllSearchedResult(){
        let value = document.getElementById("searchBar").value;
        let searchurl1 = 'https://api.themoviedb.org/3/search/movie?api_key=aef122b97215b0783d385328924c3a26&language=en-US&query=';
        let searchurl2 ='&page=1&include_adult=false';
        let finalSearchUrl = searchurl1.concat(value).concat(searchurl2);
        console.log("Composed finalSearchUrl: "+finalSearchUrl);
       
        let response =fetch(finalSearchUrl)
        .then((resp) => resp.json())
        .then(function(data) {
      
          let moviesList = data.results;
          console.log("response from api:"+  moviesList);
          return moviesList;
      
        })
        .catch(function(error) {
          console.log(error);
        });  
      
        return response.then(function(value){
            return value;
        })  
        
      }
}