import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './layouts/header';
import Body from './layouts/body';
import './scss/dashboard.scss';


const Dashboard = () => {
    return (
        <Container fluid className="dashboard-container mt-5">


            <Col md={12}>
                <Header />

            </Col>
            <Col md={12}>
                <Body />
            </Col>

        </Container>

    );
};

export default Dashboard;
