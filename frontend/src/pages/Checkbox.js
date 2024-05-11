import React, { useState } from 'react';
import './UserLogin.js';
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js';

const PreferencesForm = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([])

  const genres = [
    "Action", "Adventure", "Comedy", "Horror", "Romance", "Science Fiction"
  ];

  const languages = [
    "English", "Hindi", "French", "Spanish", "Italian", "Mandarin", "Japanese"
  ];

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter(genre => genre !== value));
    }
  };

  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(language => language !== value));
    }
  };

    const handleSubmit = () => {
      // Prepare data to send to the backend
      const formData = {
        selectedGenres: selectedGenres,
        selectedLanguages: selectedLanguages,
        selectedMovies: globalThis.prefMov
      };

      console.log("Selected Genres:", selectedGenres);
      console.log("Selected Languages:", selectedLanguages);
      console.log("Selected Movies:", globalThis.prefMov);
      // Make an HTTP POST request to the backend using fetch
      fetch('http://127.0.0.1:5000/submit-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data);
        let result = [];
        for(let i = 0; i < data.length; i++) {
            let curObj = {id: i + 1};
            curObj["posterUrl"] = "https://image.tmdb.org/t/p/original/" + data[i]["poster_path"];
            curObj["title"] = data[i]["original_title"];
            curObj["description"] = data[i]["overview"];
            curObj["mov_id"] = data[i]["id"]
            result.push(curObj)
        }
        setSearchedMovies(result)
      })
      .catch(error => {
        console.error('Error submitting preferences:', error.message);
      });
    };

  return (
    <div>
      <div>
        <h2>Select your preferences</h2>
        <div>
          <h3>Genres:</h3>
          {genres.map(genre => (
            <div key={genre}>
              <input
                type="checkbox"
                value={genre}
                onChange={handleGenreChange}
              />
              <label>{genre}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>Languages:</h3>
          {languages.map(language => (
            <div key={language}>
              <input
                type="checkbox"
                value={language}
                onChange={handleLanguageChange}
              />
              <label>{language}</label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
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
};

export default PreferencesForm;
