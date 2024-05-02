import React from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import styles from '../components/MovieRecommender/MovieRecommender.module.css';
import SearchMovie from './SearchMovie';
//issue with category container currently- basically should be horizontally scrollable row, like on netflix

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
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="action" name="action"/>
                                <label htmlFor="action">Action</label>
                            </div>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="comedy" name="comedy"/>
                                <label htmlFor="comedy">Comedy</label>
                            </div>
                            
                        </div>
                        <div className={styles.languageFilter}>
                            <h3>Languages</h3>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="english" name="english"/>
                                <label htmlFor="english">English</label>
                            </div>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="spanish" name="spanish"/>
                                <label htmlFor="spanish">Spanish</label>
                            </div>
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
        {/* <Footer /> */}
      </div>
  );
}

export default Landing;