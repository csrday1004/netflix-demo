import React from "react";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import Spinner from "react-bootstrap/Spinner";
const UpcomingMoviesSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return ;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{}}>
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
        rating={false}
      />
    </div>
  );
};

export default UpcomingMoviesSlide;
