import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div>
    <header className={styles.header}>
      <h1>Movie Recommender</h1>
      {/* Search bar or other elements */}
    </header>
  </div>
  );
}

