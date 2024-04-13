import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import "./Movies.style.css";

// 경로 2가지
// navbar에서 클릭해 온 경우 => popular Movie들 보여주기
// keyword를 입력해 온 경우 => keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page State 만들기
// 페이지 네이션 클릭시 page바꿔주기
// page값 바뀔 시 useSearchMovie에 page까지 넣어서 fetch

const Movies = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortBtn, setSortBtn] = useState(
    localStorage.getItem("sortState") !== "false"
  );
  const [selectGenreBtn, setSelectedGenreBtn] = useState(
    localStorage.getItem("genreState") === null
      ? null
      : Number(localStorage.getItem("genreState"))
  );
  const [selectGenreId, setSelectedGenreId] = useState(
    localStorage.getItem("genreIdState") === null
      ? null
      : Number(localStorage.getItem("genreIdState"))
  );
  // console.log(selectGenreId);
  const [genreFilterMenu, setGenreFilterMenu] = useState(false);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const { data: genres } = useMovieGenreQuery();
  // console.log(genres);

  // console.log(data)

  useEffect(() => {
    // 정렬 설정
    if (!isLoading) {
      if (sortBtn) {
        const sorting = [...data.results].sort(
          (a, b) => b.popularity - a.popularity
        );
        setSortedData(sorting);
      } else {
        const sorting = [...data.results].sort(
          (a, b) => a.popularity - b.popularity
        );
        setSortedData(sorting);
      }
    }
  }, [isLoading, sortBtn, selectGenreBtn,page]);

  const handlePageClick = ({ selected }) => {
    // console.log("selected", selected);
    setPage(selected + 1);
  };

  // console.log("ddd", data);

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
    <Container>
      <Row>
        <Col className="filter-area" lg={5} xs={12}>
          <div className="정렬하기 btn-group">
            <Button
              onClick={() => {
                localStorage.setItem("sortState", true);
                setSortBtn(true);
              }}
              variant={sortBtn ? "danger" : "outline-danger"}
            >
              인기순
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("sortState", false);
                setSortBtn(false);
              }}
              variant={!sortBtn ? "danger" : "outline-danger"}
            >
              그닥순
            </Button>
            {/* 장르메뉴 여는 버튼 */}
            <Button
              onClick={() => {
                setGenreFilterMenu(true);
              }}
              variant={selectGenreBtn === null ? "outline-danger" : "danger"}
            >
              {genres?(genres[selectGenreBtn]?.name ?? "장르선택"):'장르선택'}
            </Button>
          </div>
          {/* 장르필터~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* 장르 버튼을 누르면 장르의 아이디를 스테이트에 저장한다 */}
          {/* 저장된 장르 아이디를 가진 영화들만 보여준다 */}
          {genreFilterMenu ? (
            <div className="장르필터 btn-group">
              {genres?.map((e, index) => {
                return (
                  <Button
                    className="genre-btn"
                    onClick={() => {
                      setGenreFilterMenu(false);
                      if (selectGenreBtn === index) {
                        localStorage.removeItem("genreState");
                        localStorage.removeItem("genreIdState");
                        setSelectedGenreId(null);
                        setSelectedGenreBtn(null);
                        return;
                      }
                      localStorage.setItem("genreState", index.toString());
                      localStorage.setItem("genreIdState", e.id.toString());
                      setSelectedGenreId(e.id);
                      setSelectedGenreBtn(index);
                    }}
                    variant={
                      selectGenreBtn === index ? "danger" : "outline-danger"
                    }
                    key={index}
                  >
                    {e.name}
                  </Button>
                );
              })}
            </div>
          ) : null}
        </Col>
        <Col
          className=""
          lg={7}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Row className="mb-5">
            {(sortedData.length > 0 ? sortedData : data?.results).map(
              (movie, index) => {
                // 장르필터에 해당되는 것만 보여주자
                // console.log("장르확인용", movie);
                // 만약 필터가 아무것도 선택되어있지 않으면
                if (selectGenreBtn === null) {
                  return (
                    <Col className="mb-4" xs={4} key={index}>
                      <MovieCard movie={movie} index={false} />
                    </Col>
                  );
                  // 필터가 선택되어 있으면
                } else {
                  // 만약 장르필터에 선택된 장르아이디가 이 영화 장르 리스트에 있으면
                  if (movie.genre_ids.includes(selectGenreId)) {
                    return (
                      <Col className="mb-4" xs={4} key={index}>
                        <MovieCard movie={movie} index={null} />
                      </Col>
                    );
                  }
                  // 없으면
                  return null;
                }
              }
            )}
          </Row>
          <Row className="p-4">
            <ReactPaginate
              nextLabel="next>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={data?.total_pages} //전체페이지 수
              previousLabel="<previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1} //시작페이지
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Movies;
