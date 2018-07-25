export class CollectionService{
    constructor(){

    }
    getDataFromServer(collectionType){
        console.log("Inside getDataFromServer method .............")
      
        const url = 'http://localhost:8080/'+collectionType;

        console.log("Composed url is: "+url);
        let response = fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
        
            let moviesList = data;
            return moviesList;
        })
        .catch(function(error) {
            console.log(error);
        });
        return response.then(function(value){
            return value;
        })  
    }

     deleteMovieFromList(movieId,currentListType){
        console.log("inside deleteMovieFromList :movieId"+movieId+" currentListType"+currentListType);
        let url=null;
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
                //getAllMoviewCollection(); //to update all collections after deletion
                //displayCompleteList(currentListType); // to update current opened collection view
              })
              .catch(error => console.error('Error:', error));
        //  })
        // .catch(function(error) {
        //   console.log(error);
        // });   
      
      
      
      }
}