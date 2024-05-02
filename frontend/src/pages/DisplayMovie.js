import React, {useState, useEffect} from 'react';
import styles from '../components/MovieRecommender/MovieRecommender.module.css';

function DisplayMovie({movie}) {
    const [isFilled, setIsFilled] = useState(globalThis.prefMovId === null || globalThis.prefMovId === undefined ? false :
        globalThis.prefMovId.includes(movie["imdb_id"]));
    const handleClick = () => {
        if(isFilled) {
            globalThis.prefMovId = globalThis.prefMovId.filter(elem => elem !== movie["imdb_id"]);
            globalThis.prefMov = globalThis.prefMov.filter(elem => elem !== movie["original_title"]);
            globalThis.prefLang = globalThis.prefLang.filter(elem => elem !== movie["original_language"]);
            globalThis.prefGen = globalThis.prefGen.filter(el => !movie["genres"].some(obj => obj["name"] === el));
        }
        else {
            globalThis.prefMovId === null || globalThis.prefMovId === undefined ? globalThis.prefMovId = [movie["imdb_id"]] :
                globalThis.prefMovId.push(movie["imdb_id"]);
            globalThis.prefMov === null || globalThis.prefMov === undefined ? globalThis.prefMov = [movie["original_title"]] :
                globalThis.prefMov.push(movie["original_title"]);
            globalThis.prefLang === null || globalThis.prefLang === undefined ? globalThis.prefLang = [movie["original_language"]] :
                globalThis.prefLang.push(movie["original_language"]);
             globalThis.prefGen === null || globalThis.prefGen === undefined ? globalThis.prefGen = movie["genres"].map(gen => gen["name"]) :
                movie["genres"].map(gen => globalThis.prefGen.push(gen["name"]));
        }
        const newPref = {
          userName: globalThis.userName,
           prefMovId: globalThis.prefMovId,
           prefMov: globalThis.prefMov,
           prefLang: globalThis.prefLang,
           prefGen: globalThis.prefGen
        }
        var request = new Request('http://localhost:3001/api/changePref', {
                                            method: 'POST',
                                            headers: new Headers({'Content-Type': 'application/json'}),
                                            body: JSON.stringify(newPref)
                                        })
                                        fetch(request)
                                            .then(function(response) {
                                                response.json()
                                                    .then(function(data) {
                                                    })
                                             })
      setIsFilled(!isFilled);
      };
    return (
                <div className={styles.movieCardContainer}>
                    <div className={styles.imageContainer}>
                        <div
                            className={styles.bgImage}
                            style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + movie["poster_path"]})` }}
                        />
                    </div>
                    <div className={styles.movieInfo}>
                        {globalThis.userName === null || globalThis.userName === undefined ? null : <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              onClick={handleClick}
                            >
                              <path
                                fill={isFilled ? 'gold' : 'none'}
                                stroke="black" // Add stroke property for black lines
                                strokeWidth="2" // Set stroke width
                                d="M12 2l2.851 8.727h9.148l-7.397 5.376 2.849 8.727-7.401-5.375-7.401 5.375 2.848-8.727-7.398-5.376h9.148z"
                              />
                        </svg>}
                        <h2>Movie Details</h2>
                        <div>
                            <h1>{movie["original_title"]}</h1>
                            <small>Released Date: {movie["release_date"]}</small>
                        </div>
                        <h4>Rating: {movie["vote_average"]} / 10</h4>
                        <p>{movie["overview"] && movie["overview"].substr(0, 350)}</p>
                        <div className={styles.tagsContainer}>
                            {movie["genres"] &&
                                movie["genres"].map(g => (
                                    <span key={g["id"]}>{g["name"]}</span>
                                ))}
                        </div>
                    </div>
                </div>
            );
        }
export default DisplayMovie;