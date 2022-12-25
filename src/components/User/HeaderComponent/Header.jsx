import React, { useEffect } from 'react';
import './header.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListJobByNameAction } from '../../../redux/User/action/getListJobByNameAction';
import { loginAction } from '../../../redux/User/action/signInAndSignUpAction';
import * as Yup from 'yup';
import _ from 'lodash';
import { getListMenuAction } from '../../../redux/User/action/getListMenuAction';
import { getListJobByIDAction } from '../../../redux/User/action/getListJobByIDAction';
import { history } from '../../../App';
import { NavLink } from 'react-router-dom';
import { getDetailJobAction } from '../../../redux/User/action/getDetailJobAction';
import { TOKEN, USER_ID, USER_NAME, USER_ROLE } from '../../../utils/varsSetting';
import { renderResponsive } from '../../../utils/checkScreen'

export default function Header(props) {

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

  useEffect(() => {
    let action = getListMenuAction()
    dispatch(action);
    adminOrUser()
  }, [])


  const { listMenu } = useSelector(state => state.ListMenuJobReducer)

  const renderMenu = () => {
    return listMenu.map((typeJob, index) => {
      const { dsNhomChiTietLoai } = typeJob
      return <li className='sub-menu' key={index}>
        <div className='drop-down'>
          <NavLink onClick={() => {
            let action = getDetailJobAction(typeJob.id)
            dispatch(action)
            localStorage.setItem('user_job_type_name', typeJob.tenLoaiCongViec)
          }} className='drop-menu' to={'/user/listdetail'}>{typeJob.tenLoaiCongViec}</NavLink>
          <div className="dropdown-content">
            {dsNhomChiTietLoai.map((groupName, index) => {
              const { dsChiTietLoai } = groupName
              return <div className="dropdown show" key={index}>
                <a className="dropdown-toggle toogle__item" href="#" data-toggle="dropdown">
                  {groupName.tenNhom} <i className="fa-solid fa-angle-up"></i>
                </a>
                <div className="dropdown-menu" >
                  {dsChiTietLoai.map((name, index) => {
                    return <a onClick={() => {
                      let action = getListJobByIDAction(name.id)
                      dispatch(action)
                    }} className="dropdown-item" href='#' key={index}>{name.tenChiTiet}</a>
                  })}
                </div>
              </div>
            })
            }
          </div>
        </div>
      </li >
    })
  }

  const formik = useFormik({
    initialValues: {
      nameJob: ""
    },
    onSubmit: (values) => {
      if (values.nameJob !== "") {
        localStorage.setItem('job_name_search', values.nameJob);
        dispatch(getListJobByNameAction(values.nameJob))
      }
    }
  })

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

  return (
    <>
      <header>
        <div className='header container-fluid '>
          <div className='pdheader'>
            <nav className="navbar navbar-expand-md navbar-expand-lg navbar-light">
              <NavLink className="navbar-brand logo__header" to={'/'}>
                <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
              </NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <div >
                  <form onSubmitCapture={formik.handleSubmit} className="search profile__header">
                    <input onChange={formik.handleChange} className="form-control" type="search" name='nameJob'  aria-label="Search" placeholder={localStorage.getItem('job_name_search') !== undefined ? localStorage.getItem('job_name_search') : ""}/>
                    <button className="btn btn-success btnicon" type="submit">
                      Search
                    </button>
                  </form>
                  {renderResponsive() ? <>
                    <ul className="navbar-nav mr-auto" id='seller'>
                      <li className="nav-item active">
                        <a className="nav-link" href="#">Become a Seller</a>
                      </li>
                      {loginOrNot() ? <>
                        <div className="btn-group">
                          <button type="button" id='btn__info' className="info__dark btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-expanded="false">
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
                              if (window.confirm("Do you want to sign out?")) {
                                localStorage.clear();
                                history.push('/');
                              }
                            }} className="dropdown-item" type="button">Sign Out</button>
                          </div>
                        </div>
                      </> : <>
                        <li className="nav-item">
                          <a id='signInBtn' type='button' className="nav-link" data-toggle="modal" data-target="#loginModal" href='#'>Sign In</a>
                        </li>
                        <form className="form-inline my-2 my-lg-0">
                          <button onClick={() => {
                            history.push('/register')
                          }} className="btn btn-outline-success btnicon2" type="button">Join</button>
                        </form>
                      </>}
                    </ul>
                  </> : null}
                </div>
              </div>
              {!renderResponsive() ? <>
                <ul className="navbar-nav mr-auto" id='seller'>
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Become a Seller</a>
                  </li>
                  {loginOrNot() ? <>
                    <div className="btn-group">
                      <button type="button" id='btn__info' className="info__dark btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-expanded="false">
                        <i className="fa-solid fa-circle-user"></i> {localStorage.getItem(USER_NAME) !== null ? <>
                          <span>{localStorage.getItem(USER_NAME)}</span>
                        </> : null} <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-lg-right">
                        <NavLink to={`/profile/${localStorage.getItem(USER_ID)}`} className="dropdown-item" type="button">My Info</NavLink>
                        {adminOrUser() ? <>
                          <NavLink to='/admin' className="dropdown-item" type="button">Admin Page</NavLink>
                        </> : null}
                        <button onClick={() => {
                          if (window.confirm("Do you want to sign out?")) {
                            localStorage.clear();
                            history.push('/');
                          }
                        }} className="dropdown-item" type="button">Sign Out</button>
                      </div>
                    </div>
                  </> : <>
                    <li className="nav-item">
                      <a id='signInBtn' type='button' className="nav-link" data-toggle="modal" data-target="#loginModal" href='#'>Sign In</a>
                    </li>
                    <form className="form-inline my-2 my-lg-0">
                      <button onClick={() => {
                        history.push('/register')
                      }} className="btn btn-outline-success btnicon2" type="button">Join</button>
                    </form>
                  </>}
                </ul>
              </> : null}
            </nav>
          </div>
        </div>
        {window.location.pathname === '/' ? null : (
          <div className='categories'>
            <nav className='categories-content'>
              <ul className='categories-menu'>
                {renderMenu()}
              </ul>
            </nav>
          </div>
        )}
      </header>

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
