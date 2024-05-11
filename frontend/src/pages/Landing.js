import React from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import styles from '../components/MovieRecommender/MovieRecommender.module.css';
import SearchMovie from './SearchMovie';
import Checkbox from './Checkbox.js';


function Landing() {
  return (
    <div >
      <Header/>
      <div className={styles.rowC}>
          <div className={styles.leftComp}>
              <ScrollableSection>
                  <SearchMovie />
              </ScrollableSection>
          </div>
          <div className={styles.rightComp}>
          <ScrollableSection>
              {/*<MovieRecommender/>*/}
              <Checkbox />
          </ScrollableSection>
          </div>
      </div>
      {/* <Footer /> */}
    </div>
);
}

export default Landing;