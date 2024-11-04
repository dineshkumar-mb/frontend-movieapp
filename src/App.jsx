import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/App.css"; // Import the CSS file for styling
import StripePayment from './components/StripePayment.jsx';
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://movie-3qhc.onrender.com/movies");
        console.log("Fetched movies:", response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    
    <div className="App">
      <h1 className="app-title">Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <StripePayment />
          </div>
        ))}
      </div>
     
    </div>
      
  );
}

export default App;
