import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

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
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const handlePageClick = ({ selected }) => {
    console.log('selected',selected)
    setPage(selected + 1);
  };

  console.log("ddd", data);
  console.log('page', page)
  
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
        ;
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          필터
        </Col>
        <Col lg={8} xs={12}>
          <Row  className="mb-5">
            {data?.results.map((movie, index) => {
              return (
                <Col xs={4} key={index}>
                  <MovieCard movie={movie} index={false} />
                </Col>
              );
            })}
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
