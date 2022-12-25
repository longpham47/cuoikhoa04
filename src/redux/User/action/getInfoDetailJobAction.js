
import { getInfoDetailJob } from "../../../services/User/getInfoDetailJobService";
import { GET_INFO_DETAIL_JOB } from '../type/ManageListJobType'

export const getInfoDetailJobAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await getInfoDetailJob(id)
            let action = {
                type: GET_INFO_DETAIL_JOB,
                idJob: result.data.content
            }
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}