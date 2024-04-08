import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";

const MovieCard = ({ movie, index }) => {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="overlay">
        <div>{index + 1}위</div>
        <h4>{movie.title}</h4>
    
          <div>{Number(movie.vote_average).toFixed(1)}점</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "18세이상" : null}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap:"wrap",
              gap: "5px",
            }}
          >
            {movie.genre_ids.map((id, index) => {
              return <Badge bg="danger">{id}</Badge>;
            })}
          </div>

      </div>
    </div>
  );
};

export default MovieCard;
