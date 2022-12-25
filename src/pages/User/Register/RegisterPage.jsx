import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import './style.css'
import { Button, Col, Form, Input, Row, Select, Space, Tag, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { TweenOneGroup } from "rc-tween-one";
import moment from "moment";
import { registerAction } from "../../../redux/User/action/signInAndSignUpAction";
import { history } from "../../../App";
import * as Yup from 'yup';

function RegisterPage() {

    document.title = 'Register | Fiverr'

    const dispatch = useDispatch();

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    // Skill Tag Ant Design Config
    const [skill_tags, setSkillTags] = useState([]);
    const [inputSkillVisible, setInputSkillVisible] = useState(false);
    const [inputSkillValue, setInputSkillValue] = useState("");
    const inputSkillRef = useRef(null);

    useEffect(() => {
        if (inputSkillVisible) {
            inputSkillRef.current?.focus();
        }
    }, []);

    const handleSkillClose = (removedTag) => {
        const newTags = skill_tags.filter((tag) => tag !== removedTag);
        setSkillTags(newTags);
    };

    const showSkillInput = () => {
        setInputSkillVisible(true);
    };
    
    const handleSkillInputChange = (e) => {
        if (e.target.value !== ' ') {
            setInputSkillValue(e.target.value);
        }
    };

    const handleSkillInputConfirm = () => {
        if (inputSkillValue && skill_tags.indexOf(inputSkillValue) === -1) {
            setSkillTags([...skill_tags, inputSkillValue]);
        }
        setInputSkillVisible(false);
        setInputSkillValue("");
    };

    const forSkillMap = (tag) => {
        const tagSkillElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleSkillClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span
                key={tag}
                style={{
                    display: "inline-block"
                }}
            >
                {tagSkillElem}
            </span>
        );
    };

    const tagSkillChild = skill_tags.map(forSkillMap);

    // Cert Tag Ant Design Config
    const [cert_tags, setCertTags] = useState([]);
    const [inputCertVisible, setInputCertVisible] = useState(false);
    const [inputCertValue, setInputCertValue] = useState("");
    const inputCertRef = useRef(null);

    useEffect(() => {
        if (inputCertVisible) {
            inputCertRef.current?.focus();
        }
    }, []);

    const handleCertClose = (removedTag) => {
        const newTags = cert_tags.filter((tag) => tag !== removedTag);
        setCertTags(newTags);
    };

    const showCertInput = () => {
        setInputCertVisible(true);
    };

    const handleCertInputChange = (e) => {
        if (e.target.value !== ' ') {
            setInputCertValue(e.target.value);
        }
    };

    const handleCertInputConfirm = () => {
        if (inputCertValue && cert_tags.indexOf(inputCertValue) === -1) {
            setCertTags([...cert_tags, inputCertValue]);
        }
        setInputCertVisible(false);
        setInputCertValue("");
    };

    const forCertMap = (tag) => {
        const tagSkillElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleCertClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span
                key={tag}
                style={{
                    display: "inline-block"
                }}
            >
                {tagSkillElem}
            </span>
        );
    };
    
    const tagCertChild = cert_tags.map(forCertMap);

    const emptyOrNot = (value) => {
        if (value === '') {
            return true;
        } else {
            return false;
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPass: '',
            phone: '',
            birthday: '',
            gender: true,
            role: 'USER',
            skill: [],
            certification: []
        }, validationSchema: Yup.object({
            name: Yup.string().required('Name is not empty !').matches(
                /^(?=.*\d)(?=.*[A-Z a-z])(?!.*[ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý])(?!.*\s).{0,}$/,
                "Name is wrong format !"
            ),
            email: Yup.string().required('Email is not empty !').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is wrong format !'),
            password: Yup.string().required('Password is not empty !').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "Password is wrong format !"),
            confirmPass: Yup.string().required('Confirm password is not empty !').oneOf([Yup.ref("password"), null], "Confirm password is not match !"),
            phone: Yup.string().required('Phone is not empty !').matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, "Phone is wrong format !"),
            birthday: Yup.string().required('Birthday is not empty !')
        }), onSubmit: (values) => {

            delete values.confirmPass;
            values.skill = [...skill_tags]
            values.certification = [...cert_tags];
            values.name = (values.name.replace(/\s+/g, ' ')).trim();

            dispatch(registerAction(values));
        }
    })

    const handleChangeDatePicker = (value) => {
        let dateFormat = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('birthday', dateFormat);
    }

    let { name, email, password, confirmPass, phone } = formik.values;

    return (
        <div className='register__content' >
            <div className="content__form container my-5">
                <div className="my__form">
                    <h3 className='text-center text-white'>Sign Up Form</h3>
                    <Form
                        layout="vertical"
                        onSubmitCapture={formik.handleSubmit}
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Form.Item
                            label="Name:"
                        >
                            <Input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} allowClear />
                            {formik.touched.name && formik.errors.name ? <div className={emptyOrNot(name) ? 'alert alert-danger' : 'alert alert-warning'}>{formik.errors.name}</div> : null}
                        </Form.Item>

                        <Form.Item
                            label="Email:"
                        >
                            <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} allowClear />
                            {formik.touched.email && formik.errors.email ? <div className={emptyOrNot(email) ? 'alert alert-danger' : 'alert alert-warning'}>{formik.errors.email}</div> : null}
                        </Form.Item>

                        <Form.Item>
                            <Row className="pass__field">
                                <Col xl={12}>
                                    <Space direction="vertical">
                                        <Input.Password
                                            visibilityToggle={{
                                                visible: passwordVisible,
                                                onVisibleChange: setPasswordVisible,
                                            }}
                                            name='password'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            allowClear
                                            placeholder="Input password"
                                        />
                                        {formik.touched.password && formik.errors.password ? <div className={emptyOrNot(password) ? 'alert alert-danger' : 'alert alert-warning'}>{formik.errors.password}</div> : null}
                                    </Space>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item>
                                        <Space direction="vertical">
                                            <Input.Password
                                                visibilityToggle={{
                                                    visible: passwordVisible,
                                                    onVisibleChange: setPasswordVisible,
                                                }}
                                                name='confirmPass'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                allowClear
                                                placeholder="Confirm password"
                                            />
                                            {formik.touched.confirmPass && formik.errors.confirmPass ? <div className={emptyOrNot(confirmPass) ? 'alert alert-danger' : 'alert alert-warning'}>{formik.errors.confirmPass}</div> : null}
                                            <Button
                                                style={{
                                                    width: 80,
                                                }}
                                                onClick={() => setPasswordVisible((prevState) => !prevState)}
                                            >
                                                {passwordVisible ? 'Hide' : 'Show'}
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Phone:"
                        >
                            <Input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} allowClear />
                            {formik.touched.phone && formik.errors.phone ? <div className={emptyOrNot(phone) ? 'alert alert-danger' : 'alert alert-warning'}>{formik.errors.phone}</div> : null}
                        </Form.Item>

                        <Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item>
                                        <Space direction="vertical">
                                            <DatePicker name="birthday" format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} onBlur={formik.handleBlur} placeholder="Birthday" />
                                            {formik.touched.birthday && formik.errors.birthday ? <div className="alert alert-danger">{formik.errors.birthday}</div> : null}
                                        </Space>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item extra="Default gender is male">
                                        <Select
                                            name="gender"
                                            onChange={(value) => {
                                                return formik.setFieldValue('gender', value)
                                            }}
                                            placeholder="Gender"
                                            style={{
                                                width: 120,
                                            }}
                                            options={[
                                                {
                                                    value: true,
                                                    label: 'Male',
                                                },
                                                {
                                                    value: false,
                                                    label: 'Female',
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Row>
                                <Col span={12}>
                                    <div
                                        style={{
                                            marginBottom: 16,
                                        }}
                                    >
                                        <TweenOneGroup
                                            enter={{
                                                scale: 0.8,
                                                opacity: 0,
                                                type: 'from',
                                                duration: 100,
                                            }}
                                            onEnd={(e) => {
                                                if (e.type === 'appear' || e.type === 'enter') {
                                                    e.target.style = 'display: inline-block';
                                                }
                                            }}
                                            leave={{
                                                opacity: 0,
                                                width: 0,
                                                scale: 0,
                                                duration: 200,
                                            }}
                                            appear={false}
                                        >
                                            {tagSkillChild}
                                        </TweenOneGroup>
                                    </div>
                                    {inputSkillVisible && (
                                        <Input
                                            ref={inputSkillRef}
                                            type="text"
                                            size="small"
                                            style={{
                                                width: 78,
                                            }}
                                            value={inputSkillValue}
                                            onChange={handleSkillInputChange}
                                            onBlur={handleSkillInputConfirm}
                                            onPressEnter={handleSkillInputConfirm}
                                        />
                                    )}
                                    {!inputSkillVisible && (
                                        <Tag onClick={showSkillInput} className="site-tag-plus skill-tag">
                                            Add skill
                                        </Tag>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <div
                                        style={{
                                            marginBottom: 16,
                                        }}
                                    >
                                        <TweenOneGroup
                                            enter={{
                                                scale: 0.8,
                                                opacity: 0,
                                                type: 'from',
                                                duration: 100,
                                            }}
                                            onEnd={(e) => {
                                                if (e.type === 'appear' || e.type === 'enter') {
                                                    e.target.style = 'display: inline-block';
                                                }
                                            }}
                                            leave={{
                                                opacity: 0,
                                                width: 0,
                                                scale: 0,
                                                duration: 200,
                                            }}
                                            appear={false}
                                        >
                                            {tagCertChild}
                                        </TweenOneGroup>
                                    </div>
                                    {inputCertVisible && (
                                        <Input
                                            ref={inputCertRef}
                                            type="text"
                                            size="small"
                                            style={{
                                                width: 78,
                                            }}
                                            value={inputCertValue}
                                            onChange={handleCertInputChange}
                                            onBlur={handleCertInputConfirm}
                                            onPressEnter={handleCertInputConfirm}
                                        />
                                    )}
                                    {!inputCertVisible && (
                                        <Tag onClick={showCertInput} className="site-tag-plus cert-tag">
                                            Add cert
                                        </Tag>
                                    )}
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Action:"
                        >
                            <Row>
                                <Col xl={4}>
                                    <button className="site-tag-plus" type="submit">
                                        Sign Up
                                    </button>
                                </Col>
                                <Col xl={4}>
                                    <button className="site-tag-plus bg-dark" onClick={() => {
                                        history.push('/')
                                    }} type="button">
                                        Home
                                    </button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default RegisterPage