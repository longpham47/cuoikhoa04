
import { history } from '../../../App';
import { GET_NAME_JOB } from '../type/ManageListJobType';
import { GET_LIST_JOB_ID } from '../type/ManageListJobType';
import { GET_DETAIL_JOB } from "../type/ManageListJobType";

const initialState = {
  listjob: [],
  listDetail:[]
}

export const ManegeListJobReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_NAME_JOB: {
      state.listjob = action.jobList
      history.push('/user/listjob')
      return { ...state }
    }
    case GET_LIST_JOB_ID: {
      state.listjob = action.id
      return { ...state }
    }
    case GET_DETAIL_JOB: {
      state.listDetail = action.id
      state.listjob = []
      return { ...state }
  }

    default:
      return state
  }
}
