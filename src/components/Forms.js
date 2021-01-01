import React, { Component } from 'react';
import { Form, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css"

export default function Forms() {
    return (
      <div className="forms">
            <h1>問い合わせ先</h1>
            <p>返信まではお時間いただくことございます</p>
            <div className="forms__container">
                <div className="forms__wrapper">
                  <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="form__FirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="form__LastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Last name" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="form__Email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="form__Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="Form__Textarea">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Form.Group controlId="form__Checkbox">
                    <Form.Check type="checkbox" label="Accept all our policy and terms" />
                  </Form.Group>
                <Button variant="primary" type="submit">
                  送信
                </Button>
              </Form>
            </div>
            </div>
            </div>
    )

}