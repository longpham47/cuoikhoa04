import { history } from "../../../App";
import { binhLuan, CapNhatUser, danhSachUser, getBinhLuan, getTCV, LayThongTinUser, listThueCongViec, postBinhLuan, postThueCongViec, putBinhLuan, putTCV, searchCMT, searchTCV, searchUser, ThemUser, ThemUserupload, xoaBL, xoaTCV, xoaUser } from "../../../services/Admin/UserService/UserService";
import { USER_AVATAR,USER_ID } from "../../../utils/varsSetting";


export const danhSachUserAction = (name="") => {
    return async (dispatch) => {
        try {
            const result = await danhSachUser(name)
            dispatch({
                type: 'GET_USER_LIST',
                arrUser: result.data.content
            })
        } catch (error) {
        }
    }
}

export const ThemUserAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await ThemUser(formData);
            alert('Thêm người dùng thành công !');
            history.push('/admin/list-user');
        } catch (error) {          
            alert("Thêm thất bại! Email bị trùng    ")
        }

    }
}
export const LayThongTinUserAction = (id) => { 
    return async (dispatch) => {
        try {
            const result = await LayThongTinUser(id)
            let action = {
                type : "GET_THONG_TIN_USER",
                thongTinUser : result.data.content,
            } 
            dispatch(action);
            history.push(`/admin/list-user/edituser/${result.data.content.id}`)
        } catch (error) {       
        }
    }
 }

 export const CapNhatUserAction = (id) => { 
    return async (dispatch) => {
        try {
            const result = await CapNhatUser(id)
            alert('Cập nhật người dùng thành công !');         
        } catch (error) {
        
            alert("Cập nhật thất bại!")
        }
    }
  }

export const ThemUseruploadAction = (formData,USER_ID) => {
    return async (dispatch) => {
        try {
            const result = await ThemUserupload(formData,USER_ID);
            alert('Thêm người dùng thành công !');
            localStorage.removeItem(USER_ID);
            localStorage.removeItem(USER_AVATAR);
          

        } catch (error) {
         
            alert("Thêm thất bại!")
        }

    }

}

export const xoaUserAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await xoaUser(id);
            alert('Xoá người dùng thành công !');
           
            dispatch(danhSachUserAction());

        } catch (error) {
          
            alert("Thao tác thất bại!")
        }

    }
}

export const searchUserAction = (name) => {
    return async (dispatch) => {
        try {
            const result = await searchUser(name);         

            dispatch({
                type : "TIM_USER",
                arrUser:result.data.content
            })
        } catch (error) {
          
            alert("Thao tác thất bại!")
        }

    }
}
// dịch vụ action
export const listThueCongViecAction = () => {
    return async (dispatch) => {
        try {
            const result = await listThueCongViec();
            dispatch({
                type: 'LIST_TCV',
                arrTCV: result.data.content
            })

        } catch (error) {
        

        }
    }
}


export const ThemCongViecAction = () => {
    return async (dispatch) => {
        try {
            const result = await postThueCongViec();
            alert('Thêm người thuê công việc thành công !');
           

        } catch (error) {
         
            alert("Thêm thất bại!")
        }

    }

}
export const getTCVAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await getTCV(id);
            
         
            dispatch({
                type : "GET_THONG_TIN_TCV",
                thongtinTCV : result.data.content
            });

        } catch (error) {
           
            alert("Thao tác thất bại!")
        }

    }
}

export const putTCVAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await putTCV(id);
            alert("cập nhật thành công!")
         
         

        } catch (error) {
         
            alert("Thao tác thất bại!")
        }

    }
}



export const xoaTCVAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await xoaTCV(id);
            alert('Xoá thành công !');
           
            dispatch(listThueCongViecAction());

        } catch (error) {
          
            alert("Thao tác thất bại!")
        }

    }
}

export const searchTCVAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await searchTCV(id);         
         
            dispatch({
                type : "TIM_TCV",
                arrTCV:result.data.content
            })


        } catch (error) {
          
            alert("Thao tác thất bại!")
        }

    }
}
// bình luận
export const BinhLuanAction = () => { 
    return async (dispatch) => {
        try {
            const result = await binhLuan();
            dispatch({
                type: 'LIST_BL',
                arrBL: result.data.content
            })

        } catch (error) {
          

        }
    }
 }
 export const postBinhLuanAction = () => {
    return async (dispatch) => {
        try {
            const result = await postBinhLuan();
            alert('Thêm Bình Luận thành công !');
          

        } catch (error) {
          
            alert("Thêm thất bại!")
        }

    }

}

export const getBinhLuanAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await getBinhLuan(id);
         
         

        } catch (error) {
           
            alert("Thao tác thất bại!")
        }

    }
}


export const xoaBLAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await xoaBL(id);
            alert('Xoá thành công !');
         
            dispatch(BinhLuanAction());

        } catch (error) {
         
            alert("Thao tác thất bại!")
        }

    }
}

export const searchCMTAction = (maCongViec) => {
    return async (dispatch) => {
        try {
            const result = await searchCMT(maCongViec);         
           
            dispatch({
                type : "TIM_CMT",
                arrBL:result.data.content
            })


        } catch (error) {
         
            alert("Thao tác thất bại!")
        }

    }
}
