import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import logo from '../image/netflix_logo.png'

function AppLayout() {
  return (
    <div>
      <Navbar expand="lg" variant="dark" className="bg-black text-white p-3">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={logo} alt="로고" style={{height:'40px'}}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ backgroundColor: 'gray', color:'white', border:'red'}}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 하위 라우터를 보여주려면 Outlet 써야댐 */}
      <Outlet/>
    </div>
  );
}

export default AppLayout;