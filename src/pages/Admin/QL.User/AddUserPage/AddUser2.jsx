import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Steps,
  Switch,
  TreeSelect,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import moment from 'moment';
import { render } from 'react-dom';
import { useDispatch } from 'react-redux';
import { ThemUserAction, ThemUseruploadAction } from '../../../../redux/Admin/action/UserAction';
const ThemUser2 = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const dispatch = useDispatch();




  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(' tên không được để trống !'),
      email: Yup.string().required('Email không được để trống !').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng !'),
      password: Yup.string().required('Mật khẩu không được để trống !').matches(/^(?=.*\d)(?=.*[A-Z a-z])(?!.*[ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý])(?!.*\s).{0,}$/, 'Mật khẩu bao gồm chữ và ký tự số, không bao gồm tiếng việt có dấu và khoảng trắng !'),
      phone: Yup.string().required("số điện thoại không được để trống").matches(/^(?=.*\d)^[0-9]+$/, "số điện thoại không đúng định dạng"),
      birthday: Yup.string().required('Thời gian không được để trống !').length(10, 'Thời gian không được để trống !'),
      danhGia: Yup.number().min(1, 'Evaluate is not empty !'),
    }),
    onSubmit: (values) => {
      dispatch(ThemUserAction(values))
      
     
    }
  })


  const handleChangeBirthday = (value) => {
    let ngaysinh = moment(value).format('DD/MM/YYYY');
    formik.setFieldValue('birthday', ngaysinh)

  }
  const handleChangGender = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  };
  const handleChangeskill = async (value) => {
    await formik.setFieldValue('certification', value);
  };

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
          to='/admin/list-user'>Manage User / </NavLink>Add User !</h4>
      <Steps
        className='w-50 mx-auto my-4'
        size="small"
        current={0}
        items={[
          {
            title: 'User Info',
          },
        
        ]}
      />
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="name">
        <Input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name ? (
                    <div className='alert alert-danger'>{formik.errors.name}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="email">
        <Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email ? (
                    <div className='alert alert-danger'>{formik.errors.email}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="password">
        <Input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password ? (
                    <div className='alert alert-danger'>{formik.errors.password}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="phone">
        <Input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.phone ? (
                    <div className='alert alert-danger'>{formik.errors.phone}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="Birthday">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeBirthday} />
        {formik.errors.birthday ? (
                    <div className='alert alert-danger'>{formik.errors.birthday}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="gender" valuePropName="checked">
      Female <Switch onChange={handleChangGender('gender')} /> Male
      </Form.Item>
      <Form.Item label="role">
        <Input name='role' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.hoTen ? (
                    <div className='alert alert-danger'>{formik.errors.hoTen}</div>
                ) : null}
      </Form.Item>
      <Form.Item label="submit">
        <button type='submit' className='btn btn-success'>Xác nhận thông tin</button>
      </Form.Item>
    </Form>
  );
};
export default ThemUser2;