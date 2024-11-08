import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../src/App.css"; // Import custom CSS for additional styling
import StripePayment from "./components/StripePayment.jsx";
// import Navbar from "./components/Navbar.jsx";
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
    <>
     {/* <Navbar/> */}
    {/* <div className="App container mt-5">
     
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
    </div> */}
    <div className="App container mt-5">
  <h1 className="text-center mb-4">Movie List</h1>
  <div className="row">
    {movies.map((movie) => (
      <div key={movie._id} className="col-12 col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm border-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="card-img-top rounded-top"
            style={{ height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-primary">{movie.title}</h5>
            <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
              {movie.description}
            </p>
            <div className="mt-auto">
              <StripePayment />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default App;
