// src/App.jsx
import React from 'react';
import MovieContainer from './components/MovieContainer/MovieContainer';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie & Chill</h1>
      </header>
      
      <main>
        <MovieContainer />
      </main>
      
      <footer className="app-footer">
        <p>Powered by Ab Movie & Chill</p>
      </footer>
    </div>
  );
}

export default App;