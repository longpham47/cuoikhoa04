import { getListJobByID } from "../../../services/User/getListJobByIDService";
import { GET_LIST_JOB_ID } from '../../../redux/User/type/ManageListJobType';
import { displayLoadingAction, hideLoadingAction } from "../../loadingAction";

export const getListJobByIDAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await getListJobByID(id)
            let action = {
                type: GET_LIST_JOB_ID,
                id: result.data.content
            }
            dispatch(action)
            dispatch(hideLoadingAction)
        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error)
        }
    }
}