import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { googleProvider, facebookProvider } from '../contexts/AuthMethods';
import { socialAuth1, socialAuth2 } from '../contexts/socialAuth';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('failed to create an account');
    }
    setLoading(false);
  }

  const handleOnClick1 = async (provider) => {
    const res = await socialAuth1(provider);
    history.push('/');
    console.log(res);
  };

  const handleOnClick2 = async (provider) => {
    const res = await socialAuth2(provider);
    history.push('/');
    console.log(res);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Welcome To Social</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Sign Up
            </Button>
          </Form>

          <h4 className='text-center fw-400 '>or</h4>

          <div className='w-100'>
            <Button
              className='w-100 mb-2 bg-light text-dark border border-primary'
              onClick={() => handleOnClick1(googleProvider)}
            >
              <svg
                aria-hidden='true'
                className='native svg-icon iconGoogle me-2'
                width='18'
                height='18'
                viewBox='0 0 18 18'
              >
                <path
                  d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z'
                  fill='#4285F4'
                ></path>
                <path
                  d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z'
                  fill='#34A853'
                ></path>
                <path
                  d='M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z'
                  fill='#FBBC05'
                ></path>
                <path
                  d='M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z'
                  fill='#EA4335'
                ></path>
              </svg>
              SignUp with Google
            </Button>

            <Button
              className='w-100 mb-2 btn btn-primary'
              onClick={() => handleOnClick2(facebookProvider)}
            >
              <svg
                aria-hidden='true'
                className='svg-icon iconFacebook me-2'
                width='18'
                height='18'
                viewBox='0 0 18 18'
              >
                <path
                  d='M3 1a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2V3a2 2 0 00-2-2H3zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5z'
                  fill='#fff'
                ></path>
              </svg>
              SignUp with Facebook
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/Login'>Log In</Link>
      </div>
    </>
  );
}
