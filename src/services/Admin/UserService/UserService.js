import { http } from '../../../utils/setting'

export const danhSachUser = (name = "") => {
    if (name.trim() !== "") {
        return http.get(`/users?name=${name}`);
    }
    return http.get('/users');
}

export const ThemUser = (formData) => {
    return http.post('/users', formData)
}
export const ThemUserupload = (formData) => {
    return http.post('/users/upload-avatar', formData)
}
export const LayThongTinUser = (id) => {
    return http.get(`/users/${id}`)
}
export const CapNhatUser = (id) => {
    return http.put(`/users/${id}`)
}

export const xoaUser = (id) => {
    return http.delete(`/users?id=${id}`);
}

export const searchUser = (name = "") => {
    if (name.trim() !== "") {
        return http.get(`/users/search/${name}`)
    }
    return http.get('/users');
}














// dịch vụ sevice
export const listThueCongViec = () => {
    return http.get("/thue-cong-viec")
}

export const postThueCongViec = () => {
    return http.post("/thue-cong-viec")
}

export const getTCV = (id) => {
    return http.get(`/thue-cong-viec/${id}`);
}
export const putTCV = (id) => {
    return http.put(`/thue-cong-viec/${id}`);
}


export const xoaTCV = (id) => {
    return http.delete(`/thue-cong-viec/${id}`);
}




export const searchTCV = (id) => {
    return http.post(`/thue-cong-viec/hoan-thanh-cong-viec/${id}`)
}



// BÌNH LUẬN
export const binhLuan = () => {
    return http.get(`/binh-luan`)
}

export const postBinhLuan = () => {
    return http.post(`/binh-luan`)
}

export const getBinhLuan = (id) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${id}`)
}

export const xoaBL = (id) => {
    return http.delete(`/binh-luan/${id}`);
}

export const searchCMT = (maCongViec = "") => {
    if (maCongViec.trim() !== "") {
        return http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`)
    }

}
