import { http } from "../../utils/setting";

export const getListMenu = () => {
    return http.get('/cong-viec/lay-menu-loai-cong-viec');
}