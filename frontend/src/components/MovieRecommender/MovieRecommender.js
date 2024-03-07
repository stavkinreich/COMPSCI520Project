import React from 'react';
import styles from './MovieRecommender.module.css';

// Mock dataset
const movies = [
  {
    id: 1,
    title: 'Movie Title 1',
    description: 'This is a brief description of Movie 1.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Movie Title 2',
    description: 'This is a brief description of Movie 2.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    title: 'Movie Title 3',
    description: 'This is a brief description of Movie 3.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  // Add more movies as needed
];

export default function MovieRecommender() {
  return (
    <div className={styles.movieRecommender}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieCard}>
          <img src={movie.posterUrl} alt={movie.title} />
          <div className={styles.content}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


