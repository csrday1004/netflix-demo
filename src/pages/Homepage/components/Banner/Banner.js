import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import './Banner.style.css';

const Banner = () => {

  const [viewAll, setViewAll] = useState(false)

  const toggle=()=>{
    setViewAll(!viewAll)
  }

  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return <div className="banner" style={{backgroundImage:`url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${data?.results[0].poster_path})`}}
  >

<div className="banner-text-area">
  <h1 style={{fontWeight:'bolder'}}>{data?.results[0].title}</h1>
  {!viewAll
  ?
  <p onClick={toggle}>{data?.results[0].overview.length>150 ? data?.results[0].overview.slice(0, 150) + '... (더보기)' : data?.results[0].overview}</p>
  :
  <p onClick={toggle}>{data?.results[0].overview}</p>
  }
</div>

  </div>;
};

export default Banner;
