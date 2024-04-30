import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
    <header className={styles.header}>
    <h1>Movie Recommender</h1>
      <div className={styles.right}>{globalThis.userName === null || globalThis.userName === undefined ?
      <Link to="/Login">Login/Register</Link> : <h3>Hello, {globalThis.userName}</h3>}</div>
    </header>
  </div>
  );
}

