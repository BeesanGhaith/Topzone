import "./Login.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { login } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Container, Form, Button } from "react-bootstrap";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.token));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage("Error happened while Login, please try again");
        return setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/home");
    }
  }, [state.isLoggedIn]);

  return (
    <>
      <div className="div-login">
        <Container
          fluid
          className="d-flex flex-row flex-wrap gap-5 justify-content-center"
        >
          <Form
            className="col-8 col-sm-5 col-md-5 col-lg-4 col-xl-3"
            onSubmit={loginUser}
          >
            <h2>Log in</h2>
            <br />
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Control
                className="input-login"
                type="email"
                placeholder="Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Control
                className="input-login"
                type="password"
                placeholder="Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <button className="btn-login">Sign in</button>
            <p className="mt-3 fw-bold">
              Don't have an account?{" "}
              <Link to="/register" className="sign-up">
                Sign Up
              </Link>
            </p>
            {status
              ? message && (
                  <Alert variant="success" className="successMessageLogin mt-2">
                    {message}
                  </Alert>
                )
              : message && (
                  <Alert
                    variant="danger"
                    className="errorMessageLogin mb-2 mt-2"
                  >
                    {message}
                  </Alert>
                )}
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Login;
