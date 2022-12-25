import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import testImg from '../../../assets/User/images/big-carousel-1.jpg';
import testImg2 from '../../../assets/User/images/big-carousel-2.jpg';
import testImg3 from '../../../assets/User/images/big-carousel-3.jpg';
import { getListJobByNameAction } from '../../../redux/User/action/getListJobByNameAction';
import { getListMenuAction } from '../../../redux/User/action/getListMenuAction';
import { loginAction } from '../../../redux/User/action/signInAndSignUpAction';
import { TOKEN, USER_ID, USER_NAME, USER_ROLE } from '../../../utils/varsSetting';
import * as Yup from 'yup';
import './carousel.css';

export default function CarouselComponent(props) {

    const dispatch = useDispatch();

    const loginOrNot = () => {
        if (localStorage.getItem(TOKEN) !== null) {
            return true;
        } else {
            return false;
        }
    }

    const adminOrUser = () => {
        if (localStorage.getItem(USER_ROLE) !== null) {
            if (localStorage.getItem(USER_ROLE) == 'ADMIN') {
                return true;
            }
        } else {
            return false;
        }
    }

    const formik = useFormik({
        initialValues: {
            nameJob: ""
        }, onSubmit: (values) => {
            if (values.nameJob !== "") {
                localStorage.setItem('job_name_search', values.nameJob);
                dispatch(getListJobByNameAction(values.nameJob))
            }
        }
    });

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is not empty !').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is wrong format !'),
            password: Yup.string().required('Password is not empty !')
        }),
        onSubmit: (values) => {
            document.getElementById('signInBtn').click()
            dispatch(loginAction(values));
        }
    })

    useEffect(() => {
        let action = getListMenuAction()
        dispatch(action);
        adminOrUser()
    }, [])

    return (
        <>
            <div className="list-carousel-hero">
                <Carousel slide={false}>
                    <Carousel.Item >
                        <img
                            className="img-fluid"
                            src={testImg}
                            alt="First slide"
                        />
                        <Carousel.Caption>

                            <p className='title-hero'>
                                Zach , <span style={{ fontWeight: 'bold' }} >Bar Owner</span>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item >
                        <img
                            className="img-fluid"
                            src={testImg2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <p className='title-hero'>Ritika ,
                                <span style={{ fontWeight: 'bold' }}>Shoemaker and Designer</span>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item >
                        <img
                            className="img-fluid"
                            src={testImg3}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <span className='color-icon'>
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                            </span>
                            <p className='title-hero'>
                                Gabrielle , <span style={{ fontWeight: 'bold' }}>Video Editor</span>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <div className='carousel-content'>
                        <nav className="container navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-light">
                            <div className="collapse navbar-collapse">
                                <NavLink className="navbar-brand" to={'/'}>
                                    <svg className='logo-cr' width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
                                </NavLink>
                            </div>
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-itemcrl active">
                                    <a className="nav-link nav-cr" href="#">Become a Seller</a>
                                </li>
                                {loginOrNot() ? <>
                                    <div className="btn-group">
                                        <button type="button" id='btn__info' className="info__light btn dropdown-toggle text-white" data-toggle="dropdown" data-display="static" aria-expanded="false">
                                            <i className="fa-solid fa-circle-user"></i> {localStorage.getItem(USER_NAME) !== null ? <>
                                                <span>{localStorage.getItem(USER_NAME)}</span>
                                            </> : null} <i className="fa-solid fa-angle-up"></i>
                                        </button>
                                        <div id='drop__info' className="dropdown-menu dropdown-menu-lg-right">
                                            <NavLink to={`/profile/${localStorage.getItem(USER_ID)}`} className="btn dropdown-item" type="button">My Info</NavLink>
                                            {adminOrUser() ? <>
                                                <NavLink to='/admin' className="btn dropdown-item" type="button">Admin Page</NavLink>
                                            </> : null}
                                            <button onClick={() => {
                                                if (window.confirm("Do you really want to signout?")) {
                                                    localStorage.clear();
                                                    history.push('/');
                                                }
                                            }} className="dropdown-item" type="button">Sign Out</button>
                                        </div>
                                    </div>
                                </> : <>
                                    <li className="nav-item">
                                        <a id='signInBtn' type='button' className="nav-link text-white" data-toggle="modal" data-target="#loginModal">Sign In</a>
                                    </li>
                                    <form className="form-inline my-2 my-lg-0">
                                        <button onClick={() => {
                                            history.push('/register')
                                        }} className="btn btn-outline-success btnicon2" type="button">Join</button>
                                    </form>
                                </>}
                            </ul>

                        </nav>
                        <div className='container'>
                            <div className='carousel-title'>
                                <div className="carousel-right">
                                    <h1>Find the perfect <i className='freelance'>freelance</i> <br />
                                        services for your business
                                    </h1>
                                </div>
                                <div >
                                    <form className="search search-cr" onSubmitCapture={formik.handleSubmit} >
                                        <input onChange={formik.handleChange} className="form-control" name='nameJob' type="search" placeholder='"building mobile app"' aria-label="Search" />
                                        <button className="btn btn-success btnicon" type="submit">
                                            Search
                                        </button>
                                    </form>
                                </div>
                                <div className="popular mt-3 ml-1 ">
                                    <span>  Popular : </span>
                                    <ul className='popular-text'>
                                        <li className='popular-text-content'><a href="#">Website Design</a></li>
                                        <li className='popular-text-content'><a href="#">WordPress</a></li>
                                        <li className='popular-text-content'><a href="#">Logo Design</a></li>
                                        <li className='popular-text-content'><a href="#">Dropshipping</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Login Modal --> */}
            <div className="modal fade" id="loginModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h4 className="modal-title text-white" id="loginModalLabel">Sign In Form</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa-solid fa-circle-xmark"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmitCapture={formikLogin.handleSubmit} className='container my-2'>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id='email' name='email' type="text" className="form-control" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} />
                                    {formikLogin.touched.email && formikLogin.errors.email ? (
                                        <div className="alert alert-danger mt-2">{formikLogin.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input id='password' name='password' type="password" className="form-control" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} />
                                    {formikLogin.touched.password && formikLogin.errors.password ? (
                                        <div className="alert alert-danger mt-2">{formikLogin.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <button type='submit' className='btn btn-success mr-3'>Sign In</button>
                                    <button onClick={() => {
                                        document.getElementById('signInBtn').click()
                                        history.push('/register')
                                    }} type='button' className='btn btn-secondary'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}