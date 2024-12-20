import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/sidebar';
import MainContent from './components/Main';


const Home = () => {
  const [currentPage, setCurrentPage] = useState('bienvenido');

  return (
    <Container fluid className="dashboard-container mt-5">
      <Row>
        <Col md={3}>
          <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </Col>
        <Col md={9}>
          <MainContent currentPage={currentPage} />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
