import { getListJobByName } from "../../../services/User/getListJobByNameService";
import { displayLoadingAction, hideLoadingAction } from "../../loadingAction";
import { GET_NAME_JOB } from "../type/ManageListJobType";



export const getListJobByNameAction = (namejob) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await getListJobByName(namejob);
            let action = {
                type: GET_NAME_JOB,
                jobList: result.data.content
            }
            dispatch(action)
            dispatch(hideLoadingAction)
        } catch (errors) {
            dispatch(hideLoadingAction)
            console.log(errors)
        }
    }
}