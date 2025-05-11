// src/components/MovieItem/MovieItem.jsx
import React from 'react';
import './MovieItem.css';

const MovieItem = ({ movie, onMovieClick }) => {
  if (!movie) return null;
  
  // TMDB image base URL
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  
  return (
    <div className="movie-item" onClick={() => onMovieClick && onMovieClick(movie.id)}>
      {movie.poster_path && (
        <img 
          src={`${IMG_BASE_URL}${movie.poster_path}`}
          alt={movie.title} 
          className="movie-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      )}
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
          <span className="movie-date">{new Date(movie.release_date).getFullYear()}</span>
        </div>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieItem;