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
  const [sortBtn, setSortBtn] = useState(localStorage.getItem("sortState") !== "false");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
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
  }, [isLoading, sortBtn]);

  const handlePageClick = ({ selected }) => {
    console.log("selected", selected);
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
        <Col className="p-5" lg={5} xs={12}>
          <div
            className="정렬하기"
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                localStorage.setItem("sortState", true);
                setSortBtn(true);
              }}
              variant={sortBtn ? "danger" : "outline-danger"}
            >
              재미순
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("sortState", false);
                setSortBtn(false);
              }}
              variant={!sortBtn ? "danger" : "outline-danger"}
            >
              노잼순
            </Button>
          </div>
          <div className="장르필터"></div>
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
                return (
                  <Col className="mb-4" xs={4} key={index}>
                    <MovieCard movie={movie} index={false} />
                  </Col>
                );
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
