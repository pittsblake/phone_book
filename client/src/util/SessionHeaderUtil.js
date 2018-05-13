import axios from 'axios'


// This tells axios to save the headers to local storage and use them in the next request
export function saveAuthTokens(headers) {
    // Set Axios Headers with Auth tokens for the next request.
    axios.defaults.headers['access-token'] = headers['access-token']
    axios.defaults.headers.client = headers.client
    axios.defaults.headers.uid = headers.uid
    axios.defaults.headers.expiry = headers.expiry

    // Save Auth tokens to localStorage to persist log-in if the window is closed
    localStorage.setItem('access-token', headers['access-token'])
    localStorage.setItem('client', headers.client)
    localStorage.setItem('uid', headers.uid)
    localStorage.setItem('expiry', headers.expiry)
}



// Checks local storage to see if there is stored data already to see if someone was        // already signedIn. This helps to not be logged out if the page refreshes.
export function userIsLoggedIn() {

    const userLoggedIn = (
        !!localStorage.getItem('access-token') &&
        !!localStorage.getItem('client') &&
        !!localStorage.getItem('uid') &&
        !!localStorage.getItem('expiry')
    )

    return userLoggedIn
}


// The second function will tell axios to use the existing session data from the last User // so that we don't have to sign in again:
export function setAxiosDefaults() {
    axios.defaults.headers['access-token'] = localStorage.getItem("access-token");
    axios.defaults.headers.client = localStorage.getItem("client");
    axios.defaults.headers.uid = localStorage.getItem("uid");
    axios.defaults.headers.expiry = localStorage.getItem("expiry");
}



// For logging out, clear local storage
export function clearAuthTokens() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('client')
    localStorage.removeItem('uid')
    localStorage.removeItem('expiry')
}