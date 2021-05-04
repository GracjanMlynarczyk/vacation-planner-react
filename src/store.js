import { createStore } from "redux";
import { jwtDecode } from "./helpers/jwtHelper";


const initialState = {
    user: jwtDecode(window.localStorage.getItem('token') ?? null),
    token: window.localStorage.getItem('token') ?? null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return {...state, user: action.user, token: action.token}
        case 'logout':
            return {...state, user: null, token: null}
        case 'start-loading':
            return {...state, loading: true}
        case 'stop-loading':
            return {...state, loading: false}
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;