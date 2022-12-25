import { history } from "../../../App";
import { loginService, registerService } from "../../../services/User/signInAndSignUp";
import { TOKEN, USER_ID, USER_NAME, USER_ROLE } from "../../../utils/varsSetting";
import { displayLoadingAction, hideLoadingAction } from "../../loadingAction";

export const loginAction = (formValue) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await loginService(formValue);
            localStorage.setItem(TOKEN, result.data.content.token);

            let { user } = result.data.content;

            localStorage.setItem(USER_NAME, user.name);
            localStorage.setItem(USER_ID, user.id);
            localStorage.setItem(USER_ROLE, user.role);

            alert('Sign in success !');
            window.location.reload();

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            alert('Email or password not match !');
        }
    }
}

export const registerAction = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await registerService(formData);
            dispatch(hideLoadingAction);

            alert('Signup success !');
            history.push('/');
        } catch (errors) {
            dispatch(hideLoadingAction);
            alert(errors.response.data.content);
        }
    }
}