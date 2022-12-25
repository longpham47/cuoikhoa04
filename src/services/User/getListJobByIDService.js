import { http } from "../../utils/setting";

export const getListJobByID = (MaChiTietLoai) => {
    return http.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${MaChiTietLoai}`)
}