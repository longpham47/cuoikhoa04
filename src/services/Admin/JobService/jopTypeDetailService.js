import { http } from '../../../utils/setting'

export const getJobTypeDetail = () => {
    return http.get('/chi-tiet-loai-cong-viec');
}

export const getJobTypeDetailByID = (id) => {
    return http.get(`/chi-tiet-loai-cong-viec/${id}`);
}

export const addJobDetailGroup = (formValue) => {
    return http.post('/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai', formValue);
}

export const removeJobDetailGroup = (jobGroupID) => {
    return http.delete(`/chi-tiet-loai-cong-viec/${jobGroupID}`);
}

export const updateJobDetailGroup = (jobGroupID, formValue) => {
    return http.put(`/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${jobGroupID}`, formValue);
}

export const uploadImageCover = (jobGroupID, formValue) => {
    return http.post(`/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${jobGroupID}`, formValue)
}