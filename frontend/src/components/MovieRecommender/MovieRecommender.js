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
  {
    id: 4,
    title: 'Movie Title 4',
    description: 'This is a brief description of Movie 4.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    title: 'Movie Title 5',
    description: 'This is a brief description of Movie 5.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    title: 'Movie Title 6',
    description: 'This is a brief description of Movie 6.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    title: 'Movie Title 7',
    description: 'This is a brief description of Movie 7.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 8,
    title: 'Movie Title 8',
    description: 'This is a brief description of Movie 8.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 9,
    title: 'Movie Title 9',
    description: 'This is a brief description of Movie 9.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 10,
    title: 'Movie Title 10',
    description: 'This is a brief description of Movie 10.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 11,
    title: 'Movie Title 11',
    description: 'This is a brief description of Movie 11.',
    posterUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 12,
    title: 'Movie Title 12',
    description: 'This is a brief description of Movie 12.',
    posterUrl: 'https://via.placeholder.com/150'
  }
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


