import React from "react";
import "./Movies.css";

function Movies({ title, img }) {
  return (
    <div className="moviesPanel">
      <img src={`https://image.tmdb.org/t/p/original/${img}`} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default Movies;
