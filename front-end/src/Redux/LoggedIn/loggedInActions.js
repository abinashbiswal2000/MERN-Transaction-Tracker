export function showLoginStatus (axiosResponse) {
    return {
        type: "LoggedIn/showLoginStatus",
        payload: axiosResponse
    }
}