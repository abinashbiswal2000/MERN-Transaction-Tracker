import { configureStore } from '@reduxjs/toolkit';
import indexReducer from './indexReducer'



const store = configureStore({
    reducer: indexReducer
});


export default store;