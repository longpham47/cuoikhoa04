import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Steps
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getJobTypeDetail, getJobTypeDetailByID } from '../../../../services/Admin/JobService/jopTypeDetailService';
import { displayLoadingAction, hideLoadingAction } from '../../../../redux/loadingAction';
import { getJobInfoAction, updateJobInfoAction } from '../../../../redux/Admin/action/JobAction';
import { history } from '../../../../App';
import { getJobSearchAction } from '../../../../redux/Admin/action/jobTypeDetailAction';
import { getJobInfo } from '../../../../services/Admin/JobService/jobService';
import './style.css'

const desc = ['Very Bad', 'Bad', 'Normal', 'Good', 'Great'];

function EditJobPage(props) {

  let { id } = props.match.params;

  const dispatch = useDispatch();

  const [state, setState] = useState({
    jobArr: [],
    jobDetailArr: []
  });

  const getJobArr = async () => {
    try {
      dispatch(displayLoadingAction);
      let result = await getJobTypeDetail();

      setState({
        ...state,
        jobArr: result.data.content
      });

      dispatch(hideLoadingAction);

    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log(errors);
    }
  }

  const convertSelectJob = () => {
    return state.jobArr.map((jobItem) => {
      return { label: jobItem.tenNhom, value: jobItem.id }
    })
  }

  const handleChangeJob = async (value) => {
    try {
      dispatch(displayLoadingAction);
      let result = await getJobTypeDetailByID(value);

      setState({
        ...state,
        jobDetailArr: result.data.content.dsChiTietLoai
      })

      dispatch(hideLoadingAction);

    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log(errors);
    }
  }

  const convertSelectDetail = () => {
    return state.jobDetailArr.map((detailItem) => {
      return { label: detailItem.tenChiTiet, value: detailItem.id }
    })
  }

  let { jobTypeDetail } = useSelector((state) => {
    return state.JobTypeDetailReducer
  })

  let { jobInfo } = useSelector((state) => {
    return state.JobReducer
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: jobInfo.id,
      tenCongViec: jobInfo.tenCongViec,
      danhGia: jobInfo.danhGia,
      giaTien: jobInfo.giaTien,
      nguoiTao: jobInfo.nguoiTao,
      hinhAnh: jobInfo.hinhAnh,
      moTa: jobInfo.moTa,
      maChiTietLoaiCongViec: jobTypeDetail.id,
      moTaNgan: jobInfo.moTaNgan,
      saoCongViec: jobInfo.saoCongViec
    },
    validationSchema: Yup.object({
      tenCongViec: Yup.string().required('Job name is not empty !'),
      danhGia: Yup.string().required('Evaluate is not empty !'),
      giaTien: Yup.string().required('Price is not empty !'),
      nguoiTao: Yup.string().required('Creater name is not empty !'),
      moTa: Yup.string().required('Description is not empty !'),
      moTaNgan: Yup.string().required('Short description is not empty !'),
      saoCongViec: Yup.number().min(1, 'Min star is 1 !')
    })
    , onSubmit: (values) => {
      dispatch(updateJobInfoAction(jobInfo.id, values));
    }
  })

  const handleChangeJobDetail = (value) => {
    formik.setFieldValue('maChiTietLoaiCongViec', value);
  }

  const handleChangeRate = (value) => {
    formik.setFieldValue('saoCongViec', value)
  }

  let { saoCongViec } = formik.values;

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const getJobTypeValue = () => {
    return async (dispatch) => {
      try {
        let result = await getJobInfo(id);
        dispatch(getJobSearchAction(result.data.content.maChiTietLoaiCongViec))
      } catch (errors) {
        console.log(errors)
      }
    }
  }

  const paramIsMatch = () => {
    if (id != jobInfo.id) {
      history.push('/error')
    }
  }

  useEffect(() => {
    getJobArr();
    dispatch(getJobInfoAction(id));
    dispatch(getJobTypeValue());
    paramIsMatch();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container mx-auto'>
      <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard</NavLink><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/list-job'> / Manage job </NavLink>/ Edit</h4>

      <Steps
        className='w-50 mx-auto my-4'
        size="small"
        current={0}
        items={[
          {
            title: 'Job Info',
          },
          {
            title: 'Upload Job Image',
          }
        ]}
      />

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Job ID">
          <InputNumber disabled name='id' value={formik.values.id} />
        </Form.Item>

        <Form.Item label="Job Name">
          <Input name='tenCongViec' onChange={formik.handleChange} value={formik.values.tenCongViec} onBlur={formik.handleBlur} allowClear />
          {formik.touched.tenCongViec && formik.errors.tenCongViec ? <span className='alert alert-danger d-block mt-2'>{formik.errors.tenCongViec}</span> : null}
        </Form.Item>

        <Form.Item label="Evaluate">
          <Input className='w-25' type='number' min={1} name='danhGia' onChange={formik.handleChange} value={formik.values.danhGia} onBlur={formik.handleBlur} />
          {formik.touched.danhGia && formik.errors.danhGia ? <span className='w-50 alert alert-danger d-block mt-2'>{formik.errors.danhGia}</span> : null}
        </Form.Item>

        <Form.Item label="Price">
          <Input className='w-25' type='number' name='giaTien' min={1} onChange={formik.handleChange} value={formik.values.giaTien} onBlur={formik.handleBlur} />
          {formik.touched.giaTien && formik.errors.giaTien ? <span className='w-50 alert alert-danger d-block mt-2'>{formik.errors.giaTien}</span> : null}
        </Form.Item>

        <Form.Item label="Creater Name">
          <Input className='w-25' type='number' name='nguoiTao' min={1} onChange={formik.handleChange} value={formik.values.nguoiTao} onBlur={formik.handleBlur} />
          {formik.touched.nguoiTao && formik.errors.nguoiTao ? <span className='w-50 alert alert-danger d-block mt-2'>{formik.errors.nguoiTao}</span> : null}
        </Form.Item>

        <Form.Item label="Image Name">
          <Input disabled name='hinhAnh' onChange={formik.handleChange} value={formik.values.hinhAnh} />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea name='moTa' onChange={formik.handleChange} value={formik.values.moTa} onBlur={formik.handleBlur} />
          {formik.touched.moTa && formik.errors.moTa ? <span className='alert alert-danger d-block mt-2'>{formik.errors.moTa}</span> : null}
        </Form.Item>

        <Form.Item label="Job Group">
          <Select options={convertSelectJob()} onChange={handleChangeJob} placeholder="Chọn nhóm công việc" />
        </Form.Item>

        <Form.Item label="Job Type Detail">
          <Select className='first__select' options={convertSelectDetail()} name='maChiTietLoaiCongViec' onChange={handleChangeJobDetail} id={formik.values.maChiTietLoaiCongViec} placeholder={jobTypeDetail.tenChiTiet} />
        </Form.Item>

        <Form.Item label="Short Description">
          <TextArea name='moTaNgan' onChange={formik.handleChange} value={formik.values.moTaNgan} onBlur={formik.handleBlur} />
          {formik.touched.moTaNgan && formik.errors.moTaNgan ? <span className='alert alert-danger d-block mt-2'>{formik.errors.moTaNgan}</span> : null}
        </Form.Item>

        <Form.Item label="Stars">
          <Rate name='saoCongViec' tooltips={desc} onChange={handleChangeRate} value={formik.values.saoCongViec} onBlur={formik.handleBlur} />
          {saoCongViec ? <span className="ant-rate-text">{desc[saoCongViec - 1]}</span> : ''}
          {formik.touched.saoCongViec && formik.errors.saoCongViec ? <span className='w-50 alert alert-danger d-block mt-2'>{formik.errors.saoCongViec}</span> : null}
        </Form.Item>

        <Form.Item label="Action">
          <button type='submit' className='btn btn-success'>Next Step</button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditJobPage