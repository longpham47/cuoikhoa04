import { http } from "../../utils/setting";

export const addComment = (userComment) => {
    return http.post(`/binh-luan`,userComment)
}