import { http } from "../../utils/setting";

export const getInfoDetailJob = (MaCongViec) => {
    return http.get(`/cong-viec/lay-cong-viec-chi-tiet/${MaCongViec}`)
}
