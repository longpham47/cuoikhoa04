import React, { useEffect } from 'react'
import { Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { getJobTypeByIDAction, updateJobTypeAction } from '../../../../../redux/Admin/action/jobTypeAction';
import { getListJobAction } from '../../../../../redux/Admin/action/JobAction';
import { history } from '../../../../../App';

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

function EditJobType(props) {

  let { id } = props.match.params;

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { jobTypeInfo } = useSelector((state) => {
    return state.JobTypeReducer
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenLoaiCongViec: jobTypeInfo.tenLoaiCongViec ?? ''
    }, validationSchema: Yup.object({
      tenLoaiCongViec: Yup.string().required('Job type name is not empty !')
    }), onSubmit: (values) => {
      dispatch(updateJobTypeAction(id, values));
      dispatch(getListJobAction());
    }
  })

  const paramIsMatch = () => {
    if (localStorage.getItem('Job_Type_ID') !== undefined) {
      if (id != localStorage.getItem('Job_Type_ID')) {
        history.push('/error')
      }
    }
  }

  useEffect(() => {
    dispatch(getJobTypeByIDAction(id));
    paramIsMatch()
  }, [])

  useEffect(() => {
    return () => {
      localStorage.removeItem('Job_Type_ID');
    }
  }, [])

  return (
    <div className='container mx-auto'>

      <h4 className="text-info my-3"><NavLink className='myNavLink' to='/admin'>Dashboard /</NavLink><NavLink className='myNavLink' to='/admin/list-job-type'> Manage job type / </NavLink> Edit</h4>

      <Form {...layout} form={form} name="control-hooks" onSubmitCapture={formik.handleSubmit}>

        <Form.Item
          label='Job type name'>
          <Input name='tenLoaiCongViec' value={formik.values.tenLoaiCongViec} allowClear onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.tenLoaiCongViec && formik.errors.tenLoaiCongViec ? <>
            <div className="alert alert-danger">{formik.errors.tenLoaiCongViec}</div>
          </> : null}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <button className='btn btn-info' type='submit'>Edit job type</button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditJobType