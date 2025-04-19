// EditMovie.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';  // Correct path for RootState
import { updateMovie } from '../features/movieSlice';
import { validateMovieForm } from '../utils/utils';
import './EditMovie.css';

const EditMovie: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);

  // Use useSelector to access movies state correctly
  const movies = useSelector((state: RootState) => state.movies.movies);  // Correctly accessing the `movies` array
  const movie = movies.filter((movie) => movie.id === id)[0]; // Take the first matching movie, or undefined
  console.log(movies);
  
  const [formData, setFormData] = useState({
    title: '',
    year: 0,
    producer: '',
    actors: [''],
  });

  // If movie exists, populate form fields
  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        year: movie.year,
        producer: movie.producer,
        actors: movie.actors,
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {

  const validationErrors = validateMovieForm(formData);
  if (validationErrors.length > 0) {
    setErrors(validationErrors);
    return;
  }
    if (movie) {
      dispatch(updateMovie({ id: movie.id, ...formData }));
      navigate('/');  // Redirect to the list page after saving
    }
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h2>Edit Movie</h2>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors[0] && <span className="error">{errors[0]}</span>} 
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors[1] && <span className="error">{errors[0]}</span>} 
        </div>
        <div>
          <label>Producer</label>
          <input
            type="text"
            name="producer"
            value={formData.producer}
            onChange={handleChange}
          />
          {errors[2] && <span className="error">{errors[1]}</span>} 
        </div>
        <div>
          <label>Actors</label>
          <input
            type="text"
            name="actors"
            value={formData.actors.join(', ')}
            onChange={(e) =>
              setFormData({ ...formData, actors: e.target.value.split(', ') })
            }
          />
          {errors[3] && <span className="error">{errors[3]}</span>}
        </div>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditMovie;
