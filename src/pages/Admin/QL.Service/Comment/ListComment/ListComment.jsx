import React from 'react'
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { binhLuan } from '../../../../../services/Admin/UserService/UserService';
import { BinhLuanAction, searchCMTAction, xoaBLAction } from '../../../../../redux/Admin/action/UserAction';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { history } from '../../../../../App';


const { Search } = Input;

function ListComment() {
  let dispatch = useDispatch();
  let { arrBL } = useSelector((state) => state.QLNDreducer);
  useEffect(() => {
    binhLuan();
  }, []);
  const binhLuan = () => {
    let action = BinhLuanAction();
    dispatch(action);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
     
    },
    {
      title: 'Rent Job ID',
      dataIndex: 'maCongViec',
      defaultSortOrder: 'descend',
      
    },
    {
      title: 'Commentator ID',
      dataIndex: 'maNguoiBinhLuan',
      
    },
    {
      title: 'Comment Day',
      dataIndex: 'ngayBinhLuan',
     
    },
    {
      title: 'Content',
      dataIndex: 'noiDung',
    },
    {
      title: 'Evaluate',
      dataIndex: 'saoBinhLuan',
    },

    {
      title: "Edit",
      dataIndex: "id",
      render: (text, users) => {
        return <>
          <NavLink key={1} className="" to={`/admin/list-comment/edit/${users.id}`}><EditOutlined /> </NavLink>
          <span style={{ cursor: 'pointer' }} key={2} className="" onClick={() => {
            if (window.confirm("bạn có chắt muốn xoá dữ liệu của ID : " + users.id)) {
              dispatch(xoaBLAction(users.id));
            }
          }}><DeleteOutlined /></span>
        </>
        
      }
    }
  ];

  const data = arrBL;


  const onSearch = (value) => {
    if (value !== '') {
      dispatch(searchCMTAction(value));
    }
    binhLuan()
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className=" mx-auto my-3">
      <h4 className="text-info"><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard /</NavLink>Comment History</h4>

      <button onClick={() => {
        history.push('/admin/list-comment/add')
      }} className="btn btn-success my-3"><i className="fa-solid fa-plus"></i> Add Comment</button>

      <Search className='mb-5' placeholder="Input Rent Job ID" onSearch={onSearch} enterButton={<SearchOutlined />} size="large" />

      <Table rowKey={'id'} columns={columns} dataSource={data} />
    </div>
  );
}

export default ListComment
