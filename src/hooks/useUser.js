import { useSelector, useDispatch } from "react-redux";
import {jwtDecode} from "../helpers/jwtHelper";


export default function useUser() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const setUser = (token) => {
        if (token) {
            dispatch({
                type: 'login',
                user: jwtDecode(token),
                token: token
            });
            window.localStorage.setItem('token', token);
        } else {
            dispatch({
                type: 'logout'
            });
            window.localStorage.removeItem('token');
        }
    }

    return [user, setUser];
}