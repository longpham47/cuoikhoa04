import React from 'react'
import { Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { addJobTypeAction } from '../../../../../redux/Admin/action/jobTypeAction';
import { getListJobAction } from '../../../../../redux/Admin/action/JobAction';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

function AddJobType() {

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {
      tenLoaiCongViec: ''
    }, validationSchema: Yup.object({
      tenLoaiCongViec: Yup.string().required('Job type name is not empty !')
    }), onSubmit: (values) => {
      dispatch(addJobTypeAction(values));
      dispatch(getListJobAction());
    }
  })

  return (
    <div className='container mx-auto'>

      <h4 className="text-info my-3"><NavLink className='myNavLink' to='/admin'>Dashboard </NavLink> <NavLink className='myNavLink' to='/admin/list-job-type'>/ Manage Job Type / </NavLink> Add</h4>

      <Form {...layout} form={form} name="control-hooks" onSubmitCapture={formik.handleSubmit}>

        <Form.Item
          label='Job type name'>
          <Input name='tenLoaiCongViec' allowClear onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.tenLoaiCongViec && formik.errors.tenLoaiCongViec ? <>
            <div className="alert alert-danger">{formik.errors.tenLoaiCongViec}</div>
          </> : null}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <button className='btn btn-success' type='submit'>Add job type</button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddJobType