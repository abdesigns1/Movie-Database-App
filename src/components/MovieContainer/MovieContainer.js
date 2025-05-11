// src/components/MovieContainer/MovieContainer.jsx
import React, { useState, useEffect } from 'react';
import ListComponent from '../ListComponent/ListComponent';
import MovieItem from '../MovieItem/MovieItem';
import MovieDetails from '../MovieDetails/MovieDetails';
import './MovieContainer.css';

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  
  // My API SET UP
  const API_KEY = '85b5b9a8791c1ef78bf087e37c13ede3'; // My API KEY
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch movies: ${error.message}`);
        setLoading(false);
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, [API_URL]);
  
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };
  
  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="movie-container">
      <h1>Popular Movies</h1>
      
      {loading && <div className="loading">Loading movies...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        movies.length ? (
          <ListComponent 
            items={movies} 
            renderItem={(movie) => (
              <MovieItem movie={movie} onMovieClick={handleMovieClick} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <div className="no-movies">No movies found</div>
        )
      )}
      
      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
};

export default MovieContainer;