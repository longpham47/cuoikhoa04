import { getDetailJob } from '../../../services/User/getDetailJobService'
import { GET_DETAIL_JOB } from "../type/ManageListJobType"
import { displayLoadingAction, hideLoadingAction } from "../../loadingAction";

export const getDetailJobAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await getDetailJob(id)
            let action = {
                type: GET_DETAIL_JOB,
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