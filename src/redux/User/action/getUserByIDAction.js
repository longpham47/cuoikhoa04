import { getUserByID } from "../../../services/User/getUserByIDService"
import { USER_ID } from "../../../utils/varsSetting"
import { GET_USER_BY_ID } from "../type/ManageListJobType"

export const getUserByIDAction = (userID) => {
    return async (dispatch) => {
        if (localStorage.getItem(USER_ID) !== null) {
            try {
                const result = await getUserByID(userID)
                let action = {
                    type: GET_USER_BY_ID,
                    userID: result.data.content
                }
                dispatch(action)

            } catch (error) {
                console.log(error)
            }
        }

    }
}