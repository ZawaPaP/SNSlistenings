import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileImage( ) {
    return (
        <>
        <Row>
            <Col xs={6} md={4}>
            <Image src="../images/home.jpg" roundedCircle />
            </Col>
        </Row>
        </>
    )
}

export default ProfileImage