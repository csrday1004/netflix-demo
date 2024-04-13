import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive, rating }) => {
  console.log('무비슬라이더에서 받은 자료들',movies)
  return (
    <div>
      <h3 style={{ textAlign: "left" }}>{title ? title : null}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider"
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {movies.map((movie, index) => {
          console.log('캐러셀에서 맵 돌린 각각의 데이터',movie)
          return <MovieCard movie={movie} index={rating?index:null} key={index} />;
        })}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
