import { http } from '../../utils/setting'

export const loginService = (formValue) => {
    return http.post(`/auth/signin/`, formValue)
}

export const registerService = (formData) => {
    return http.post(`/auth/signup`, formData);
}