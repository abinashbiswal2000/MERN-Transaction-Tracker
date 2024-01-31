// import combineReducers from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loggedInReducer from '../LoggedIn/loggedInReducer';


const indexReducer = combineReducers({
    loggedInReducer
});


export default indexReducer;