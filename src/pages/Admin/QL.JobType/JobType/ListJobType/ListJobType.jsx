import React, { useEffect } from 'react'
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getJobTypeByIDAction, getListJobTypeAction, removeJobTypeAction } from '../../../../../redux/Admin/action/jobTypeAction';
import './style.css'
import { NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../../../../../App';

const { Search } = Input;

function ListJobType() {

  let dispatch = useDispatch();

  let { jobTypeArr } = useSelector((state) => {
    return state.JobTypeReducer
  })

  const getListJobType = () => {
    return dispatch(getListJobTypeAction())
  }

  useEffect(() => {
    getListJobType();
  }, [])

  const columns = [
    {
      title: 'Job Type ID',
      dataIndex: 'id',
      sorter: (a, b) => {

        let tenA = a.id;
        let tenB = b.id;

        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Job Type Name',
      dataIndex: 'tenLoaiCongViec',
      sorter: (a, b) => {

        let tenA = a.tenLoaiCongViec;
        let tenB = b.tenLoaiCongViec;

        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Job Type Action',
      render: (text, jobType) => {
        return <>
          <button onClick={() => {

            localStorage.setItem('Job_Type_ID', JSON.stringify(jobType.id));
            history.push(`/admin/list-job-type/edit-job-type/${jobType.id}`);

          }} className="btn btn-info mr-2">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => {
            if (window.confirm(`You want remove job type ID is ${jobType.id} ?`)) {
              dispatch(removeJobTypeAction(jobType.id));
            }
          }} className="btn btn-danger">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </>
      }
    }
  ];

  const data = jobTypeArr;

  const onSearch = (value) => {
    if (value !== '') {
      dispatch(getJobTypeByIDAction(value));
    }
    getListJobType()
  };

  return (
    <div className="container mx-auto my-3">
      <h4 className="text-info"><NavLink className='myNavLink' to='/admin'>Dashboard /</NavLink> Manage Job Type</h4>

      <button onClick={() => {
        history.push('/admin/list-job-type/add')
      }} className="btn btn-success my-3"><i className="fa-solid fa-plus"></i> Add job type</button>

      <Search className='mb-5' placeholder="Input job type ID" onSearch={onSearch} enterButton={<SearchOutlined />} size="large" />

      <Table id='jobTypeTable' rowKey={'id'} columns={columns} dataSource={data} />
    </div>
  )
}

export default ListJobType