import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import DisplayMovie from './DisplayMovie.js';
import styles from '../components/MovieRecommender/MovieRecommender.module.css'

function RecommendedMovies({ userPreferences, favoriteMovies }) {

    const [recs, setRecs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedMovie, setSelectedMovie] = useState({})
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
      const genreArr = globalThis.prefGen.map(genre => genre.name);
      setIsEmpty(genreArr.length === 0 && globalThis.prefLang.length === 0 && globalThis.prefMov.length === 0);

        const fetchRecs = async () => {
          if (isEmpty) {
            setIsLoading(false);
          }
            try {
                setIsLoading(true);
                const response = await fetch('http://127.0.0.1:3001/submit-preferences', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        selectedGenres: genreArr,
                        selectedLanguages: globalThis.prefLang,
                        selectedMovies: globalThis.prefMov })
                });
                if (!response.ok) throw new Error('Failed to Fetch');
                const data = await response.json();
                console.log("Fetched Recs:", data);
                setRecs(data.map(movie => ({
                  ...movie,
                  mov_id: movie.id,
                  poster_path: movie.poster_path
                })));
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching recs:", err);
                setError(err.message);
                setIsLoading(false);
            }
        }
        fetchRecs();
    }, [userPreferences, favoriteMovies])

    const handleMovieClick = (mov) => {
      console.log("movie data:", mov);
      const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNkNGQxYmE3YTU4YjE1MTM4MzVkOTM1YjI2YjJiZSIsInN1YiI6IjY1ZTc4OWY5NTFmOTlhMDE2MmZiYjc1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vnaq5VRSoFW0czZA-0ldClHBIEhL-PWg1P7NXFi6VeA'
            }
          };
      if (mov && mov.mov_id) {
        fetch('https://api.themoviedb.org/3/movie/' + mov["mov_id"] +'?language=en-US', options)
          .then(response => response.json())
          .then(response => {
            setSelectedMovie(response);
          })
          .catch(err => console.error(err));
      } else {
        console.error("invalid movie id: ", mov);
      }

    }

    const handleBackClick = () => {
      setSelectedMovie({});
    };

  return (
    <div>
      <Header />
        <ScrollableSection>
          {isLoading ? (
            <p>Loading recommendations...</p>
          ) : error ? (
            <p>Error: {error}</p> 
          ) : isEmpty ? (
            <p>Please add some favorites to see your personalized recommended movies!</p>
          ) : Object.keys(selectedMovie).length === 0 ? (
            <div className={styles.movieRecommender}>
              {recs.map((movie) =>
                <div key={movie.id} className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
                  <img src={movie['poster_path'] = "https://image.tmdb.org/t/p/original" + movie['poster_path']} alt={movie.title} />
                    <div className={styles.content}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                    </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.centerComp}>
              <DisplayMovie key={new Date().getTime()} movie={selectedMovie} />
              <button onClick={handleBackClick} className={styles.backButton}>Back to List</button>
            </div>
          )}
        </ScrollableSection>
    </div>
    );
  }

export default RecommendedMovies;