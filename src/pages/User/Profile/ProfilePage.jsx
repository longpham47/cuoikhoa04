import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import { deleteHireJobsAcion, getHireJobsAction, getInfoByIDAction, updateUserAvatarAction, updateUserInfoAction } from '../../../redux/User/action/getInfoAndUpdateAction';
import { USER_ID } from '../../../utils/varsSetting';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { BackTop, DatePicker, Rate } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Input, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import learn_logo from "../../../assets/User/images/learn_logo.jpg";

function ProfilePage(props) {

    let { id } = props.match.params;

    let dispatch = useDispatch();

    let [form, disFormOrNot] = useState(true);

    let { userInfo, userSkillArr, userCertArr, jobHireArr } = useSelector((state) => {
        return state.UserReducer;
    });

    const [imgSrc, setImgSrc] = useState(
        userInfo.avatar
    );

    const [upAvatarStatus, setAvatarStatus] = useState(false);

    let [birthday, changeBirthdayOrNot] = useState(false);

    const infoIsMatch = () => {
        if (id !== localStorage.getItem(USER_ID)) {
            history.push('/error');
        }
    }

    const getUserInfo = () => {
        dispatch(getInfoByIDAction(localStorage.getItem(USER_ID)));
        dispatch(getHireJobsAction());
    }

    // Skill Tag Ant Design Config
    const [skill_tags, setSkillTags] = useState(userSkillArr);
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
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className="achievement__tag"
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
                    display: "inline-block",
                }}
            >
                {tagSkillElem}
            </span>
        );
    };

    const tagSkillChild = skill_tags.map(forSkillMap);

    // Cert Tag Ant Design Config
    const [cert_tags, setCertTags] = useState(userCertArr);
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
        const tagCertElem = (
            <Tag
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className="achievement__tag"
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
                    display: "inline-block",
                }}
            >
                {tagCertElem}
            </span>
        );
    };

    const tagCertChild = cert_tags.map(forCertMap);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userInfo.name ?? "",
            email: userInfo.email ?? "",
            phone: userInfo.phone ?? "",
            birthday: userInfo.birthday,
            gender: userInfo.gender,
            skill: skill_tags,
            certification: cert_tags,
            avatar: null
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is not empty !').matches(
                /^(?=.*\d)(?=.*[A-Z a-z])(?!.*[ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý])(?!.*\s).{0,}$/,
                "Name is wrong format !"
            ),
            email: Yup.string().required('Email is not empty !').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is wrong format !'),
            phone: Yup.string().required('Phone is not empty !').matches(
                /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                "Phone is wrong format !"
            )
        }),
        onSubmit: (values) => {

            let formData = new FormData();

            for (const key in values) {
                if (key !== 'avatar') {
                    formData.append(key, values[key]);
                } else {
                    if (values.avatar !== null) {
                        formData.append('formFile', values.avatar, values.avatar.name);
                        dispatch(updateUserAvatarAction(formData))
                    }
                }
            }

            delete values.avatar;
            dispatch(updateUserInfoAction(userInfo.id, values));
        }
    });

    const handleChangeDatePicker = (value) => {
        let dateFormat = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('birthday', dateFormat);
    }

    const renderSkillTags = () => {
        return skill_tags.map((skillItem, index) => {
            return <span className='achievement__tag d-inline-block' key={index}>{skillItem}</span>
        })
    }

    const renderCertTags = () => {
        return cert_tags.map((certItem, index) => {
            return <span className='achievement__tag d-inline-block' key={index}>{certItem}</span>
        })
    }

    const renderHireJob = () => {
        return jobHireArr.map((jobItem) => {
            return <div className="col-md-12" key={jobItem.id}>
                <div className="card mb-3">
                    <div className="row no-gutters hire__job__item">
                        <div className="col-md-12 col-lg-4">
                            <img className='img-fluid item__cover' src={jobItem.congViec.hinhAnh} alt="..." />
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <div className="card-body">
                                <h5 className="card-title">{jobItem.congViec.tenCongViec.length > 50 ? jobItem.congViec.tenCongViec.substr(0, 30) + ' ...' : jobItem.congViec.tenCongViec}</h5>
                                <p className="card-text text-dark m-0">{jobItem.congViec.moTa.length > 50 ? jobItem.congViec.moTa.substr(0, 150) + ' ...' : jobItem.congViec.moTa}</p>
                                <span className='font-weight-bold'>Rate:</span> <Rate name='saoCongViec' value={jobItem.congViec.saoCongViec} disabled />
                                <h5 className='font-weight-bold'>Price: {jobItem.congViec.giaTien}$</h5>
                                <div className="form-group">
                                    <button onClick={() => {
                                        history.push(`/user/infojob/${jobItem.congViec.id}`);
                                    }} className='btn btn-info mr-3' type='button'><i className="fa-solid fa-circle-info"></i> Detail</button>
                                    {!form ? <>
                                        <button onClick={() => {
                                            if (window.confirm(`Do you want delete hire job ID is ${jobItem.id} ?`)) {
                                                dispatch(deleteHireJobsAcion(jobItem.id));
                                            }
                                        }} className='btn btn-danger' type='button'><i className="fa-solid fa-trash-can"></i> Delete</button>
                                    </> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg') {
            await formik.setFieldValue('avatar', file);

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
        }
    }

    useEffect(() => {
        infoIsMatch();
        getUserInfo();
        renderSkillTags();
        renderCertTags();
        renderHireJob();

        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        setSkillTags(userSkillArr)
    }, [userSkillArr]);

    useEffect(() => {
        setCertTags(userCertArr)
    }, [userCertArr]);

    useEffect(() => {
        setImgSrc(userInfo.avatar)
    }, [userInfo.avatar])

    document.title = `${formik.values.name} | Fiverr`

    return (
        <>
            <div className='profile__content'>
                <div className="container mx-auto py-5 ">
                    <div className="row">
                        <div className="col-md-4 content__left">
                            {/* Avatar Card */}
                            <div className="card">
                                {localStorage.getItem('user_avatar') !== "" ? <>
                                    <img src={imgSrc} className="card__avatar card-img-top" alt="..." />
                                </> : <>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" className="w-50 mx-auto my-3 card-img-top" alt="..." />
                                </>}
                                <div className="card-body text-center">
                                    <h5 className="card-title">{userInfo.name}</h5>
                                    {form ? <>
                                        <button onClick={() => {
                                            disFormOrNot(!form);
                                        }} className='btn btn-info' type='button'>Edit Info</button>
                                    </> : <div className='action__info d-flex justify-content-center'>
                                        <button onClick={() => {
                                            disFormOrNot(!form);
                                            setImgSrc(localStorage.getItem('user_avatar'));
                                        }} className='btn btn-danger btn__cancel__edit mb-2' type='button'>Cancel Edit</button>
                                        {!upAvatarStatus ? <>
                                            <button onClick={() => {
                                                setAvatarStatus(!upAvatarStatus)
                                            }} className='btn btn-success' type='button'>Change Avatar</button>

                                        </> : <>
                                            <button onClick={() => {
                                                setAvatarStatus(!upAvatarStatus);
                                                setImgSrc(localStorage.getItem('user_avatar'));
                                            }} className='btn btn-danger ml-2' type='button'>Cancel Change</button>
                                        </>}
                                    </div>}
                                    <hr />
                                    <div className="card__info">
                                        <div className="info__top">
                                            <div className="top__left">
                                                <i className="fa-solid fa-location-dot"></i> <span>From</span>
                                            </div>
                                            <div className="top__right">
                                                <span>VietNam</span>
                                            </div>
                                        </div>
                                        <div className="info__bottom">
                                            <div className="bottom__left">
                                                <i className="fa-regular fa-calendar-days" /> <span>Member since</span>
                                            </div>
                                            <div className="bottom__right">
                                                <span>2022</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Learn Card */}
                            <div className="card mt-3">
                                <div className="card-body learn__card">
                                    <div className="card__top">
                                        <img src={learn_logo} alt="learn logo" />
                                    </div>
                                    <div className="card__bottom text-center">
                                        <img src="https://cdn.pixabay.com/photo/2020/07/10/02/45/tattoo-5389284_960_720.png" className='w-50 my-3' alt="" />
                                        <h5 className='font-weight-bold my-2'>Earn badges and stand out</h5>
                                        <p>
                                            Boost your sales, by boosting your expertise.
                                        </p>
                                        <button className='btn btn-success font-weight-bold' type='button'>Enroll Now</button>
                                    </div>
                                </div>
                            </div>
                            {/* Desc Card */}
                            <div className="card mt-3 py-3">
                                <div className="card-body desc__card">
                                    <div className="desc__top d-flex justify-content-between">
                                        <h5 className='desc__title'>Description:</h5>
                                        <a href="#" className='add__tag'>Edit Description</a>
                                    </div>
                                    <hr className='my-5' />
                                    <div className="desc__mid d-flex justify-content-between">
                                        <div className='mid_left'>
                                            <h5 className='desc__title'>Languages:</h5>
                                            <span className='font-weight-bold'>English - <span style={{ opacity: '.5' }}>Basic</span></span>
                                        </div>
                                        <div className="mid__right">
                                            <a href="#" className='add__tag'>Add new</a>
                                        </div>
                                    </div>
                                    <hr className='my-5' />
                                    <div className="desc__bot">
                                        <div className='bot_left'>
                                            <h5 className='desc__title'>Linked Accounts:</h5>
                                            <ul className="left__list">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa-solid fa-plus"></i> Facebook
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa-solid fa-plus"></i> Google
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa-solid fa-plus"></i> GitHub
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa-solid fa-plus"></i> Twitter
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bot__right">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Skill Card */}
                            <div className="card mt-3">
                                <div className="card-body">
                                    {form ? <>
                                        <h5 className="card-title">Skill:</h5>
                                        <hr />
                                        {renderSkillTags()}
                                    </> : <>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h5 className="card-title">Skill:</h5>
                                            {!inputSkillVisible && (
                                                <Tag onClick={showSkillInput} className="site-tag-plus skill-tag">
                                                    <i className="fa-solid fa-plus"></i>
                                                </Tag>
                                            )}
                                        </div>
                                        <hr />
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
                                                className='form-control'
                                                ref={inputSkillRef}
                                                type="text"
                                                value={inputSkillValue}
                                                onChange={handleSkillInputChange}
                                                onBlur={handleSkillInputConfirm}
                                                onPressEnter={handleSkillInputConfirm}
                                                placeholder="Add new your skill"
                                            />
                                        )}

                                    </>}
                                </div>
                            </div>
                            {/* Cert Card */}
                            <div className="card mt-3">
                                <div className="card-body">
                                    {form ? <>
                                        <h5 className="card-title">Cert:</h5>
                                        <hr />
                                        {renderCertTags()}
                                    </> : <>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h5 className="card-title">Cert:</h5>
                                            {!inputCertVisible && (
                                                <Tag onClick={showCertInput} className="site-tag-plus">
                                                    <i className="fa-solid fa-plus"></i>
                                                </Tag>
                                            )}
                                        </div>
                                        <hr />
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
                                                className='form-control'
                                                ref={inputCertRef}
                                                type="text"
                                                value={inputCertValue}
                                                onChange={handleCertInputChange}
                                                onBlur={handleCertInputConfirm}
                                                onPressEnter={handleCertInputConfirm}
                                                placeholder="Add new your cert"
                                            />
                                        )}
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className='content__right'>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-info-tab" data-toggle="pill" data-target="#pills-info" type="button" role="tab">
                                            My Info
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-rent-job-tab" data-toggle="pill" data-target="#pills-hire" type="button" role="tab">
                                            Hire Jobs
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-info" role="tabpanel">
                                        <form onSubmitCapture={formik.handleSubmit}>
                                            <fieldset disabled={form ? true : false}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name:</label>
                                                            <input id='name' name='name' className='form-control' type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                            {formik.touched.name && formik.errors.name ? <>
                                                                <div className="alert alert-danger">{formik.errors.name}</div>
                                                            </> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="emailInput">Email:</label>
                                                            <input id='emailInput' name='email' className='form-control' type="text" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                            {formik.touched.email && formik.errors.email ? <>
                                                                <div className="alert alert-danger">{formik.errors.email}</div>
                                                            </> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="phone">Phone:</label>
                                                            <input className='form-control' type="text" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                            {formik.touched.phone && formik.errors.phone ? <>
                                                                <div className="alert alert-danger">{formik.errors.phone}</div>
                                                            </> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Birthday:</label>
                                                            {form ? <>
                                                                <h5 style={{ cursor: 'pointer' }}>{formik.values.birthday}</h5>
                                                            </> : <>
                                                                <div className="d-flex justify-content-between">
                                                                    {birthday === false ? <>
                                                                        <h5 onClick={() => {
                                                                            changeBirthdayOrNot(!birthday);
                                                                        }} style={{ cursor: 'pointer' }}>{formik.values.birthday}</h5>
                                                                        <i className="fa-regular fa-circle-question" data-toggle="tooltip" data-placement="bottom" title="Click birthday value if you want to change it !" style={{ fontSize: '22px', color: '#ffcc00' }}></i>
                                                                    </> : null}
                                                                </div>
                                                            </>}
                                                            {!form && birthday === true ? <>
                                                                <DatePicker onChange={handleChangeDatePicker} className='form-control' format={'DD/MM/YYYY'} />
                                                                <button onClick={() => {
                                                                    changeBirthdayOrNot(!birthday)
                                                                }} className='btn btn-danger mt-2' type='button'>Cancel</button>
                                                            </> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='form-group'>
                                                            <label htmlFor="myGender">Gender:</label>
                                                            {form ? <>
                                                                <select className="form-control" id="myGender" name='gender' value={formik.values.gender} onChange={formik.handleChange}>
                                                                    <option value="true">Male</option>
                                                                    <option value="false">Female</option>
                                                                </select>
                                                            </> : <>
                                                                <select className="form-control" id="myGender" name='gender' onChange={formik.handleChange}>
                                                                    <option value='true' selected={formik.values.gender ? true : false}>Male</option>
                                                                    <option value='false' selected={!formik.values.gender ? true : false}>Female</option>
                                                                </select>
                                                            </>}
                                                        </div>
                                                    </div>
                                                    {upAvatarStatus ? <>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="file" onChange={handleChangeFile} accept='image/jpg,image/png,image/jpeg' />
                                                            </div>
                                                        </div>
                                                    </> : null}
                                                </div>
                                                {!form ? <>
                                                    <div className="col-md-6 p-0">
                                                        <div className="form-group">
                                                            <button type='submit' className='btn btn-success'>Save changes</button>
                                                        </div>
                                                    </div>
                                                </> : null}
                                            </fieldset>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="pills-hire" role="tabpanel">
                                        <div className={jobHireArr.length >= 2 ? "hire__job__list" : ""}>
                                            <div className="row">
                                                {renderHireJob()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BackTop>
                <div className="backTopStyle">
                    <i className="fa-solid fa-angles-up backTopStyle"></i>
                </div>
            </BackTop>
        </>
    )
}

export default ProfilePage