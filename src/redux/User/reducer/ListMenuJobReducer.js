import {GET_LIST_MENU_JOB} from '../../../redux/User/type/ManageListJobType'

const initialState = {
    listMenu: []
}

export const ListMenuJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MENU_JOB: {
            state.listMenu = action.listMenu
            return { ...state }
        }

        default:
            return state
    }
}
