import { GET_INFO_DETAIL_JOB } from "../type/ManageListJobType"


const initialState = {
    infoJob: []
}

export const InfoDetailJobReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_INFO_DETAIL_JOB: {
            state.infoJob = action.idJob
            return { ...state }
        }

        default:
            return state
    }
}
