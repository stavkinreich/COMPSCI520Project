import React from 'react';
import Header from './components/Header/Header.js'
import Navbar from './components/Navbar/Navbar.js'
import Footer from './components/Footer/Footer.js'
import MovieRecommender from './components/MovieRecommender/MovieRecommender';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function Landing() {
  return (
      <div >
            <Header/>
            <Navbar />
            <Footer />
            <MovieRecommender />
      </div>
  );
}

export default Landing;