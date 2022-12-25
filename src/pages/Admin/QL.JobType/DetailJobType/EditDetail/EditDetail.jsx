import React from 'react'
import { Steps, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getListJobTypeAction } from '../../../../../redux/Admin/action/jobTypeAction';
import { getDetailByIDAction, updateJobDetailAction } from '../../../../../redux/Admin/action/jobTypeDetailAction';
import { getDetailJobTypeListAction } from '../../../../../redux/Admin/action/jobTypeDetailAction';
import './style.css'
import { history } from '../../../../../App';
import { CLEAR__ARR } from '../../../../../redux/Admin/type/JobTypeDetailType'

function EditDetail(props) {

  let dispatch = useDispatch();

  let { id } = props.match.params;

  const paramIsMatch = () => {
    if (id !== localStorage.getItem('job_group_id')) {
      history.push('/error')
    }
  }

  let { jobTypeArr } = useSelector((state) => {
    return state.JobTypeReducer;
  });

  let { jobTypeDetail, jobDetailArr } = useSelector((state) => {
    return state.JobTypeDetailReducer;
  });

  const convertSelected = () => {
    return jobTypeArr.map((item) => {
      return { label: item.tenLoaiCongViec, value: item.id }
    })
  }

  // Default array
  const arrDefault = jobDetailArr;

  const options = [];

  arrDefault.map((item) => {
    return options.push({
      label: item.tenChiTiet,
      value: item.id
    })
  })

  // Array of item 
  let arrByItem = JSON.parse(localStorage.getItem('job_detail_arr'));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: jobTypeDetail.id,
      maLoaiCongViec: jobTypeDetail.maLoaiCongviec,
      tenChiTiet: jobTypeDetail.tenNhom,
      danhSachChiTiet: jobTypeDetail.dsChiTietLoai
    },
    validationSchema: Yup.object({
      tenChiTiet: Yup.string().required('Job type group name is not empty !')
    }),
    onSubmit: (values) => {

      let tempArr = [];
      if (typeof formik.values.danhSachChiTiet[0] === 'object') {
        formik.values.danhSachChiTiet.map((item) => {
          tempArr.push(item.id);
          return formik.setFieldValue('danhSachChiTiet', formik.values.danhSachChiTiet = [...tempArr]);
        })
      }

      dispatch(updateJobDetailAction(formik.values.id, values));
      alert('Edit job detail list success !');
      history.push(`/admin/list-detail-job-type/edit/edit-image-cover/${jobTypeDetail.id}`);

    }
  });

  useEffect(() => {
    paramIsMatch();
    dispatch(getListJobTypeAction());
    dispatch(getDetailByIDAction(localStorage.getItem('job_group_id')));
    dispatch(getDetailJobTypeListAction());
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('job_detail_arr');
      localStorage.removeItem('job_type_id');

      let emptyArr = []
      let action = {
        type: CLEAR__ARR,
        emptyArr: emptyArr
      }
      dispatch(action)
    }
  }, [])

  return (
    <div className='container mx-autp'>
      <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-detail-job-type'> / Manage Job Type Detail </NavLink>/ Edit</h4>

      <Steps
        className='w-50 mx-auto my-4'
        size="small"
        current={0}
        items={[
          {
            title: 'Edit detail job group',
          },
          {
            title: 'Edit job group image'
          }
        ]}
      />

      <Form onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
      >

        <Form.Item label="Job Type">
          <Select
            className='first__select'
            style={{
              width: 185
            }}
            options={convertSelected()}
            placeholder={jobTypeArr.map((item) => {
              if (item.id == formik.values.maLoaiCongViec) {
                return item.tenLoaiCongViec
              }
            })}
            onChange={(value) => {
              formik.setFieldValue('maLoaiCongViec', value)
            }}
          />
        </Form.Item>

        <Form.Item
          label="Job Type Group Name"
        >
          <Input name='tenChiTiet' value={formik.values.tenChiTiet} onChange={formik.handleChange} onBlur={formik.handleBlur} allowClear></Input>
          {formik.touched.tenChiTiet && formik.errors.tenChiTiet ? <>
            <div className="alert alert-danger">{formik.errors.tenChiTiet}</div>
          </> : null}
        </Form.Item>

        <Form.Item label="Job Detail">
          <Select
            name="danhSachChiTiet"
            className='container mx-auto'
            mode='multiple'
            allowClear
            placeholder="Please select"
            defaultValue={arrByItem.map((item) => {
              return { label: item.tenChiTiet, value: item.id }
            })}
            onChange={async (value) => {
              await formik.setFieldValue('danhSachChiTiet', value)
            }}
            options={options}
          />
        </Form.Item>

        <Form.Item label="Action">
          <button className='btn btn-success' type='submit'>Next Step</button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default EditDetail