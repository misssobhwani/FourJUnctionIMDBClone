// AddMovie.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../features/movieSlice';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    year : new Date().getFullYear(),
    producer: '',
    actors: [''],
  });

  const [errors, setErrors] = useState({
    title: '',
    year: '',
    producer: '',
    actors: '',
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      year: '',
      producer: '',
      actors: '',
    };
  
    let isValid = true;
  
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
  
    // Year validation
    const currentYear = new Date().getFullYear();
    if (!formData.year || isNaN(formData.year) || formData.year < 1900 || formData.year > currentYear) {
      newErrors.year = `Enter a valid year between 1900 and ${currentYear}`;
      isValid = false;
    }
  
    // Producer validation (no numbers)
    if (!formData.producer.trim()) {
      newErrors.producer = 'Producer name is required';
      isValid = false;
    } else if (/\d/.test(formData.producer)) {
      newErrors.producer = 'Producer name should not contain numbers';
      isValid = false;
    }
  
    // Actors validation (at least one, no numbers in names)
    if (!formData.actors.length || formData.actors.every(actor => !actor.trim())) {
      newErrors.actors = 'At least one actor is required';
      isValid = false;
    } else if (formData.actors.some(actor => /\d/.test(actor))) {
      newErrors.actors = 'Actor names should not contain numbers';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newMovie = {
      id: Date.now().toString(),
      title: formData.title,
      year: Number(formData.year),
      producer: formData.producer,
      actors: formData.actors,
    };

    dispatch(addMovie(newMovie));

    const updatedMovies = JSON.stringify(formData); 
    localStorage.setItem('movies', updatedMovies);

    navigate('/');
  };

  // const handleSave = () => {

  //   if (!validateForm()) return;

  //   const newMovie = {
  //     id: Date.now().toString(), // Generate a unique ID
  //     title: formData.title,
  //     year: formData.year,
  //     producer: formData.producer,
  //     actors: formData.actors,
  //   };

  //   // Dispatch the action to add the new movie
  //   dispatch(addMovie(newMovie));

  //   //save the updated movie list to localStorage
  //   const updatedMovies = JSON.stringify(formData); 
  //   localStorage.setItem('movies', updatedMovies);

  //   // Redirect to the movie list page after saving
  //   navigate('/');
  // };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Producer</label>
          <input
            type="text"
            name="producer"
            value={formData.producer}
            onChange={handleChange}
          />
          {errors.producer && <p style={{ color: 'red' }}>{errors.producer}</p>}
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
          {errors.actors && <p style={{ color: 'red' }}>{errors.actors}</p>}
        </div>
        <button type="button" onClick={handleSave}>
          Save Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
