import { Table, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getJobInfoAction, getListJobAction, getListJobByNameAction, removeJobAction } from "../../../../redux/Admin/action/JobAction";
import { history } from '../../../../App'

const { Search } = Input;

function ListJobPage() {
  let dispatch = useDispatch();

  let { jobArr } = useSelector((state) => state.JobReducer);

  useEffect(() => {
    getListJob();
  }, []);

  const getListJob = () => {
    let action = getListJobAction();
    dispatch(action);
  };

  const columns = [
    {
      title: "Job ID",
      dataIndex: "id",
      value: (text, object) => {
        return <span>{text}</span>;
      },
      width: 100,
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
      title: "Job Image",
      dataIndex: "hinhAnh",
      render: (text, job, index) => { 
        return (
          <>
            <img
              src={job.hinhAnh}
              alt={job.tenCongViec}
              width={120}
              height={100}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/100/120`;
              }}
            />
          </>
        );
      },
    },
    {
      title: "Job Name",
      dataIndex: "tenCongViec",
      width: 300,
      sorter: (a, b) => {
        let tenA = a.tenCongViec.toLowerCase().trim();
        let tenB = b.tenCongViec.toLowerCase().trim();

        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Job Description",
      dataIndex: "moTa",
      sorter: () => {

      },
      render: (text, job) => {
        return <>
          {job.moTa.length > 50 ? job.moTa.substr(0, 80) + ' ...' : job.moTa}
        </>
      }
    },
    {
      title: 'Job Action',
      width: 200,
      render: (text, job) => {
        return <>
          <button key={1} onClick={() => {
            dispatch(getJobInfoAction(job.id))
          }} className="btn btn-info mr-2"><i className="fa-solid fa-pen-to-square"></i></button>
          <button key={2} onClick={() => {
            if (window.confirm(`You want remove job id is ${job.id} ?`)) {
              dispatch(removeJobAction(job.id));
            }
          }} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
        </>
      }
    }
  ];

  const data = jobArr;

  const onSearch = (value) => {
    if (value !== '') {
      dispatch(getListJobByNameAction(value));
    }
    getListJob();
  };

  return (
    <div className="container mx-auto my-3">
      <h4 className="text-info"><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard /</NavLink> Manage Job</h4>

      <button onClick={() => {
        history.push('/admin/list-job/add')
      }} className="btn btn-success my-3"><i className="fa-solid fa-plus"></i> Add job</button>

      <Search className='mb-5' placeholder="Input job name" onSearch={onSearch} enterButton={<SearchOutlined />} size="large" />

      <Table rowKey={'id'} columns={columns} dataSource={data} />
    </div>
  );
}

export default ListJobPage;