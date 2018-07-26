export default class HeaderService {
  displayAllSearchedResult() {
    const searchvalue = document.getElementById('searchBar').value;
    const searchurl1 = 'https://api.themoviedb.org/3/search/movie?api_key=aef122b97215b0783d385328924c3a26&language=en-US&query=';
    const searchurl2 = '&page=1&include_adult=false';
    const finalSearchUrl = searchurl1.concat(searchvalue).concat(searchurl2);
    console.log(`Composed finalSearchUrl: ${finalSearchUrl}`);

    const response = fetch(finalSearchUrl)
      .then(resp => resp.json())
      .then((data) => {
        const moviesList = data.results;
        console.log(`response from api:${moviesList}`);
        return moviesList;
      })
      .catch((error) => {
        console.log(error);
      });

    return response.then(value => value);
  }

  createCollListElement(movie, movieListHtml) {
    movieListHtml = `${movieListHtml}
        <li >
        <div class="d-flex flex-row collectionCard">
            <img class="collImage" src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
            <div class="ml-2">
                <h5 class="card-title">${movie.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>
            </div>
        </div>
    </li>`;
    return movieListHtml;
  }

  saveToCollection(title, posterPath, overview, releaseDate, selectedVal) {
    let url = null;
    if (selectedVal === 'action') {
      url = 'http://localhost:8080/Action';
    } else if (selectedVal === 'adventure') {
      url = 'http://localhost:8080/Adventure';
    } else if (selectedVal === 'comic') {
      url = 'http://localhost:8080/Comic';
    }

    fetch(url, {
      method: 'POST', // or 'PUT'
      // body: JSON.stringify(newEntryVal), // data can be `string` or {object}!
      body: JSON.stringify({
        title, poster_path: posterPath, overview, release_date: releaseDate,
      }),
      headers: {
        Accept: 'application/json, text/plain,*/*',
        'Content-type': 'application/json',
      },

    })
      .then(res => res.json())
      .then((data1) => {
        console.log('Success:', data1);
        console.log('New entry has beed updated');
        // getAllMoviewCollection(); //to update collection sections
      })
      .catch(error => console.error('Error:', error));
  }
}
