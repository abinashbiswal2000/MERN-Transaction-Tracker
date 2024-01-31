import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoginStatus } from '../Redux/LoggedIn/loggedInActions';

export default function Project() {



  const dispatch = useDispatch();



  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  async function handleLogin(event) {

    try {

      event.preventDefault();
      console.log(`De Haddy`);

      const axiosResponse = await axios.post(
        'http://localhost:5000/user/Login',
        {
          _id: loginID,
          password
        }
      );

      // console.log(axiosResponse.data);
      if (axiosResponse.data === "Logged In") {
        dispatch(showLoginStatus(true))
        navigate('/Project/ProjectList');
      }




    } catch (error) {
      console.table({
        errorName: error.name,
        errorMessage: error.message
      })
    }

  }

  return (
    <div className='p-2'>
      <form onSubmit={handleLogin} className='mx-auto mt-3 p-3 border border-3 rounded' style={{ maxWidth: "400px" }}>

        <label htmlFor="Login ID" className="form-label">Login ID</label>
        <input value={loginID} onChange={function (event) { setLoginID(event.target.value) }} type="text" id='Login ID' className="form-control" placeholder='Login ID' />

        <br />

        <label htmlFor="Password" className="form-label">Password</label>
        <input value={password} onChange={function (event) { setPassword(event.target.value) }} type="text" id='Password' className="form-control" placeholder='Login ID' />

        <br />

        <div className="d-grid gap-3">
          <button type="submit" className='btn btn-primary'>Sign In</button>
          <Link to='/Project/CreateNewAccount' className='btn btn-primary'>Create New Account</Link>
        </div>

      </form>

    </div>
  )
}
