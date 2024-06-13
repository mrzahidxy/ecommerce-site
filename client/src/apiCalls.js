import { loginFailed, loginStart, loginSuccess } from "./redux/userReducer"
import { publicRequest } from "./requestMethod";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('auth/login', user);
        dispatch(loginSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        dispatch(loginFailed(error));
    }
}