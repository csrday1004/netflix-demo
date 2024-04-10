import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie, index }) => {

  const {data:genreData}=useMovieGenreQuery()
  // console.log(genreData)
  //Array(19)
    //0:{id: 28, name: '액션'}
    //1:{id: 12, name: '모험'}...

  const showGenre = (genreIdList) =>{
    if(!genreData){
      return []
    }
    const genreNameList = genreIdList.map((id,index)=>{
      //id가 담긴 리스트들을 하나씩 끄집어내서
      //genreData의 genre.id랑 같은 거 있으면 해당 객체를 반환함
      const genreObj = genreData.find((e)=>e.id===id)
      //그 객체에서 name 값만 반환함
      return genreObj.name
    })

    return genreNameList
  }

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
        <div>{movie.title}</div>
    
          <div>{Number(movie.vote_average).toFixed(1)}/10점</div>
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
            {showGenre(movie.genre_ids).map((id, index) => {
              return <Badge bg="danger" key={index}>{id}</Badge>;
            })}
          </div>

      </div>
    </div>
  );
};

export default MovieCard;
