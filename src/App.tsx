import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ListMovies from './components/ListMovies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditMovie from './components/EditMovie';
import { useDispatch } from 'react-redux';
import  { useEffect } from 'react';
import { setMovies } from './features/movieSlice';
import { mockMovies } from './features/mockData';
import AddMovie from './components/AddMovie';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMovies(mockMovies)); // Dispatch action to populate store with mock data
  }, [dispatch]);

  return (
    <Router>
    <div className="App">
    <Header/>
    {/* <ListMovies/> */}
    {/* Routing */}
    <Routes>
          {/* Home page: List of Movies */}
          <Route path="/" element={<ListMovies />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
