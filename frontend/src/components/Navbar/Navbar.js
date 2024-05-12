import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
  </nav>
  );
}
