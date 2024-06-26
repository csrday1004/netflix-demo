import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import Spinner from "react-bootstrap/Spinner";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{}}>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
        rating={true}
      />
    </div>
  );
};

export default PopularMovieSlide;
