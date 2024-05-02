import React, { useState } from 'react';
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'

function SearchMovie() {
  const [keyword, setKeyword] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([])
  const handleSearch = (event) => {
    event.preventDefault();
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNkNGQxYmE3YTU4YjE1MTM4MzVkOTM1YjI2YjJiZSIsInN1YiI6IjY1ZTc4OWY5NTFmOTlhMDE2MmZiYjc1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vnaq5VRSoFW0czZA-0ldClHBIEhL-PWg1P7NXFi6VeA'
      }
    };

    fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=' + keyword, options)
      .then(response => response.json())
      .then(response => {
        let result = [];
        for(let i = 0; i < response.results.length; i++) {
            let curObj = {id: i + 1};
            curObj["posterUrl"] = "https://image.tmdb.org/t/p/original/" + response.results[i]["poster_path"];
            curObj["title"] = response.results[i]["original_title"];
            curObj["description"] = response.results[i]["overview"];
            curObj["mov_id"] = response.results[i]["id"]
            result.push(curObj)
        }
        setSearchedMovies(result)
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div>
      <input
        type="text"
        placeholder="Search for Movie"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      {searchedMovies.length !== 0 ?
      (<div>
        <MovieRecommender
            key={new Date().getTime()}
            movies = {searchedMovies}
        />
      </div>) : null}
    </div>
  );
}

export default SearchMovie;
