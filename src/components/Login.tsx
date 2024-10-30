import React, { useRef, useState, FormEvent } from 'react';
import { Form, Card, Button, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push("/");
      } catch {
        setError("Failed to log in");
      }
      setLoading(false);
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup id="email">
            <FormLabel>Email</FormLabel>
            <FormControl type="email" ref={emailRef} required />
          </FormGroup>
          <FormGroup id="password">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" ref={passwordRef} required />
          </FormGroup>
          <Button disabled={loading} className="w-100 mt-3" type="submit">
            Log In
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Login;
