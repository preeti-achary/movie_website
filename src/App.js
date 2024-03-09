import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './component/MovieList';
import MovieListHeading from './component/MovieListHeading';
import SearchBox from './component/SearchBox';
import AddFavorites from './component/AddFavorites';
import RemoveFavorites from './component/RemoveFavorites';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
    
const getMovieRequest = async (searchValue) =>{
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1fad6cf5`;

  const response = await fetch(url);
  const responseJson = await response.json();

  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
};

useEffect(()=> {
    getMovieRequest(searchValue);
}, [searchValue]);


const saveToLocalStorage = (items) => {
  localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
};

const AddFavoriteMovie = (movie) => {
  const newFavoritesList = [...favorites, movie];
  setFavorites(newFavoritesList);
  saveToLocalStorage(newFavoritesList);
}

const removeFavoriteMovie = (movie) => {
  const newFavoritesList = favorites.filter(
    (favorite) => favorite.imdbID !== movie.imdbID
  );

setFavorites(newFavoritesList);
saveToLocalStorage(newFavoritesList);

}

return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
       <MovieList 
       movies={movies}
       handleFavoritesClick={AddFavoriteMovie}
       favoriteComponent={AddFavorites}
       />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
       <MovieList
       movies={favorites} 
       handleFavoritesClick={removeFavoriteMovie}
       favoriteComponent={RemoveFavorites}
       />
      </div>
    </div>
  );
}

export default App;
