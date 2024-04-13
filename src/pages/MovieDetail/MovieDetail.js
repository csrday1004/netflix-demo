import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "./MovieDetail.style.css";
import { useReviewsQuery } from "../../hooks/useReviews";
import { TrailerModal } from "./TrailerModal/TrailerModal";
import { useTrailerQuery } from "../../hooks/useTrailer";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Badge from "react-bootstrap/Badge";
import { useRecommendQuery } from "../../hooks/useRecommend";
import "react-multi-carousel/lib/styles.css";
import { responsive2 } from "../../constants/responsive2";
import MovieSlider from "../../common/MovieSlider/MovieSlider";



const MovieDetail = () => {
  const [moreData, setMoreData] = useState([]);
  const [clicked, setClicked] = useState();
  const [modal, setModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const params = useParams();
  const { id: movie_id } = params;
  // console.log("디테일페이지 ID", movie_id);

  // 영화 디테일 쿼리
  const { data, isLoading, isError, error } = useMovieDetailQuery({
    movie_id,
  });

  // console.log("디테일데이터", data?.title);

  // 영화 장르 쿼리
  const { data: genreData } = useMovieGenreQuery();
  // console.log(genreData);
  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((e, index) => {
      //id가 담긴 리스트들을 하나씩 끄집어내서
      //genreData의 genre.id랑 같은 거 있으면 해당 객체를 반환함
      const genreObj = genreData.find((e2) => e2.id === e.id);
      //그 객체에서 name 값만 반환함
      return genreObj.name;
    });

    return genreNameList;
  };

  // 영화 리뷰 쿼리
  const { data: reviewDatas } = useReviewsQuery({
    movie_id,
  });
  // console.log("리뷰데이터:", reviewDatas);

  // 영화 트레일러 쿼리
  const { data: trailerData, isLoading: trailerDataIsLoading } =
    useTrailerQuery({ movie_id });
  // console.log("트레일러데이터", trailerData);

  // 추천영화 쿼리
  const { data: recommendData, isLoading: recommendDataIsLoading } =
    useRecommendQuery({
      movie_id,
    });
  console.log("추천영화데이터", recommendData);

  useEffect(() => {
    const moreDataArray = [
      { key: "예산", value: "$" + data?.budget.toLocaleString() },
      { key: "수익", value: "$" + data?.revenue.toLocaleString() },
      { key: "개봉일", value: data?.release_date },
      { key: "런타임", value: data?.runtime + "분" },
    ];
    setMoreData(moreDataArray);

    if (trailerData?.length > 0) {
      setTrailerKey(trailerData[0].key);
    } else {
      setTrailerKey("");
    }

    window.scrollTo(0, 0);

  }, [movie_id, isLoading, trailerDataIsLoading, recommendDataIsLoading]);

  // console.log('트레일러 키', trailerKey)
  // console.log("moreData:", moreData);

  // 영화 요약 접었다 펴기
  const [viewAll, setViewAll] = useState(false);
  const toggle = () => {
    setViewAll(!viewAll);
  };

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="container">
      {/* 트레일러 모달 */}
      {modal ? (
        <TrailerModal setModal={setModal} trailerKey={trailerKey} />
      ) : null}

      <div className="영화소개 detail-box">
        <div
          className="포스터 poster"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${data.backdrop_path})`,
          }}
        ></div>
        <div className="상세내용 detail-info">
          <div className="장르나열 genre-box">
            {showGenre(data.genres).map((item, index) => {
              return (
                <Badge bg="red" key={index}>
                  {item}
                </Badge>
              );
            })}
          </div>
          <div className="영화제목 title">{data.title}</div>
          <div className="tagline">{data.tagline}</div>
          <div className="평점/인기도/나이제한 short-info">
            <div className="평점">
              <i className="xi-star" style={{ color: "red" }} />{" "}
              {Number(data.vote_average).toFixed(1)}/10점
            </div>
            <div className="인기도">
              <i className="xi-group" style={{ color: "red" }} />{" "}
              {data.popularity}
            </div>
            <div className="나이제한">
              <i className="xi-info" style={{ color: "red" }} />{" "}
              {data.adult ? "18세이상" : "전체관람가"}
            </div>
          </div>

          <div className="overview">
            {!viewAll ? (
              <div onClick={toggle}>
                {data?.overview.length > 150 ? (
                  <div>
                    {data?.overview.slice(0, 150)}
                    <span style={{ color: "red" }}> ... (더보기)</span>
                  </div>
                ) : (
                  data?.overview
                )}
              </div>
            ) : (
              <p onClick={toggle}>{data?.overview}</p>
            )}
          </div>

          <div className="budget/revenue/release_date/runtime more-data">
            {moreData.map((e, i) => {
              return (
                <div className="badge-data" key={i}>
                  <span className="badge">{e.key}</span>
                  <span className="budget">{e.value}</span>
                </div>
              );
            })}
          </div>
          {trailerData?.length > 0 ? (
            <div
              className="예고편보기 view-trailer"
              onClick={() => {
                setModal(true);
              }}
            >
              <i className="xi-youtube-play" /> 트레일러 시청
            </div>
          ) : (
            <div
              className="예고편보기 view-trailer not-yet"
              onClick={() => {
                setModal(true);
              }}
            >
              <i className="xi-youtube-play" /> 트레일러 준비중
            </div>
          )}
        </div>
      </div>
      {/* 추천영화 슬라이드~~~~~~~~~~~~~~~~~~ */}
      <div className="추천영화모음 recommend-container">
        <h3 className="section">추천영화({recommendData?.length})</h3>
          {recommendData?.length > 0 ? (
            <MovieSlider
            movies={recommendData}
            responsive={responsive2}
            rating={false}
          />
          ) : null}
      
      </div>
      {/* 영화리뷰~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <div className="영화리뷰모음 reviews">
        <h3 className="section">감상평({reviewDatas?.length})</h3>
        {reviewDatas?.map((e, index) => {
          return (
            <div className="리뷰 each-review" key={index}>
              <div className="프사/닉/평점 profile">
                <img
                  className="avatar-image"
                  src={
                    e.author_details.avatar_path
                      ? `https://media.themoviedb.org/t/p/w150_and_h150_face${e.author_details.avatar_path}`
                      : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                  }
                  alt={e.author}
                />
                <div>
                  <div>{e.author}</div>
                  <div>{e.author_details.rating}/10점</div>
                </div>
              </div>

              <div
                className="content"
                onClick={() => {
                  if (clicked === index) {
                    setClicked();
                  } else {
                    setClicked(index);
                  }
                }}
              >
                {/* 내가 누른 돔의 인덱스랑 해당 돔의 인덱스가 같으면 토글 실행 */}
                {index === clicked ? e.content : e.content.slice(0, 500)}

                <span style={{ color: "red" }}>
                  {e.content.length > 500
                    ? index === clicked
                      ? " (접기)"
                      : " ...(더보기)"
                    : null}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDetail;
