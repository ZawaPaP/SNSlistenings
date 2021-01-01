import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import ProfileImages from './Images'

import "bootstrap/dist/css/bootstrap.min.css";


const Tweet = (props) =>  {

  return (
    <Card style={{ width: '70％' }}>
  <Card.Body>
    <ProfileImages />
    <Card.Title>Tweet</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{props.id}</Card.Subtitle>
    <Card.Text>
      {props.text}
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
  )
}

export default Tweet