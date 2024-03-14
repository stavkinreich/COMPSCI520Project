import React from 'react';
import Header from '../components/Header/Header.js'
import Navbar from '../components/Navbar/Navbar.js'
import Footer from '../components/Footer/Footer.js'
import MovieRecommender from '../components/MovieRecommender/MovieRecommender.js'
import ScrollableSection from '../components/ScrollableSection/ScrollableSection.js'
//issue with category container currently- basically should be horizontally scrollable row, like on netflix

function Landing() {
  return (
      <div >
        <Header/>
        <Navbar />
        <ScrollableSection>
          <MovieRecommender />
          <MovieRecommender />
          <MovieRecommender />
          <MovieRecommender />
        </ScrollableSection>
        {/* <Footer /> */}
      </div>
  );
}

export default Landing;