import { http } from "../../utils/setting";

export const getCommentByIdJob = (MaCongViec) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${MaCongViec}`);
}