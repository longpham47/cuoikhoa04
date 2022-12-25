import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import moment from 'moment';
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CapNhatUserAction, LayThongTinUserAction, ThemUserAction, ThemUseruploadAction } from '../../../../redux/Admin/action/UserAction';
import { useEffect } from 'react';


const EditUser = (props) => {
 
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [img, setImg] = useState('');
  let { thongTinUser } = useSelector((state) => {
    return state.QLNDreducer
  })
 
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(LayThongTinUserAction(id));
  }, [])





  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id : thongTinUser.id, 
      name: thongTinUser.name,
      email: thongTinUser.email,
      password: thongTinUser.password,
      phone: thongTinUser.phone,
      birthday: thongTinUser.birthday,
      gender: thongTinUser.gender,
      role: thongTinUser.role,
    },
    onSubmit: (values) => {
      dispatch(CapNhatUserAction(thongTinUser.id,values))
     
    }
  })


  const handleChangeBirthday = (value) => {
    let ngaysinh = moment(value);
    formik.setFieldValue('birthday', ngaysinh)

  }
  const handleChangGender = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }

  }
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
          to='/admin/list-user'>Manage User / </NavLink>Edit </h4>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="name">
        <Input name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
      </Form.Item>
      <Form.Item label="email">
        <Input name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
      </Form.Item>
      <Form.Item label="password">
        <Input name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
      </Form.Item>
      <Form.Item label="phone">
        <Input name='phone' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} />
      </Form.Item>
      <Form.Item label="birthday">
        <DatePicker format="DD/MM/YYYY" onChange={handleChangeBirthday} value={moment(formik.values.birthday)} />
      </Form.Item>

      <Form.Item label="gender" valuePropName="checked">
      Female<Switch onChange={handleChangGender('gender')} checked={formik.values.gender} /> Male
      </Form.Item>
      <Form.Item label="role">
        <Input name='role' onChange={formik.handleChange} value={formik.values.role} onBlur={formik.handleBlur} />
      </Form.Item>
      <Form.Item label="submit">
        <button type='submit' className='btn btn-success'>Xác nhận thông tin cập nhật</button>
      </Form.Item>
    </Form>
  );
};
export default EditUser;
