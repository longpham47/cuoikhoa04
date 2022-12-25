import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import moment from 'moment';
import { postBinhLuanAction, ThemCongViecAction } from '../../../../../redux/Admin/action/UserAction';
import { useDispatch } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
const AddComment = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      // id: 0,
      maCongViec: 0,
      maNguoiBinhLuan: 0,
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: 3
    },
    validationSchema: Yup.object({
      maCongViec: Yup.string().required(' mã công việc không được để trống !'),
      maNguoiBinhLuan: Yup.string().required(' mã người bình luận không được để trống !'),
      ngayBinhLuan: Yup.string().required('Thời gian không được để trống !').length(10, 'Thời gian không được để trống !'),
      noiDung: Yup.string().required('nội dung không được để trống !'),
      saoBinhLuan: Yup.number().required('Số sao không được để trống !').min(1, 'Đánh giá tối thiểu là 1 !').max(5, 'Đánh giá tối thiểu là 5 !')
    }),
    onSubmit: (values) => {

      dispatch(postBinhLuanAction(values));
    },
  })

  const handleChangeDAY = (value) => {
    let ngayBinhLuan = moment(value).format('DD/MM/YYYY');
    formik.setFieldValue('ngayBinhLuan', ngayBinhLuan)

  }
  const desc = ['Very Bad', 'Bad', 'Normal', 'Good', 'Great'];
  const handleChangeRate = (value) => {
    formik.setFieldValue('saoBinhLuan', value)
  }
  let { saoBinhLuan } = formik.values;


  return (
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

      <h4 className='text-info my-3'><NavLink style={{ textDecoration: 'none', color: 'black' }}
        to='/admin'>Dashboard</NavLink> / <NavLink style={{ textDecoration: 'none', color: 'black' }}
          to='/admin/list-comment'>Comment History / </NavLink>Add Comment </h4>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Rent Job ID" >
        <Input name='maCongViec' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.maCongViec ? (
          <div className='alert alert-danger'>{formik.errors.maCongViec}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Commentator ID">
        <Input name='maNguoiBinhLuan' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.maNguoiBinhLuan ? (
          <div className='alert alert-danger'>{formik.errors.maNguoiBinhLuan}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Comment Day">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDAY} />
        {formik.errors.ngayBinhLuan ? (
          <div className='alert alert-danger'>{formik.errors.ngayBinhLuan}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Content">
        <TextArea name='noiDung' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.noiDung && formik.errors.noiDung ? <span className='alert alert-danger d-block mt-2'>{formik.errors.noiDung}</span> : null}
      </Form.Item>


      <Form.Item label="Evaluate">
        <Rate name='saoCongViec' tooltips={desc} onChange={handleChangeRate} value={saoBinhLuan} />
        {saoBinhLuan ? <span className="ant-rate-text">{desc[saoBinhLuan - 1]}</span> : ''}
        {formik.touched.saoCongViec && formik.errors.saoCongViec ? <span className='w-50 alert alert-danger d-block mt-2'>{formik.errors.saoCongViec}</span> : null}
      </Form.Item>
      <Form.Item label="submit">
        <button type='submit' className='btn btn-success'>Xác nhận thông tin</button>
      </Form.Item>
    </Form>
  );
};
export default AddComment
