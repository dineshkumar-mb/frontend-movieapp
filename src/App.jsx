import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StripePayment from "./components/StripePayment.jsx";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from "@mui/material";
// import Navbar from "./components/Navbar.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8; // Adjusted for better pagination with 4 items per row

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://movie-3qhc.onrender.com/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="App">
      {/* <Navbar/> */}
      <Container maxWidth="lg" className="container">
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: "20px" }}>
          Movie List
        </Typography>
        <Grid container spacing={4}>
          {currentMovies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={3}>
              <Card elevation={3} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.image}
                  alt={movie.title}
                  style={{ objectFit: "cover" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {movie.description}
                  </Typography>
                </CardContent>
                <StripePayment />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ display: "flex", justifyContent: "center", marginTop: "20px", paddingBottom: "20px" }}
        />
      </Container>
    </div>
  );
}

export default App;
