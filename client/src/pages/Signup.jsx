import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
    const [selectedValue, setSelectedValue] = useState('option1'); // Initial selected value

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Container fluid className="signup-page">
            <Row className="justify-content-center align-items-center">
                <Col md={10} lg={10}>
                    <h1 className="text-center">Create your account</h1>
                    <Form>
                        <Form.Group controlId="formFN">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group controlId="formLN">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" />
                        </Form.Group>
                        <Form.Check.Group checked={selectedValue} onChange={handleChange}>
                            {options.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    type="radio"
                                    name="radioOptions"
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Form.Check.Group>
                        <Button variant="primary" type="submit" block>
                            Sign up
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;