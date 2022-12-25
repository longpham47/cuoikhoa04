import { http } from '../../../utils/setting'

export const getListJob = () => {
    return http.get('/cong-viec');
}

export const getListJobByName = (tenJob) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenJob}`)
}

export const addJob = (formVale) => {
    return http.post(`/cong-viec`, formVale);
}

export const removeJob = (jobID) => {
    return http.delete(`/cong-viec/${jobID}`);
}

export const uploadJobImage = (jobID, formValue) => {
    return http.post(`/cong-viec/upload-hinh-cong-viec/${jobID}`, formValue);
}

export const getJobInfo = (jobID) => {
    return http.get(`/cong-viec/${jobID}`)
}

export const updateJobInfo = (jobID, formData) => {
    return http.put(`/cong-viec/${jobID}`, formData);
}