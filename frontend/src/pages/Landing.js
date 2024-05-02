import React from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import styles from '../components/MovieRecommender/MovieRecommender.module.css';
import SearchMovie from './SearchMovie';
//issue with category container currently- basically should be horizontally scrollable row, like on netflix

const genres = ['Action', 'Comedy', 'Horror', 'Romance', 'Sci-Fi', 'Adventure'];
const languages = ['English', 'French', 'German', 'Spanish', 'Japanese'];

genres.sort();
languages.sort();

function Landing() {
  return (
      <div >
        <Header/>
        <div className={styles.rowC}>
            <div className={styles.leftComp}>
                <ScrollableSection>
                    <SearchMovie />
                    <div className={styles.filterSection}>
                        <div className={styles.genreFilter}>
                            <h3>Genres</h3>
                            {genres.map(genre => (
                                <div key={genre} className={styles.checkboxContainer}>
                                    <input type="checkbox" id={genre} name={genre} />
                                    <label htmlFor={genre}>{genre}</label>
                                </div>
                                ))}
                        </div>
                        <div className={styles.languageFilter}>
                            <h3>Languages</h3>
                            {languages.map(language => (
                                <div key={language} className={styles.checkboxContainer}>
                                    <input type="checkbox" id={language} name={language} />
                                    <label htmlFor={language}>{language}</label>
                                </div>
                                ))}
                        </div>
                        <div className={styles.favoriteMovies}>
                            <h3>Favorited Movies</h3>
                        </div>
                    </div>
                </ScrollableSection>
            </div>
            <div className={styles.rightComp}>
            <ScrollableSection>
                <MovieRecommender/>
            </ScrollableSection>
            </div>
        </div>
      </div>
  );
}

export default Landing;