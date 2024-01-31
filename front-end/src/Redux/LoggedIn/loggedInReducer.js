const initialState = false;

function loggedInReducer (state = initialState , action) {
    switch (action.type) {
        case "LoggedIn/showLoginStatus": {
            return action.payload;
        } 
        default: {
            return state;
        }
    }
}


export default loggedInReducer;