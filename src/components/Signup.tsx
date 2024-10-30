import React, { useRef, useState, FormEvent } from 'react';
import { Form, Card, Button, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  // Adding specific types for useRef
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Check if passwords match
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current?.value || "", passwordRef.current?.value || ""); // Ensure values are provided
      history.push("/"); // Corrected navigation
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body> {/* Corrected CardBody to Card.Body */}
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <FormControl type="email" ref={emailRef} required />
            </FormGroup>
            <FormGroup id="password">
              <FormLabel>Password</FormLabel>
              <FormControl type="password" ref={passwordRef} required />
            </FormGroup>
            <FormGroup id="password-confirm">
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl type="password" ref={passwordConfirmRef} required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
