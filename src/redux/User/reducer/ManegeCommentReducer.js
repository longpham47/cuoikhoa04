import { ADD_COMMENT, GET_COMMENT_ID_JOB, GET_USER_BY_ID } from "../type/ManageListJobType"

const initialState = {
    listComment: [],
    userInfo: {}
}

export const ManegeCommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COMMENT_ID_JOB: {
            state.listComment = action.idJob
            return { ...state }
        }
        case ADD_COMMENT: {
            state.listComment = [...state.listComment, action.userComment]
            return { ...state }
        }
        case GET_USER_BY_ID: {
            state.userInfo = action.userID
            return { ...state }
        }

        default:
            return state
    }
}
