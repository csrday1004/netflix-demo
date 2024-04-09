import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({title, movies, responsive}) => {

  return (
    <div>
      <h3 style={{ textAlign: "left" }}>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {movies.map((movie, index) => {
          return <MovieCard movie={movie} index={index} key={index} />;
        })}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
