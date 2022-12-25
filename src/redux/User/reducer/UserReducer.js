import { USER_INFO, JOB_HIRE_ARRS } from '../type/UserType'

const initialState = {
    userInfo: {},
    userSkillArr: [],
    userCertArr: [],
    jobHireArr: []
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_INFO:
            state.userInfo = action.userInfo;
            state.userSkillArr = action.userSkillArr;
            state.userCertArr = action.userCertArr;
            return { ...state }

        case JOB_HIRE_ARRS:
            state.jobHireArr = action.jobHireArr;
            return {...state}

        default:
            return state
    }
}
