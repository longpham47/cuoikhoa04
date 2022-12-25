import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emptyImg from '../../../assets/User/images/empty-search-results.png';
import './listJob.css';
import { BackTop, Rate } from 'antd';
import { Pagination } from 'antd';
import { history } from '../../../App';
import { renderResponsive } from '../../../utils/checkScreen'
import { upperFirstLett } from '../../../utils/customStyle'


export default function ListJob(props) {

  document.title = `Fiverr / Search results for '${localStorage.getItem('job_name_search')}'`;

  const { listjob } = useSelector(state => state.ManegeListJobReducer);

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => {
      localStorage.removeItem('job_name_search')
    }
  }, [])

  if (listjob.length === 0) {
    return <div className='container empty-br'>
      <div className='imgEmpty text-center'>
        <img className='empty img-fluid' src={emptyImg} alt="empty-search-results" />
      </div>
      <div className='text-empty text-center'>
        {renderResponsive() ? <>
          <h4 className='text-notification'>No Results Found</h4>
          <p className='text-notification-ct'>Try a new search or get a free quote for your project
            from our community of freelancers.
          </p>
        </> : <>
          <h2 className='text-notification'>No Results Found</h2>
          <p className='text-notification-ct'>Try a new search or get a free quote for your project <br />
            from our community of freelancers.
          </p>
        </>}

      </div>

    </div>
  }

  const renderListJob = () => {
    return listjob.map((job, index) => {
      const { congViec } = job
      return <div onClick={() => {
        let tempTitle = congViec.tenCongViec.substr(7, 300);
        upperFirstLett(tempTitle);
        history.push(`/user/infojob/${job.id}`)
      }} className="card job__card" key={index}>
        <div className='card-img'>
          <img src={congViec.hinhAnh} className="card-img-job" alt="..." />
        </div>
        <div className="card-body">
          <div className='card-avatar'>
            <div className='card-avatar-job'>
              <img className='img-avatar' src={job.avatar} alt="" />
            </div>
            <div className='card-content'>
              <p className='card-content-adim'>{job.tenNguoiTao}</p>
              <p className='card-content-adimCV '>{job.tenChiTietLoai}</p>
            </div>
          </div>
          <p className="card-title">{congViec.tenCongViec}</p>

          <Rate allowHalf value={congViec.saoCongViec} disabled />
          <span className='card-text'>{congViec.danhGia}</span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><i className="fa-solid fa-heart icon-heart"></i></li>
          <li className='list-group-item font-weight-bold'>STARTING AT ${congViec.giaTien}</li>
        </ul>
      </div>
    })
  }

  return (
    <div>
      <div className='suggested'>
        <p className='sug-text'>Suggested</p>
        <button className='sug'>html css</button>
        <button className='sug'>html website</button>
        <button className='sug'>psd to html</button>
        <button className='sug'>html email</button>
        <button className='sug'>css</button>
        <button className='sug'>figma to html</button>
        <button className='sug'>javascript</button>
      </div>
      <div className='result'>
        <h2 className='result-html'>Result for "{localStorage.getItem('job_name_search')}"</h2>
        <div className='result-btn'>
          <button className="btn btn__job__filter dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Category
          </button>
          <button className="btn btn__job__filter dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Service Options
          </button>
          <button className="btn btn__job__filter dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Seller Details
          </button>
          <button className="btn btn__job__filter dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Budget
          </button>
          <button className="btn btn__job__filter dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Delivery time
          </button>

          {!renderResponsive() ? <>
            <div className='result-right-cover'>
              <div className='result-right'>
                <button className='btn-right'>
                  <div className='cricle-btn'></div>
                </button>
                <span>Pro services</span>
              </div>

              <div className='result-right'>
                <button className='btn-right'>
                  <div className='cricle-btn'></div>
                </button>
                <span>Local sellers</span>
              </div>

              <div className='result-right'>
                <button className='btn-right'>
                  <div className='cricle-btn'></div>
                </button>
                <span>Online sellers</span>
              </div>
            </div>
          </> : null}

        </div>
        <div className='list-job'>
          {renderListJob()}
        </div>
        <Pagination style={{ textAlign: 'center', marginBottom: '20px' }} current={current} onChange={onChange} total={50} />
        <div>
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