import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import './Banner.style.css';
import Spinner from "react-bootstrap/Spinner";

const Banner = () => {

  const [viewAll, setViewAll] = useState(false)

  const toggle=()=>{
    setViewAll(!viewAll)
  }

  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("ddd", data);

  if (isLoading) {
    return ;
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
  <div onClick={toggle}>{data?.results[0].overview.length>150 ? (<div>{data?.results[0].overview.slice(0, 150)}<span style={{ color: "red" }}> ...(더보기)</span></div>) : data?.results[0].overview}</div>
  :
  <div onClick={toggle}>{data?.results[0].overview}</div>
  }
</div>

  </div>;
};

export default Banner;
