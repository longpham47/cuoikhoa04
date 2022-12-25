import { http } from "../../utils/setting";

export const getInfoHireJob = (infoHireJob) => {
    return http.post(`/thue-cong-viec`, infoHireJob)
}