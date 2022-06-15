import "./Home.css"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";


function Home() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();


  return (
    <>
    <p className='logout fs-1 fw-bold mt-5' onClick={() => {
                  dispatch(logout());
                  localStorage.clear();
                  navigate("/");
                }}>LOG OUT</p>
    </>
  )
}

export default Home