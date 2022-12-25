import { Steps } from 'antd'
import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { uploadImageCoverAction } from '../../../../../redux/Admin/action/jobTypeDetailAction'
import { history } from '../../../../../App'

function AddImageCover() {

  const dispatch = useDispatch();

  let [imgSrc, setImgSrc] = useState();

  const formik = useFormik({
    initialValues: {
      hinhAnh: null
    },
    onSubmit: (values) => {

      let formData = new FormData();

      formData.append('formFile', values.hinhAnh, values.hinhAnh.name);

      dispatch(uploadImageCoverAction(localStorage.getItem('job_group_id'), formData));
    }
  })

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg') {
      await formik.setFieldValue('hinhAnh', file);
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result)
    }
  }

  return (
    <div className='container mx-auto'>
      <>
        <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-detail-job-type'> / Manage Job Type Detail </NavLink>/ Upload Image</h4>
      </>

      <Steps
        className='w-50 mx-auto my-4'
        size="small"
        current={1}
        items={[
          {
            title: 'Add detail job group',
          },
          {
            title: 'Upload job group image'
          }
        ]}
      />

      <form onSubmitCapture={formik.handleSubmit}>
        <div className="form-group">
          <input type="file" accept='image/jpg,image/png,image/jpeg' onChange={handleChangeFile} />
          <br />
          {imgSrc !== undefined ? <>
            <img className='mt-5' src={imgSrc} style={{ width: 250, height: 180 }} alt="" />
          </> : null}
        </div>
        <div className="form-group">
          {imgSrc === undefined ? <>
            <button onClick={() => {
              history.push('/admin/list-detail-job-type');
            }} className='btn btn-warning' type='button'>Cancel upload image</button>
          </> : <>
            <button className='btn btn-success' type='submit'>Confirm image cover</button>
            <button onClick={() => {
              setImgSrc();
            }} className='btn btn-danger ml-3' type='button'>Remove image cover</button>
          </>}
        </div>
      </form>
    </div>
  )
}

export default AddImageCover