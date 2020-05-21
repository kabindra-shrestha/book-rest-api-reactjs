import React from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

export default function Footer() {
    let fullYear = new Date().getFullYear()

    return (
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div>{fullYear} - {fullYear + 1} | All Rights Reserved by Kabindra Shrestha</div>
                </Col>
            </Container>
        </Navbar>
    );
}