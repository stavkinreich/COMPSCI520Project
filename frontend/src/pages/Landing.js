import React, {useState} from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import RecommendedMovies from './RecommendedMovies.js';
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import styles from '../components/MovieRecommender/MovieRecommender.module.css';
import SearchMovie from './SearchMovie';
//issue with category container currently- basically should be horizontally scrollable row, like on netflix

function Landing() {
  const [trigRender, setTrigRender] = useState(0);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkedLanguage, setCheckedLanguages] = useState([]);

  const genres = globalThis.prefGen === null || globalThis.prefGen === undefined ? [] :
                [...new Set(globalThis.prefGen.map(g => JSON.stringify(g)))].map(g => JSON.parse(g));
  const languages = globalThis.prefLang === null || globalThis.prefLang === undefined ? [] :
                    [...new Set(globalThis.prefLang)];
  console.log(genres)
  console.log(languages)
  console.log(checkedGenres)
  console.log(checkedLanguage)
  const handleCheckLanguageChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setCheckedLanguages([...checkedLanguage, value]);
      } else {
        setCheckedLanguages(checkedLanguage.filter(item => item !== value));
    };
  };



  // const arrayIncludesObject = (array, object) => array.some(item => isEqual(item, object));

  // const handleCheckGenreChange = (event) => {
  //    const checkedId = event.target.value;
  //    if(event.target.checked){
  //     setCheckedGenres([...checkedGenres, JSON.parse(checkedId)])
  //    }else{
  //     setCheckedGenres(checkedGenres.filter(id=> id["id"] !== JSON.parse(checkedId)["id"]))
  //    }
  //    }
     
  const handleCheckGenreChange = (event) => {
    const genre = JSON.parse(event.target.value);
    const isGenreChecked = event.target.checked;
    if(isGenreChecked) {
      if(!checkedGenres.some(g => g.id === genre.id)) {
        setCheckedGenres([...checkedGenres, genre]);
      }
    }
    else {
        setCheckedGenres(checkedGenres.filter(id=> id["id"] !== genre["id"]))
    }
  }

  return (
      <div >
        <Header/>
        <div className={styles.rowC}>
            <div className={styles.leftComp}>
            <ScrollableSection>
                <div className={styles.filterSection}>
                    <div className={styles.genreFilter}>
                        <h3>Genres</h3>
                        {genres.map((genre, index) => (
                            <div key={genre} className={styles.checkboxContainer}>
                                <input
                                   type="checkbox"
                                   value={JSON.stringify(genre)}
                                   checked={checkedGenres.some(elem => elem["id"] === JSON.parse(JSON.stringify(genre))["id"])}
                                   onChange={(event) => { handleCheckGenreChange(event) }}
                                   />
                                   <label htmlFor={`checkbox-${genre.id}`}>{genre.name}</label>
                            </div>
                            ))}
                    </div>
                    <div className={styles.languageFilter}>
                        <h3>Languages</h3>
                        {languages.map((language, index) => (
                            <div key={language} className={styles.checkboxContainer}>
                                <input type="checkbox"
                                id={language}
                                value={language}
                                checked={checkedLanguage.includes(language)}
                                onChange={handleCheckLanguageChange} />
                                <label htmlFor={language}>{language}</label>
                            </div>
                            ))}
                    </div>
                    <button className={styles.searchButton} onClick={() => setTrigRender(trigRender + 1)}>
                                Refresh Preferences
                    </button>
                </div>
            </ScrollableSection>
            </div>
            <div className={styles.rightComp}>
            <ScrollableSection>
                <SearchMovie
                    key={new Date().getTime()}
                    genres = {checkedGenres}
                    languages = {checkedLanguage}
                />
            </ScrollableSection>
            </div>
        </div>
      </div>
  );
}

export default Landing;