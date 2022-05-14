import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './Dashbord.css'

const Dashbord = () => {
  return (
    <Container className='dash'>
        <Row>
            <Col lg={3}>
            <ul className='list-group dash-menu'>
                    <li className='list-group-item'><Link to="/admin/dash">Dashbord</Link></li>
                    <li className='list-group-item'><Link to="/admin/products">Products</Link></li>
                    <li className='list-group-item'><Link to="/admin/category">Catagory</Link></li>
                    <li className='list-group-item'><Link to="/admin/tag">Tags</Link></li>
                    <li className='list-group-item'><Link to="/admin/">Logout</Link></li>
                </ul>
            </Col>
            <Col lg={9}>
              <Outlet/>
            </Col>
        </Row>
    </Container>
  );
};

export default Dashbord;