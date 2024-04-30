import React from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
import styles from '../components/MovieRecommender/MovieRecommender.module.css';
//issue with category container currently- basically should be horizontally scrollable row, like on netflix

function Landing() {
  return (
      <div >
        <Header/>
        <div className={styles.rowC}>
            <ScrollableSection>
                <MovieRecommender/>
            </ScrollableSection>
            <ScrollableSection>
                <MovieRecommender/>
            </ScrollableSection>
        </div>
        {/* <Footer /> */}
      </div>
  );
}

export default Landing;