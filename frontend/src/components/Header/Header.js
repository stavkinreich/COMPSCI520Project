import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
    <header className={styles.header}>

    <h1>Movie Recommender</h1>

      <nav className={styles.navbar}>
        <ul>
          {/* Home button */}
          <li><Link to="/">Home</Link></li>

          {/* Recommended tab for users */}
          {globalThis.userName && <li><Link to="/Recommendations">Recommended</Link></li>}

        </ul>
        <ul className={styles.right}>

          {/* Login button for guests */}
          {globalThis.userName === null || globalThis.userName === undefined ?
          <li><Link to="/Login">Login/Register</Link></li> : <h3>Hello, {globalThis.userName}</h3>}

        </ul>
      </nav>
    </header>
  </div>
  );
}

