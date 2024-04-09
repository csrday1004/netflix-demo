import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import UpcomingMoviesSlide from "./components/UpcomingMoviesSlide/UpcomingMoviesSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";

// 배너 만들기(top popular movie중 첫번째 아이템 보여주기)
// popular movie
// top rated movie
// upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMoviesSlide />
    </div>
  );
};

export default Homepage;
