import React, { useState } from 'react';
import styles from '../components/MovieRecommender/MovieRecommender.module.css';

function SearchMovie() {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    console.log('Search for:', keyword);
  };

  return (
  <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for Movie"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    );
}

export default SearchMovie;
