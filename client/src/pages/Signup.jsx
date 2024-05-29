import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/HueTrack");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Container>
      {/* <Navbar /> */}
      <div className="nav">
          <div className="left">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h4>HueTrack</h4>
            </Link>
          </div>
          <div className="right">
            <Link
              to="/Login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h6>Login</h6>
            </Link>

            <Link
              to="/Signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h6>Try for free</h6>
            </Link>
          </div>
        </div>

      <div className="signup-container">
        <div className="words">
          <h3>Create a New Account</h3>
          <p style={{ paddingTop: "1rem" }}>
            Already have an account? <Link to="/Login">Log in.</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label>Email Address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button>
            <h6>Create account</h6>
          </button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .signup-container {
    margin: 6rem 35rem;
  }
  h4 {
    color: var(--color-black);
    text-decoration: none;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.3rem 10rem 0rem 10rem;
    background-color: var(--color-white);
  }
  .right {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  .words {
    text-align: center;
    padding: 2rem 1rem;
  }
  label {
    font-weight: bold;
  }
  input {
    margin: 0.5rem 0;
    padding-left: 1rem;
    border: none;
    height: 2.5rem;
    border-radius: 5px;
    ${"" /* background-color: var(--color-input); */}
    border: 1.5px solid #D7D7D7;
  }

  input:hover {
    border: 1.5px solid #1eacd6;
  }
  .email {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }
  .password {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }
  button {
    width: 100%;
    height: 3rem;
  }
  ${
    "" /* button {
    background-color: var(--color-primary);
    width: 100%;
    display: inline-block;
    color: var(--color-bg);
    padding: 0.8rem 0;
    border-radius: 0.2rem;
    cursor: pointer;
    border: none;
    transition: var(--transition);
  }
  button:hover {
    background-color: #54a4ab;
  } */
  }
`;

export default Signup;