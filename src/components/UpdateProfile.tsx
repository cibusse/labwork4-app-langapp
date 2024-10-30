import React, { useRef, useState, FormEvent } from 'react';
import { Form, Card, Button, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { Link, useHistory} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory ();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    const promises: Promise<void>[] = [];
    setLoading(true);
    setError("");

    if (emailRef.current && emailRef.current.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current && passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/"); // Redirect after updating
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser?.email || ""}
              />
            </FormGroup>
            <FormGroup id="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <FormGroup id="password-confirm">
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
