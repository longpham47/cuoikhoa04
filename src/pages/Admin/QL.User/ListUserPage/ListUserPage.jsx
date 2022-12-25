import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import useSelection from "antd/lib/table/hooks/useSelection";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { danhSachUserAction, LayThongTinUserAction, searchUserAction, xoaUserAction } from '../../../../redux/Admin/action/UserAction';
import { QLNDreducer } from '../../../../redux/Admin/reducer/QLNDReducer';


const { Search } = Input;

function DanhSachUser() {
  let dispatch = useDispatch();

  let { arrUser } = useSelector((state) => state.QLNDreducer);

  useEffect(() => {
    danhSachUser();
  }, []);

  const danhSachUser = () => {
    let action = danhSachUserAction();
    dispatch(action);
  };


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width:'3%',
    },
    {
      title: 'name',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      width:'5%'  
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width:'5%'
    },
    {
      title: 'password',
      dataIndex: 'password',
      width:'7%'
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width:'7%'
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      width:'7%'
  
    },
    {
      title: "avatar",  
      dataIndex: "avatar",
      render: (text, users, index) => {
        return (
          <>
            <img
              src={users.avatar}
              alt={users.avatar}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </>
        );
      },
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'role',
      dataIndex: 'role',
    },
    {
      title: "Edit",
      dataIndex: "id",
      render: (text, users) => {  
        return <>
        <button key={1} onClick={() => {
          dispatch(LayThongTinUserAction(users.id))
        }} className="btn btn-info mr-2"><i className="fa-solid fa-pen-to-square"></i></button>
        <button key={2} onClick={() => {
            if (window.confirm("bạn có chắt muốn xoá dữ liệu của ID : " + users.id)) {
       dispatch(xoaUserAction(users.id));
      }
        }} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
      </>
      }
    }
  ];

  const data = arrUser;


  const onSearch = (value) => {
    if (value !== '') {
      dispatch(searchUserAction(value));
    }
    danhSachUser()
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className=" mx-auto my-3">
      <h4 className="text-info"><NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin'>Dashboard /</NavLink>  Manage User</h4>

      <button onClick={() => {
        history.push('/admin/list-user/add')
      }} className="btn btn-success my-3"><i className="fa-solid fa-plus"></i>Add User</button>

      <Search className='mb-5' placeholder="nhập họ tên người dùng" onSearch={onSearch} enterButton={<SearchOutlined />} size="large" />

      <Table rowKey={'id'} columns={columns} dataSource={data} />
    </div>
  );
}

export default DanhSachUser