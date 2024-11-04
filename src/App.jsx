import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css"; // Import custom CSS for additional styling
import StripePayment from "./components/StripePayment.jsx";

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
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Movie List</h1>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={movie.image} alt={movie.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <StripePayment />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
