import React, {useState, useEffect} from 'react';
import styles from './MovieRecommender.module.css';
import DisplayMovie from "../../pages/DisplayMovie";

export default function MovieRecommender({movies}) {
  const [selectedMovie, setSelectedMovie] = useState({})
  const handleMovieClick = (mov) => {
    const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNkNGQxYmE3YTU4YjE1MTM4MzVkOTM1YjI2YjJiZSIsInN1YiI6IjY1ZTc4OWY5NTFmOTlhMDE2MmZiYjc1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vnaq5VRSoFW0czZA-0ldClHBIEhL-PWg1P7NXFi6VeA'
          }
        };
        fetch('https://api.themoviedb.org/3/movie/' + mov["mov_id"] +'?language=en-US', options)
          .then(response => response.json())
          .then(response => {
            setSelectedMovie(response);
          })
          .catch(err => console.error(err));
  }
  return (
  <div>
    {Object.keys(selectedMovie).length === 0 ?
    <div className={styles.movieRecommender}>
        {movies.map((movie) =>
        <div key={movie.id} className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
          <img src={movie.posterUrl} alt={movie.title} />
          <div className={styles.content}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        </div>)}
    </div> :
    <DisplayMovie
        key={new Date().getTime()}
        movie = {selectedMovie}
    />}
   </div>
  );
}


