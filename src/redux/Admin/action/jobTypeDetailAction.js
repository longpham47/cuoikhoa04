import { history } from "../../../App";
import { addJobDetailGroup, getJobTypeDetail, getJobTypeDetailByID, removeJobDetailGroup, updateJobDetailGroup, uploadImageCover } from "../../../services/Admin/JobService/jopTypeDetailService";
import { displayLoadingAction, hideLoadingAction } from "../../loadingAction";
import { GET_JOB_TYPE_DETAIL, GET_LIST_JOB_TYPE_DETAIL, ADD_JOB_GROUP, GET_JOB_GROUP_INFO } from '../type/JobTypeDetailType'

export const getJobSearchAction = (jobTypeID) => {
    return async (dispatch) => {
        try {
            let result = await getJobTypeDetailByID(jobTypeID);
            let resultArr = [];
            resultArr.push(result.data.content);

            let action = {
                type: GET_JOB_TYPE_DETAIL,
                jobTypeDetail: result.data.content,
                jobTypeDetailOnSearch: resultArr
            }
            dispatch(action);
        } catch (errors) {
            alert(`ID ${jobTypeID} no found !`);
        }
    }
}

export const getDetailJobTypeListAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await getJobTypeDetail();

            let jobDetailArr = [];
            result.data.content.map((item) => {
                let { dsChiTietLoai } = item;
                dsChiTietLoai.map((chiTiet) => {
                    jobDetailArr.push(chiTiet);
                })
            });

            // Remove duplicate obj
            const tempArr = jobDetailArr.filter((obj, index, arr) => {
                return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === index
            })

            let action = {
                type: GET_LIST_JOB_TYPE_DETAIL,
                jobTypeDetailArr: result.data.content,
                jobDetailArr: tempArr
            }
            dispatch(action);

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);

            console.log(errors);
        }
    }
}

export const addDetailJobGroupAction = (formValue) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await addJobDetailGroup(formValue);

            JSON.stringify(localStorage.setItem('job_group_id', result.data.content.id));

            let action = {
                type: ADD_JOB_GROUP,
                jobTypeDetail: result.data.content
            }
            dispatch(action);
            history.push('/admin/list-detail-job-type/add/upload-image-cover');

            alert('Add job type group success !');

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            console.log(errors);
        }
    }
}

export const removeDetailJobGroupAction = (jobGroupID) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await removeJobDetailGroup(jobGroupID);
            alert('Remove job type group success !');
            dispatch(getDetailJobTypeListAction());

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            console.log(errors);
        }
    }
}

export const updateJobDetailAction = (jobGroupID, formValue) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await updateJobDetailGroup(jobGroupID, formValue);

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            console.log(errors);
        }
    }
}

export const uploadImageCoverAction = (jobGroupID, formValue) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await uploadImageCover(jobGroupID, formValue);

            alert('Add image cover success !');
            history.push('/admin/list-detail-job-type');

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            alert(errors.response.data.content);
        }
    }
}

export const getDetailByIDAction = (jobGroupID) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            let result = await getJobTypeDetailByID(jobGroupID);

            localStorage.setItem('job_group_id', result.data.content.id);

            let action = {
                type: GET_JOB_GROUP_INFO,
                jobGroupInfo: result.data.content,
            }
            dispatch(action);

            dispatch(hideLoadingAction);
        } catch (errors) {
            dispatch(hideLoadingAction);
            console.log(errors);
        }
    }
}