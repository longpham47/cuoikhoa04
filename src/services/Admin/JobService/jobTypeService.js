import { http } from '../../../utils/setting'

export const getListJobType = () => {
    return http.get('/loai-cong-viec');
}

export const getJobTypeByID = (jobTypeID) => {
    return http.get(`/loai-cong-viec/${jobTypeID}`);
}

export const addJobType = (formValue) => {
    return http.post('/loai-cong-viec', formValue);
}

export const removeJobType = (jobTypeID) => {
    return http.delete(`/loai-cong-viec/${jobTypeID}`);
}

export const updateJobType = (jobTypeID, jobTypeValue) => {
    return http.put(`/loai-cong-viec/${jobTypeID}`, jobTypeValue);
}