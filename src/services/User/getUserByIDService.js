import { http } from "../../utils/setting";

export const getUserByID = (userID) => {
    return http.get(`/users/${userID}`)
}