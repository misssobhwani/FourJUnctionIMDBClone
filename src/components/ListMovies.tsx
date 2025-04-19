import React from 'react'
import { useState, useEffect } from 'react';
import { mockMovies } from '../features/mockData';
import './ListMovies.css'
import { useNavigate } from 'react-router-dom';

const ListMovies = () => {

const navigate = useNavigate();
const [movies, setMovies] = useState<any[]>([]);

useEffect(() => {
  setMovies(mockMovies);
}, []);

const handleEdit = (id: string) => {
  navigate(`/edit/${id}`);
};

const handleAdd = () => {
  navigate('/add');
};

  return (
    <div>
    <h1>Movies List</h1>
    <button onClick={handleAdd}>Add New Movie</button>
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={movie.imageUrl} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Producer:</strong> {movie.producer}</p>
          <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
          <button onClick={() => handleEdit(movie.id)}>Edit</button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ListMovies