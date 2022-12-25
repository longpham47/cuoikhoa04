import { http } from "../../utils/setting";

export const getListJobByName = (namejob) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${namejob}`)
}