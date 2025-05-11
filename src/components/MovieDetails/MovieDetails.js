// src/components/MovieDetails/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = '85b5b9a8791c1ef78bf087e37c13ede3'; // Replace with your TMDB API key
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`;
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch movie details: ${error.message}`);
        setLoading(false);
        console.error('Error fetching movie details:', error);
      }
    };
    
    fetchMovieDetails();
  }, [API_URL, movieId]);
  
  // Close the modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  if (loading) {
    return (
      <div className="movie-details-modal">
        <div className="movie-details-content">
          <button className="close-button" onClick={onClose}>×</button>
          <div className="loading">Loading movie details...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="movie-details-modal">
        <div className="movie-details-content">
          <button className="close-button" onClick={onClose}>×</button>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }
  
  if (!movie) return null;
  
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';
  
  // Get director from crew
  const director = movie.credits?.crew.find(person => person.job === 'Director')?.name || 'Unknown';
  
  // Get top cast members
  const topCast = movie.credits?.cast.slice(0, 5).map(actor => actor.name).join(', ') || 'No cast information';
  
  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Format budget/revenue to millions
  const formatMoney = (amount) => {
    if (!amount) return 'N/A';
    return `$${(amount / 1000000).toFixed(1)}M`;
  };
  
  return (
    <div className="movie-details-modal" onClick={onClose}>
      <div 
        className="movie-details-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: movie.backdrop_path ? 
            `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${BACKDROP_BASE_URL}${movie.backdrop_path})` 
            : 'none'
        }}
      >
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="movie-details-header">
          <div className="movie-poster">
            {movie.poster_path ? (
              <img 
                src={`${IMG_BASE_URL}${movie.poster_path}`} 
                alt={movie.title} 
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
          </div>
          
          <div className="movie-header-info">
            <h2>{movie.title} <span className="movie-year">({new Date(movie.release_date).getFullYear()})</span></h2>
            
            <div className="movie-meta-details">
              <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
              <span className="movie-runtime">{formatRuntime(movie.runtime)}</span>
              <span className="movie-release">{new Date(movie.release_date).toLocaleDateString()}</span>
            </div>
            
            <div className="movie-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            
            {movie.tagline && <blockquote className="movie-tagline">{movie.tagline}</blockquote>}
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
        
        <div className="movie-additional-info">
          <div className="movie-crew">
            <div className="crew-item">
              <h4>Director</h4>
              <p>{director}</p>
            </div>
            
            <div className="crew-item">
              <h4>Cast</h4>
              <p>{topCast}</p>
            </div>
          </div>
          
          <div className="movie-stats">
            <div className="stat-item">
              <h4>Budget</h4>
              <p>{formatMoney(movie.budget)}</p>
            </div>
            
            <div className="stat-item">
              <h4>Revenue</h4>
              <p>{formatMoney(movie.revenue)}</p>
            </div>
            
            <div className="stat-item">
              <h4>Language</h4>
              <p>{movie.original_language?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;