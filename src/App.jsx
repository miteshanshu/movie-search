import { useEffect, useState } from "react";
import Movies from "./components/Movies";
import "./App.css";

export default function App() {
  const [movieList, setMoviesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  const getMovie = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=8f734eedf212259a50632ac22dbb4f3f`
    );
    const data = await response.json();
    setMoviesList(data.results);
    setFilteredMovies(data.results); // Initialize filteredMovies with all movies
    setLoading(false); // Set loading to false after fetching is done
  };

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    const filtered = movieList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [filteredMovies]); // Run the effect when searchTerm or movieList changes

  const renderMovies = filteredMovies.map((item, index) => {
    return <Movies title={item.title} img={item.poster_path} key={index} />;
  });

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div className="loading">Loading...</div> // Show loading screen when loading
      ) : (
        <div className="moviesGrid">{renderMovies}</div>
      )}
    </div>
  );
}
