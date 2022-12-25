import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInfoDetailJobAction } from '../../../redux/User/action/getInfoDetailJobAction';
import { getCommentByIdJobAction } from '../../../redux/User/action/getCommentByIdJobAction'
import './info.css';
import { RightOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { BackTop, Rate } from 'antd';
import { USER_ID } from "../../../utils/varsSetting";
import { addCommentAction } from '../../../redux/User/action/getCommentByIdJobAction';
import moment from 'moment';
import { getUserByIDAction } from '../../../redux/User/action/getUserByIDAction';
import { Avatar } from 'antd';
import { getInfoHireJobAction } from '../../../redux/User/action/getInfoHireJobAction';
import { message } from 'antd';

export default function InfoDetailJob(props) {

    document.title = `${localStorage.getItem('job__title')} | Fiverr`;

    const { infoJob } = useSelector(state => state.InfoDetailJobReducer);
    const { listComment, userInfo } = useSelector(state => state.ManegeCommentReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params
        let userID = localStorage.getItem(USER_ID)
        dispatch(getInfoDetailJobAction(id))
        dispatch(getCommentByIdJobAction(id))
        dispatch(getUserByIDAction(userID))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [userComment, setUserComment] = useState({
        id: '',
        maCongViec: '',
        maNguoiBinhLuan: '',
        ngayBinhLuan: '',
        noiDung: '',
        saoBinhLuan: ''
    })
    const [noiDung, setNoiDung] = useState('')

    let handleInput = (e) => {
        let { id, value } = e.target
        setNoiDung(value)

        setUserComment({
            ...userComment,
            id: 0,
            maCongViec: props.match.params.id,
            maNguoiBinhLuan: localStorage.getItem(USER_ID),
            ngayBinhLuan: moment().format('MMM DD YYYY h:mm A'),
            noiDung: value,
            saoBinhLuan: Math.floor(Math.random() * 5) + 1
        })

    }
    let handleSubmit = (e) => {
        e.preventDefault()
        if (userComment.noiDung.trim() === '') {
            return null
        }
        let action = addCommentAction(userComment)
        dispatch(action)
        setNoiDung('')
    }

    const renderComment = () => {
        return listComment.map((user, index) => {
            return <div className='comments-item' key={index}>
                <div className='user-comment'>
                    <div className='avatar-user'>
                        {user.avatar === '' ? <Avatar icon={<UserOutlined />} /> : <img className='avatar-user-commented' src={user.avatar} alt="" />}
                    </div>
                    <div className='user-name'>
                        <span style={{ fontWeight: 'bold', color: 'black' }}>{user.tenNguoiBinhLuan}</span>
                        <span style={{ color: '#ffb237' }} className="fa-solid fa-star ml-2"> {user.saoBinhLuan}</span>
                    </div>
                </div>
                <div className='user-name-comment'>
                    <p>{user.noiDung}</p>
                    <p style={{ color: '#ccc' }}>{user.ngayBinhLuan}</p>
                </div>
            </div>

        })
    }

    const addComment = () => {
        if (localStorage.getItem(USER_ID) !== null) {
            return <Fragment>
                <div className='addCmt'>
                    <div className='addUser'>
                        <img className='currentUser' src={userInfo.avatar} alt="" />
                    </div>
                    <div>
                        <form className='form' onSubmit={handleSubmit}>
                            <textarea className='form-control' onChange={handleInput} type="text" value={noiDung} cols="70" rows="4"></textarea>
                            <div className='button-addComment mt-2'>
                                <button className='btn btn-primary' type='submit'> Add Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        }
    }

    const renderInfoJob = () => {
        return infoJob.map((job, index) => {
            const { congViec } = job
            return <div className='info-top' key={index}>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <div className='info-col-left'>
                            <div className='info-job-right'>
                                <div className='info-type-job'>
                                    <span className='text-type-name'>{job.tenLoaiCongViec}</span> <RightOutlined style={{ marginRight: '5px' }} />  <span className='text-type-name'>{job.tenNhomChiTietLoai}</span> <RightOutlined style={{ marginRight: '5px' }} />  <span className='text-type-name'>{job.tenChiTietLoai}</span>
                                </div>
                                <div className='info-detail-job'>
                                    <h4 className='name-job'>{congViec.tenCongViec}</h4>
                                    <div className='info-content'>
                                        <div className='avatar-people'>
                                            <img className='img-people' src={job.avatar} alt="" />
                                        </div>
                                        <span className='img-content'>{job.tenNguoiTao}</span>
                                        <span className='img-start'>
                                            <Rate disabled allowHalf value={congViec.saoCongViec} /> ( <span className='img-rate'>{congViec.danhGia}</span> )
                                        </span>
                                    </div>
                                </div>
                                <div className='coming-back'>
                                    <div className='coming-back-content'>
                                        <img className='img-coming' src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/56ff3db8ae625ba1d6493c3c250c5919-1625663632464/3-Trophy-70_alpha.gif" alt="animated trophy" data-impression-collected="true" />
                                    </div>
                                    <div className='coming-text'>
                                        <span className='conming-text-sp'> People keep coming back!</span> myblue has an exceptional number of repeat buyers.
                                    </div>
                                </div>
                                <div className='img-job-cover'>
                                    <img className='img-job' src={congViec.hinhAnh} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 info-table'>
                        <div className='card'>
                            <div className='card-head'>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item1" role="presentation">
                                        <button className="nav-link" id="basic-tab" data-toggle="tab" data-target="#basic" type="button" role="tab">Basic</button>
                                    </li>
                                    <li className="nav-item1" role="presentation">
                                        <button className="nav-link active" id="standard-tab" data-toggle="tab" data-target="#standard" type="button" role="tab" >Standard</button>
                                    </li>
                                    <li className="nav-item1" role="presentation">
                                        <button className="nav-link" id="premium-tab" data-toggle="tab" data-target="#premium" type="button" role="tab" >Premium</button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="standard" role="tabpanel" aria-labelledby="standard-tab">
                                        <div className='tab-pane-content'>
                                            <div className='tab-content-left'>
                                                Standard
                                            </div>
                                            <div className='tab-content-right'>
                                                ${congViec.giaTien}
                                            </div>
                                        </div>
                                        <div className='tab-pane-text'>
                                            Create a simple web appllication for your business
                                        </div>
                                        <div className='short-description'>
                                            <i className="fa-regular fa-clock time-icon"></i>{congViec.moTaNgan.length > 35 ? <span className='time-text'>{congViec.moTaNgan.slice(0, 35)}...</span> : <span className='time-text'>{congViec.moTaNgan}</span>}
                                            <ul className='menu-short-description'>
                                                <li className='menu-short-text'><i className="fa-solid fa-check menu-short-icon-color"></i>Design Customization</li>
                                                <li className='menu-short-text'><i className="fa-solid fa-check menu-short-icon"></i>Content Upload</li>
                                                <li className='menu-short-text'><i className="fa-solid fa-check menu-short-icon-color"></i>Responsive Design</li>
                                                <li className='menu-short-text'><i className="fa-solid fa-check menu-short-icon-color"></i>Include Soucre Code</li>
                                                <li className='menu-short-text'><i className="fa-solid fa-check menu-short-icon"></i>1 Page</li>
                                                <li className='button-menu-short'>
                                                    <button onClick={() => {
                                                        if (localStorage.getItem(USER_ID) === null) {
                                                            document.getElementById('signInBtn').click()
                                                        } else {
                                                            const infoHireJob = {
                                                                id: 0,
                                                                maCongViec: props.match.params.id,
                                                                maNguoiThue: localStorage.getItem(USER_ID),
                                                                ngayThue: moment().format('MMM DD YYYY h:mm A'),
                                                                hoanThanh: true
                                                            }
                                                            dispatch(getInfoHireJobAction(infoHireJob))
                                                            const key = 'updatable';
                                                            const openMessage = () => {
                                                                message.loading({
                                                                    content: 'Loading...',
                                                                    style: {
                                                                        marginTop: '20vh',
                                                                    },
                                                                    key,
                                                                })
                                                                setTimeout(() => {
                                                                    message.success({
                                                                        content: 'Successful!',
                                                                        style: {
                                                                            marginTop: '20vh',
                                                                        },
                                                                        key,
                                                                        duration: 2,
                                                                    });
                                                                }, 1000);
                                                            }
                                                            openMessage();
                                                        }
                                                    }} className='btn btn-success btn-continute'>Continute (${congViec.giaTien})</button>
                                                    <p className='text-button-menu'>Compare Packages</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <p className='text-quocte'> Do you have any special requiements?</p>
                            <button className='button-quote'>Get a Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    const renderRelatedInfo = () => {
        return infoJob.map((job, index) => {
            const { congViec } = job
            let commentScroll = 'commentScroll'
            return <div className='row' key={index}>
                <div className='col-12 col-lg-8'>
                    <div className='info-job-right'>
                        <div className='info-difference-bg'>
                            <div className='info-difference'>
                                <p className='text-bold p1'>About This Gig</p>
                                <p className='text-own'>Top Rated Seller with all positive revlews</p>
                                <p>Hello,</p>
                                <p className='section'>Want a custom website built for you business? Or having trouble In recognizing or fixing the Issues/bug In your existing website/blog. It is not a propblem because I'm here to fix any Issues in HTML,CSS,BootStrap,Javascript,PHP or database(Mysql/Oracle)</p>
                                <p className='text-bold'>Thing I offter</p>
                            </div>
                            <ul className='info-mores'>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i>{congViec.moTa.length > 50 ? <span>{congViec.moTa.slice(0, 50)}...</span> : <span>{congViec.moTa}</span>}</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> E-commcircle Development</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Custom website development (both front-end and back-end) with Larevel, PHP and MySQL</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Vuejs, HTML, CSS, BootStrap, Javascript/Hquery, PHP single/multi web page,</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Complete website creation from scratch using Laravel Rest Api and vuejs</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Web Appllcation with proper exception handlling</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Can work with APIs, Intergrate API's in your appllcations.</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Responsive - Mobile Friendy sites</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Great UI/UX for your site</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> PSD to HTML, XD to HTML or any other design to HTML with best quallty and pixel perfect design</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Fix Issues in front-end or add some changes to it</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> Bug Investigation and Bug fixing</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> MySQL database design and Intergration In website</li>
                                <li className='info-mores-li'> <i className="fa-solid fa-circle icon-crile-mota"></i> MySQL database bug fixing and Intergration Issues fixing</li>
                            </ul>
                            <p className='text-own'>I will do the work until you are satisfied with fast and responsive communication</p>
                        </div>
                        <div className='language'>
                            <div className='language-left'>
                                <p className='text-gray'>Programming Language</p>
                                <p className='p2'>PHP</p>
                            </div>
                            <div className='language-right'>
                                <p className='text-gray'>Expertise</p>
                                <p className='p2'>Cross Browser</p>
                                <p className='p2'>Compatibility</p>
                                <p className='p2'>PSD to HTMl, Performance</p>
                            </div>
                        </div>
                        <div className='info-user-create-job'>
                            <h5>About The Seller</h5>
                            <div className='info-user'>
                                <div className='info-user-left'>
                                    <img className='img-user' src={job.avatar} alt="" />
                                </div>
                                <div className='info-user-right'>
                                    <span style={{ fontWeight: 'bold' }} >{job.tenNguoiTao}</span> <br />
                                    <span style={{ fontWeight: 'bold' }} >{job.tenLoaiCongViec}</span> <br />
                                    <Rate disabled allowHalf value={congViec.saoCongViec} /> ( <span className='img-rate'>{congViec.danhGia}</span> ) <br />
                                    <button className='button-user'>Contact me</button>
                                </div>
                            </div>
                        </div>
                        <div className='FAQ'>
                            <h5>FAQ</h5>
                            <div className="accordion" id="accordionExample">
                                <div className='ques1'>
                                    <div className="question" id="headingOne">

                                        <button className="button-faq  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <div className='span-collapse'>
                                                <span className='text-faq'>Do you provide regular updates on order?</span>
                                                <span className='icon-faq'><DownOutlined /></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='ques2'>
                                    <div className="question" id="headingTwo">
                                        <button className="button-faq  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            <div className='span-collapse'>
                                                <span className='text-faq'>How do you guarantee product quallty and rellabllty</span>
                                                <span className='icon-faq'><DownOutlined /></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='ques3'>
                                    <div className="question" id="headingThree">

                                        <button className="button-faq  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            <div className='span-collapse'>
                                                <span className='text-faq'>Do you give post-development support</span>
                                                <span className='icon-faq'><DownOutlined /></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='ques4'>
                                    <div className="question" id="headingFour">

                                        <button className="button-faq  btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            <div className='span-collapse'>
                                                <span className='text-faq'>Do you convert PSD to HTML</span>
                                                <span className='icon-faq'><DownOutlined /></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='reviews'>
                            <div className='review'>
                                <span className='text-review'>335 Reviews</span> <Rate
                                    disabled className='rate' allowHalf value={5} />  <span style={{ color: '#FFB237', fontWeight: 'bold' }}>5</span>
                            </div>
                            <div className='relevant'>
                                <span>Sort By</span> <span style={{ fontWeight: 'bold' }}>Most relevant <DownOutlined className='arrowsDown' /></span>
                            </div>
                        </div>
                        <div className='progess'>
                            <div className='progess-left col-12 col-lg-6'>
                                <div className='starts'>
                                    <span className='info-start'>5 Starts</span>
                                    <span className='progess-middle'></span>
                                    <span className='info-start'>(333)</span>
                                </div>
                                <div className='starts'>
                                    <span className='info-start'>4 Starts</span>
                                    <span className='progess-gr'></span>
                                    <span className='info-start'>(2)</span>
                                </div>
                                <div className='starts'>
                                    <span className='info-g'>3 Starts</span>
                                    <span className='progess-g'></span>
                                    <span className='info-g'>(0)</span>
                                </div>
                                <div className='starts'>
                                    <span className='info-g'>2 Starts</span>
                                    <span className='progess-g'></span>
                                    <span className='info-g'>(0)</span>
                                </div>
                                <div className='starts'>
                                    <span className='info-g mr-2'>1 Start</span>
                                    <span className='progess-g'></span>
                                    <span className='info-g'>(0)</span>
                                </div>
                            </div>
                            <div className='progess-right col-12 col-lg-6'>
                                <div className='starts own'>
                                    Rating Breakdown
                                </div>
                                <div className='starts-content'>
                                    <span className='five-start-text'>Seller communication level</span> <span className='five-start'>5 <i style={{ color: '#ffb237' }} className="fa-solid fa-star"></i></span>
                                </div>
                                <div className='starts-content'>
                                    <span className='five-start-text'>Recommened to a friend</span> <span className='five-start'>5 <i style={{ color: '#ffb237' }} className="fa-solid fa-star"></i></span>
                                </div>
                                <div className='starts-content'>
                                    <span className='five-start-text'>Service  as described</span> <span className='five-start'>5 <i style={{ color: '#ffb237' }} className="fa-solid fa-star"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className='filter'>
                            <p className='filter-title'>Filters</p>
                            <p className='filter-under'>Industry <span style={{ fontWeight: 'bold' }}>All Industries <DownOutlined className='arrowsDown' /></span> </p>
                        </div>
                        {listComment.length !== 0 ? (listComment.length >= 3 ? <div className={commentScroll}>
                            {renderComment()} </div> : <div className='comment'>
                            {renderComment()} </div>) : <div className='mt-4'>
                            <p>0 Comment</p>
                        </div>}
                        <div>
                            {addComment()}
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    useEffect(() => {
        return () => {
            localStorage.removeItem('job__title')
        }
    }, [])

    return (
        <div className='container-fluid'>
            <div className='info-job container'>
                <div className='job-content'>
                    {renderInfoJob()}
                </div>
                <div>
                    {renderRelatedInfo()}
                </div>
            </div>

            <BackTop>
                <div className="backTopStyle">
                    <i className="fa-solid fa-angles-up backTopStyle"></i>
                </div>
            </BackTop>
        </div>
    )
}
