import React from "react";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import Spinner from "react-bootstrap/Spinner";
const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return <Spinner/>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{}}>
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
        rating={true}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
