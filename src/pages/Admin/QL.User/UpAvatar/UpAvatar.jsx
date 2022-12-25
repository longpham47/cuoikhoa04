import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_AVATAR, USER_ID } from '../../../../utils/varsSetting';
import { history } from '../../../../App';
import { useFormik } from 'formik';
import { Steps } from 'antd'
import { ThemUseruploadAction } from '../../../../redux/Admin/action/UserAction';

function ThemUserUpAvatar() {
    const dispatch = useDispatch();

    let { thongTinUser } = useSelector((state) => {
        return state.QLNDreducer
    })
    const [img, setImg] = useState(() => {
        if (localStorage.getItem(USER_AVATAR)) {
            return localStorage.getItem(USER_AVATAR)
        }
    });
 



    const youAddOrEdit = () => {
        if (thongTinUser !== undefined) {
            return true;
        }
        return false;
    }

    const backPreviusPage = () => {
        history.push(`/admin/list-user/edituser/${localStorage.getItem(USER_ID)}`)
    }

    const formik = useFormik({
        initialValues: {
            hinhAnh: null
        }, onSubmit: (values) => {

            let formData = new FormData();
            for (let key in values) {
                if (key !== 'avatar') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.avatar, values.avatar.name);
                }
            }
            dispatch(ThemUseruploadAction(formData));
            console.log(formData.get('File'));
            
        }
    })

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg') {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImg(e.target.result)
            }
            formik.setFieldValue('avatar', file);

        }
    }

    useEffect(() => {
        youAddOrEdit();
    }, [])

    return (
        <div className='container mx-auto my-5'>
            <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink>
             / <NavLink style={{ textDecoration: 'none', color: 'black' }}  to='/admin/list-user'>Quản lý Người Dùng 
              / </NavLink> {youAddOrEdit === true ? <>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-user/add'>Thêm Người Dùng Mới /</NavLink>
            </>
                : <span onClick={backPreviusPage} className='text-dark' style={{ cursor: 'pointer' }}>Cập nhật Người Dùng /</span>}  Upload Avatar</h4>

            <Steps
                className='w-50 mx-auto my-4'
                size="small"
                current={1}
                items={[
                    {
                        title: 'Thông tin người dùng',
                    },
                    {
                        title: 'Upload avatar',
                    }
                ]}
            />

            <form onSubmitCapture={formik.handleSubmit}>
                <div className="form-group">
                    <input type="file" onChange={handleChangeFile} accept='image/jpg,image/png,image/jpeg' />
                    <br />
                    <img className='mt-5' style={{ width: 250, height: 180 }} src={img} alt="..." />
                    <br />
                    {formik.values.avatar === null ? <button onClick={() => {
                        history.push('/admin/list-user')
                    }} type='button' className='btn btn-success mt-5'>Trở về trang chủ</button>
                        : <button type='submit' className='btn btn-info mt-5'>Cập nhật hình ảnh</button>}
                </div>
            </form>
        </div>
    )
}

export default ThemUserUpAvatar