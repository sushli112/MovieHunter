export default class CollectionService {
  getDataFromServer(collectionType) {
    console.log('Inside getDataFromServer method .............');

    const url = `http://localhost:8080/${collectionType}`;

    console.log(`Composed url is: ${url}`);
    const response = fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        const moviesList = data;
        return moviesList;
      })
      .catch((error) => {
        console.log(error);
      });
    return response.then(value => value);
  }

  deleteMovieFromList(movieId, currentListType) {
    console.log(`inside deleteMovieFromList :movieId${movieId} currentListType${currentListType}`);
    let url = null;
    if (currentListType === 'action') {
      url = `http://localhost:8080/Action/${movieId}`;
    } else if (currentListType === 'adventure') {
      url = `http://localhost:8080/Adventure/${movieId}`;
    } else if (currentListType === 'comic') {
      url = `http://localhost:8080/Comic/${movieId}`;
    }


    fetch(url, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Success:', data);
        console.log('entry has beed deleted');
      })
      .catch(error => console.error('Error:', error));
  }
}
