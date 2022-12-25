import { http } from "../../utils/setting";

export const getDetailJob = (MaLoaiCongViec) => {
    return http.get(`/cong-viec/lay-chi-tiet-loai-cong-viec/${MaLoaiCongViec}`)
}