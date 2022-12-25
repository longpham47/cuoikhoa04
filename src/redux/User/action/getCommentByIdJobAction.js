import { getCommentByIdJob } from "../../../services/User/getCommentService";
import { GET_COMMENT_ID_JOB } from "../type/ManageListJobType";
import { addComment } from "../../../services/User/addCommentService";


export const getCommentByIdJobAction = (idJob) => {
    return async (dispatch) => {
        try {
            const result = await getCommentByIdJob(idJob);
            if (result.status === 200) {
                let action = {
                    type: GET_COMMENT_ID_JOB,
                    idJob: result.data.content
                }
                dispatch(action)
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const addCommentAction = (userComment) => {
    return async (dispatch) => {
        try {
            const result = await addComment(userComment)
            await dispatch(getCommentByIdJobAction(userComment.maCongViec))
        } catch (error) {
            console.log(error)
        }
    }
}