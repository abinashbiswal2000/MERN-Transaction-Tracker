import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginStatus } from '../Redux/LoggedIn/loggedInActions';

export default function Navbar() {


  const LoggedIn = useSelector(function (state) { return state.loggedInReducer })
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function handleLogout() {
    try {
      const axiosResponse = await axios.get("http://localhost:5000/user/Logout")
      // console.log(axiosResponse.data);
      if (axiosResponse.data === "Logged Out") {
        dispatch(showLoginStatus(false))
        navigate('/')
      }
      // dispatch(showLoginStatus())
    } catch (error) {
      console.table({
        errorName: error.name,
        errorMessage: error.message
      })
    }
  }





  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AboutMe">AboutMe</Link>
            </li>
            {
              !LoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/Project/Login">Project</Link>
              </li>
            }
            {
              LoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/Project/ProjectList">Project List</Link>
              </li>
            }
          </ul>

          <ul className="navbar-nav">
            {
              LoggedIn &&
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link" style={{ backgroundColor: "inherit", border: "none" }}>Logout</button>
              </li>
            }
          </ul>

        </div>
      </div>
    </nav>
  )
}
