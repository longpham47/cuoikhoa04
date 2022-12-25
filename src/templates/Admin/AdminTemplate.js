import {
    PieChartOutlined,
    UserOutlined,
    SnippetsOutlined,
    OrderedListOutlined,
    CaretDownOutlined,
    LogoutOutlined,
    ExportOutlined,
    InfoCircleOutlined,
    ApartmentOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, Route } from "react-router-dom";
import { history } from '../../App';
import { USER_ID } from '../../utils/varsSetting';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<NavLink style={{ fontSize: '22px', fontWeight: 'bold', textDecoration: 'none' }} to='/admin'>Dashboard</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink style={{ textDecoration: 'none' }} to='/admin/list-user'>Manage User</NavLink>, '2', <UserOutlined />),
    getItem(<NavLink style={{ textDecoration: 'none' }} to='/admin/list-job'>Manage Job</NavLink>, '3', <SnippetsOutlined />),
    getItem('Manage Job Type', '4', <OrderedListOutlined />, [
        getItem(<NavLink to='/admin/list-job-type' style={{ textDecoration: 'none' }}>Job Type</NavLink>, '5'),
        getItem(<NavLink to='/admin/list-detail-job-type' style={{ textDecoration: 'none' }}>Job Type Detail</NavLink>, '6')
    ]),
    getItem('Manage Service', '7', < ApartmentOutlined />, [
        getItem(<NavLink to='/admin/list-rent-job' style={{ textDecoration: 'none' }}>Rent Job</NavLink>, '8'),
        getItem(<NavLink to='/admin/list-comment' style={{ textDecoration: 'none' }}>Comment</NavLink>, '9')
    ])
];

export const AdminTemplate = (props) => {

    document.title = 'Admin | Fiverr';

    const [collapsed, setCollapsed] = useState(false);

    const isYourAdmin = () => {
        if (localStorage.getItem('user_role') !== 'ADMIN' || localStorage.getItem('token') === null) {
            history.push('/error')
        }
    }

    useEffect(() => {
        isYourAdmin();
    }, [])

    return (
        <Route exact path={props.path} render={(propsRoute) => {
            return (
                <>
                    <Layout
                        style={{
                            minHeight: '100vh',
                        }}
                    >
                        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                        </Sider>

                        <Layout className="site-layout">
                            <Header
                                className="site-layout-background"
                                style={{
                                    padding: 0,
                                }}
                            />
                            <Content
                                style={{
                                    margin: '0 16px',
                                }}
                            >
                                <Menu mode="horizontal" style={{ justifyContent: "flex-end", fontWeight: 'bold', verticalAlign: 'center' }}>
                                    <Menu.SubMenu key="SubMenu" title="Hi Admin" icon={<CaretDownOutlined />}>
                                        <Menu.Item onClick={() => {
                                            history.push(`/profile/${localStorage.getItem(USER_ID)}`);
                                        }} key="info-admin" icon={<InfoCircleOutlined />}>
                                            My Info
                                        </Menu.Item>
                                        <Menu.Item key="exit-admin" onClick={() => {
                                            history.push('/')
                                        }} icon={<ExportOutlined />}>
                                            Exit Admin Page
                                        </Menu.Item>
                                        <Menu.Item onClick={() => {
                                            if (window.confirm("Do you want to sign out ?")) {
                                                localStorage.clear();
                                                history.push('/');
                                                window.location.reload();
                                            }
                                        }} key="log-out" icon={<LogoutOutlined />}>
                                            Sign Out
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                                <props.component {...propsRoute} />
                            </Content>
                        </Layout>
                    </Layout>
                </>
            )
        }} />
    );
};