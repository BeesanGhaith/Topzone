import "./Register.css";
import React, { useState } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiEarthAmerica } from "react-icons/gi";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    if (
      name &&
      email &&
      password == confirmPassword &&
      country &&
      agree &&
      privacy
    ) {
      try {
        const result = await axios.post("http://localhost:5000/users", {
          name,
          password,
          email,
          country,
        });
        if (result.data.success) {
          setStatus(true);
          setMessage("The user has been created successfully");
        } else throw Error;
      } catch (error) {
        setStatus(false);
        if (error.response && error.response.data) {
          return setMessage(error.response.data.message);
        }
        setMessage("Error happened while register, please try again");
      }
    } else {
      setStatus(false);
      setMessage("Please fill in all fields");
    }
    if (password != confirmPassword) {
      setStatus(false);
      setMessage("Password did not match");
    }
  };

  return (
    <>
      <div className="div-register">
        <Container fluid className="d-flex justify-content-center">
          <Form
            className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-6"
            onSubmit={addUser}
          >
            <h1>SIGN UP</h1>
            <div className="div-form-register d-flex gap-2">
              <Form.Group className="form-group-input d-flex flex-column gap-4 mt-4">
                <Form.Control
                  className="input-register"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control
                  className="input-register"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="form-group-input d-flex flex-column gap-4 mt-4">
                <Form.Control
                  className="input-register"
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Form.Control
                  className="input-register"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </div>

            <Form.Group className="form-country mt-4">
              <GiEarthAmerica className="earth-icon fs-2" />
                <input
                  className="input-country w-50"
                  list="encodings"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder="Choose country"
                  class="col-sm-6 custom-select custom-select-sm"
                />
                <datalist id="encodings">
                  <option value="Jordan">Jordan</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Syria">Syria</option>
                </datalist>
            </Form.Group>

            <div className="div-agree d-flex justify-content-between mt-4">
              <div>
                <div className="d-flex gap-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    onClick={() => {
                      setAgree(true);
                    }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree to the
                  </label>
                  <label className="label">terms and conditions</label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    onClick={() => {
                      setPrivacy(true);
                    }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree to the
                  </label>
                  <label className="label">privacy policy</label>
                </div>
              </div>
              <button className="btn-register">Sign up</button>
            </div>
            <p className="mt-4 fw-bold">
              Already have an account?
              <Link to="/" className="sign-in">
                Sign In
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

export default Register;
