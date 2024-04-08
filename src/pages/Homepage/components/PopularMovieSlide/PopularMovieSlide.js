import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import './PopularMovieSlide.style.css'

const PopularMovieSlide = () => {


  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3.5,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{padding:'0px 30px'}}>
      <h3 style={{textAlign:"left"}}>Popular Movies</h3>
      <Carousel
        swipeable={true}
        draggable={true}
        containerClass="carousel-container"
        infinite={true}
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={5000}
        focusOnSelect={true}
      >
        {data.results.map((movie,index)=>{
          return(
            <MovieCard movie={movie} index={index} key={index}/>
          )
        })}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;
