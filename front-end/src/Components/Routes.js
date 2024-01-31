import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from './Home'
import AboutMe from './AboutMe'
import ProjectLogin from './ProjectLogin'
import CreateNewAccount from './CreateNewAccount';
import ProjectList from './ProjectList';
import Project1_TransactionTracker from './Project1_TransactionTracker';








export default function DeRoutes() {

  let LoggedIn = useSelector(function (state) { return state.loggedInReducer })








  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/AboutMe' element={<AboutMe />} />
      {
        !LoggedIn &&
        <>
          <Route path='/Project/Login' element={<ProjectLogin />} />
          <Route path='/Project/CreateNewAccount' element={<CreateNewAccount />} />
        </>
      }
      {
        LoggedIn &&
        <>
          <Route path='/Project/ProjectList' element={<ProjectList />} />
          <Route path='/Project/Project1_TransactionTracker' element={<Project1_TransactionTracker />} />
        </>
      }
    </Routes>
  )
}
