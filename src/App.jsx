
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import MovieList from './components/movieList';
import MovieListHeading from './components/movieHeading';
import SearchBox from './components/searchBox';
import AddFavourites from './components/addFavriotes';
import RemoveFavourites from './components/removeFavourites';


function App() {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites]=useState([]);
  const [searchValue, setSearchValue]=useState("");

  async function getMovieRequest(){
    let url = ('http://www.omdbapi.com/?s='+searchValue+'.&apikey=d87a97bf');
    const response = await fetch(url);
    const responseJson= await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);

    }
    
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFavourites=JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites);
  },[]);

  function saveToLocalStorage(items){
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))

  }

  function addFavouriteMovie(movie){
    const  newFavouriteList=[...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  function removeFavourites(movie){
    const newFavouriteList = favourites.filter((favourite)=>favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className=" movie-app container-fluid ">
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading="Movies" />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

    </div>
      <div className="row ">
        <MovieList movies={movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading="Favourites" />
    </div>
    <div className="row ">
        <MovieList 
        movies={favourites}
         handleFavouriteClick={removeFavourites} 
         favouriteComponent={RemoveFavourites} />
      </div>
    </div>)
}

export default App;
