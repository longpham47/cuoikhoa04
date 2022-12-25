import { getInfoHireJob } from "../../../services/User/getInfoHireJobService";

export const getInfoHireJobAction = (infoHireJob) => {
    return async (dispatch) => {
        try {
            const result = await getInfoHireJob(infoHireJob);
        } catch (error) {
            console.log(error)
        }
    }
}