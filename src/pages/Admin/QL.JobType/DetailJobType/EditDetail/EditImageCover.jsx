import React from 'react'
import { Steps } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImageCoverAction } from '../../../../../redux/Admin/action/jobTypeDetailAction'
import { useEffect } from 'react'
import { getDetailByIDAction } from '../../../../../redux/Admin/action/jobTypeDetailAction';
import { history } from '../../../../../App'

function EditImageCover() {

    const dispatch = useDispatch();

    let { jobTypeDetail } = useSelector((state) => {
        return state.JobTypeDetailReducer;
    });

    const [imgSrc, setImgSrc] = useState(jobTypeDetail.hinhAnh);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            hinhAnh: jobTypeDetail.hinhAnh
        },
        onSubmit: (values) => {
            let formData = new FormData();

            formData.append('formFile', values.hinhAnh, values.hinhAnh.name);

            dispatch(uploadImageCoverAction(jobTypeDetail.id, formData));

        }
    })

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
            await formik.setFieldValue('hinhAnh', file);
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        }
    }

    useEffect(() => {
        dispatch(getDetailByIDAction(localStorage.getItem('job_group_id')));
    }, [])

    useEffect(() => {
        setImgSrc(jobTypeDetail.hinhAnh)
    }, [jobTypeDetail])

    useEffect(() => {
        return () => {
            localStorage.removeItem('job_group_id');
        }
    }, [])

    return (
        <div className='container mx-auto'>
            <>
                <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-detail-job-type'> / Manage Job Type Detail </NavLink>/ Edit image</h4>
            </>

            <Steps
                className='w-50 mx-auto my-4'
                size="small"
                current={1}
                items={[
                    {
                        title: 'Edit detail job group',
                    },
                    {
                        title: 'Edit job group image'
                    }
                ]}
            />

            <form onSubmitCapture={formik.handleSubmit}>
                <div className="form-group">
                    <input type="file" accept='image/jpg,image/png,image/jpeg' onChange={handleChangeFile} />
                    <br />
                    <img className='mt-5' src={imgSrc} style={{ width: 250, height: 180 }} alt="" />
                </div>
                <div className="form-group">
                    {imgSrc !== formik.values.hinhAnh ? <>
                        <button className='btn btn-success' type='submit'>Confirm edit image</button>
                    </> : <>
                        <button onClick={() => {
                            history.push('/admin/list-detail-job-type')
                        }} className='btn btn-warning' type='button'>Cancel edit image</button>
                    </>}

                </div>
            </form>

        </div>
    )
}

export default EditImageCover