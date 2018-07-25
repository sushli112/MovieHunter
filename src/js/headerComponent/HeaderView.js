import {GenerateTemplateUtil} from '../Common/GenerateTemplateUtil';
import { GenerateStaticContent } from '../Common/GenerateStaticContent';
export class HeaderView{
    constructor(){
    this.generateTemplateUtil = new GenerateTemplateUtil();
    this.generateStaticContent = new GenerateStaticContent();
    }
    createHeaderComponent()
    {
            console.log("inside createHeaderComponent method");
        const headerTemplate =`<nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" id="compName" href="#">
            MovieHunter
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                Menu
            </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#" id="home">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>

            </ul>
            <button type="submit" class="btn btn-secondary ml-2" data-toggle="modal" data-target="#modalLoginForm">Login</button>
            <button type="submit" class="btn btn-secondary ml-2" data-toggle="modal" data-target="#modalSignupForm">SignUp</button>
        </div>
        </nav>
        <section class="container searchSection">
        <form class="searchForm form-inline active-cyan-4 ml-5">
            <input class="form-control form-control-sm mr-3 w-75" id="searchBar" type="text" placeholder="Search" aria-label="Search">
            <a href="#" id="searchIcon">
                <i class="fa fa-search" aria-hidden="true"></i>
                <span class="sr-only">Search Icon</span>
            </a>
        </form>
        <ul id="searchResult" class="gridList">

        </ul>
        </section>`;

        let headerTemp =  this.generateTemplateUtil.createAllChildHTMLElement(headerTemplate);
        let headerTemplte = headerTemp;
       // document.getElementById("header").appendChild(headerTemp);
        return headerTemplte;
}

createSearchedSectionmoviesList(moviesList)
{
    const SearchHeader =`<h4 id="popularMovies" class="pt-2">Search List</h4>`;
    const SearchTemplate =`<div class="SearchedMoviesContainer row" id="searchMovSec">

    </div>`;
    const buttonsTemplate=`  <button class="btn btn-secondary float-left ml-5" id="previous">Previous</button>
    <button class="btn btn-secondary float-right" id="next">Next</button>`
  

    const popTemplate = this.generateTemplateUtil.createAllChildHTMLElement(SearchTemplate);
    const searchMovSec = popTemplate.querySelector('#searchMovSec');
    moviesList.forEach(movie => {
        searchMovSec.appendChild( this.createCardElement(movie));
    });
    searchMovSec.appendChild( this.generateStaticContent.createModelTemplate());
    let section = document.getElementById("searchSection");
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(SearchHeader));
    section.appendChild(searchMovSec);
    section.appendChild(this.generateTemplateUtil.createAllChildHTMLElement(buttonsTemplate));
    console.log("search section content:"+section.innerHTML);
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
      movieDesc.innerHTML =movie.overview;
  
      }
    return cardElement;
}
}