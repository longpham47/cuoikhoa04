import { Steps, Select } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { addDetailJobGroupAction, getDetailJobTypeListAction } from '../../../../../redux/Admin/action/jobTypeDetailAction';
import { useEffect } from 'react';
import { getListJobTypeAction } from '../../../../../redux/Admin/action/jobTypeAction';

function AddDetail() {

  let dispatch = useDispatch();

  let { jobDetailArr } = useSelector((state) => {
    return state.JobTypeDetailReducer;
  });

  let { jobTypeArr } = useSelector((state) => {
    return state.JobTypeReducer;
  });

  const convertSelected = () => {
    return jobTypeArr.map((jobItem) => {
      return { label: jobItem.tenLoaiCongViec, value: jobItem.id }
    })
  }

  const handleChange = (value) => {
    formik.setFieldValue('maLoaiCongViec', value)
  };

  const formik = useFormik({
    initialValues: {
      maLoaiCongViec: '',
      tenChiTiet: '',
      danhSachChiTiet: []
    },
    validationSchema: Yup.object({
      maLoaiCongViec: Yup.string().required('Job type id is not empty !'),
      tenChiTiet: Yup.string().required('Job type group name is not empty !')
    }),
    onSubmit: (values) => {
      dispatch(addDetailJobGroupAction(values));
      alert('Add job detail list success !');
    }
  });

  const myArr = jobDetailArr;

  const options = [];

  for (let i = 0; i < myArr.length; i++) {
    options.push({
      label: myArr[i].tenChiTiet,
      value: myArr[i].id
    });
  }

  const handleChangeDetail = async (value) => {
    await formik.setFieldValue('danhSachChiTiet', value);
  };

  useEffect(() => {
    dispatch(getListJobTypeAction());
    dispatch(getDetailJobTypeListAction());
  }, []);

  return (
    <div className='container mx-auto'>
      <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink> <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-detail-job-type'> / Manage Job Type Detail</NavLink> / Add</h4>

      <Steps
        className='w-50 mx-auto my-4'
        size="small"
        current={0}
        items={[
          {
            title: 'Add detail job group',
          },
          {
            title: 'Upload job group image'
          }
        ]}
      />

      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
      >
        <Form.Item
          label="Job Type"
        >
          <Select
            style={{
              width: 185,
            }}
            onChange={handleChange}
            options={convertSelected()}
          />
          {formik.touched.maLoaiCongViec && formik.errors.maLoaiCongViec ? <>
            <div className="alert alert-danger">{formik.errors.maLoaiCongViec}</div>
          </> : null}
        </Form.Item>

        <Form.Item
          label="Job Type Group Name"
        >
          <Input allowClear name='tenChiTiet' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.tenChiTiet && formik.errors.tenChiTiet ? <>
            <div className="alert alert-danger">{formik.errors.tenChiTiet}</div>
          </> : null}
        </Form.Item>

        <Form.Item label='Job Detail'>
          <Select
            className='container mx-auto'
            mode="multiple"
            allowClear
            placeholder="Please select"
            onChange={handleChangeDetail}
            options={options}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button className='btn btn-success' type='submit'>Add job detail group</button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddDetail