import { http } from '../../utils/setting'

export const getInfoByID = (userID) => {
    return http.get(`/users/${userID}`);
}

export const updateUserInfo = (userID, formValue) => {
    return http.put(`/users/${userID}`, formValue);
}

export const updateUserAvatar = (formData) => {
    return http.post(`/users/upload-avatar`, formData);
}

export const getHireJobs = () => {
    return http.get(`/thue-cong-viec/lay-danh-sach-da-thue`);
}

export const deleteHireJobs = (hireID) => {
    return http.delete(`/thue-cong-viec/${hireID}`);
}