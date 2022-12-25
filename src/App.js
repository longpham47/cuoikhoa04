import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Loading from './components/LoadingComponent/Loading';
import { AdminTemplate } from './templates/Admin/AdminTemplate';
import ListUserPage from './pages/Admin/QL.User/ListUserPage/ListUserPage';
import Dashboard from './pages/Admin/Dashboard';
import ListJobPage from './pages/Admin/QL.Job/ListJobPage/ListJobPage';
import ListJobType from './pages/Admin/QL.JobType/JobType/ListJobType/ListJobType';
import ListDetail from './pages/Admin/QL.JobType/DetailJobType/ListDetail/ListDetail';
import ListComment from './pages/Admin/QL.Service/Comment/ListComment/ListComment';
import { UserTemplate } from './templates/User/UserTemplate';
import Home from './pages/User/Home/Home';
import AddJobPage from './pages/Admin/QL.Job/AddJobPage/AddJobPage';
import UploadImageJob from './pages/Admin/QL.Job/UploadImageJob/UploadImageJob';
import EditJobPage from './pages/Admin/QL.Job/EditJobPage/EditJobPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RegisterPage from './pages/User/Register/RegisterPage';
import ListJob from './pages/User/ListJob/ListJob';
import AddJobType from './pages/Admin/QL.JobType/JobType/AddJobType/AddJobType';
import EditJobType from './pages/Admin/QL.JobType/JobType/EditJobType/EditJobType';
import AddDetail from './pages/Admin/QL.JobType/DetailJobType/AddDetail/AddDetail';
import ListDetailJob from './pages/User/ListDetailJob/ListDetailJob';
import InfoDetailJob from './pages/User/InfoDetailJob/InfoDetailJob'
import ProfilePage from './pages/User/Profile/ProfilePage'
import AddImageCover from './pages/Admin/QL.JobType/DetailJobType/AddDetail/AddImageCover';
import EditDetail from './pages/Admin/QL.JobType/DetailJobType/EditDetail/EditDetail';
import EditImageCover from './pages/Admin/QL.JobType/DetailJobType/EditDetail/EditImageCover';

import DanhSachUser from './pages/Admin/QL.User/ListUserPage/ListUserPage';

import EditUser from './pages/Admin/QL.User/EditUserPage/EditUserPage';
import ListTCV from './pages/Admin/QL.Service/RentJob/RentJobList/ListTCV';
import AddTCV from './pages/Admin/QL.Service/RentJob/AddRentJob/AddTCV';
import EditTCV from './pages/Admin/QL.Service/RentJob/EditRentJob/EditTCV';
import ThemUserUpAvatar from './pages/Admin/QL.User/UpAvatar/UpAvatar';
import ThemUser2 from './pages/Admin/QL.User/AddUserPage/AddUser2';
import AddComment from './pages/Admin/QL.Service/Comment/AddComment/AddComment';
import EditComment from './pages/Admin/QL.Service/Comment/EditComment/EditComment';







export const history = createBrowserHistory();

function App() {
  
  return (

    <Router history={history}>
      <Loading />
      <Switch>
        {/* User Route */}
        <UserTemplate exact path='/home' component={Home}/>
        <Route exact path='/register' component={RegisterPage}/>
        <UserTemplate exact path='/profile/:id' component={ProfilePage}/>
       
        <UserTemplate exact path='/home' component={Home} />
        <UserTemplate exact path='/user/listjob' component={ListJob} />
        <UserTemplate exact path='/user/listdetail' component={ListDetailJob} />
        <UserTemplate exact path='/user/infojob/:id' component={InfoDetailJob} />

        {/* Admin Route */}
        <AdminTemplate exact path='/admin' component={Dashboard} />
        <AdminTemplate exact path='/admin/list-job' component={ListJobPage} />
        <AdminTemplate exact path='/admin/list-job/add' component={AddJobPage} />
        <AdminTemplate exact path='/admin/list-job/add/upload-image' component={UploadImageJob} />
        <AdminTemplate exact path='/admin/list-job/edit-job/:id' component={EditJobPage} />
        <AdminTemplate exact path='/admin/list-job-type' component={ListJobType} />
        <AdminTemplate exact path='/admin/list-job-type/add' component={AddJobType} />
        <AdminTemplate exact path='/admin/list-job-type/edit-job-type/:id' component={EditJobType} />
        <AdminTemplate exact path='/admin/list-detail-job-type' component={ListDetail} />
        
        {/* thuê công viêc */}
        <AdminTemplate exact path='/admin/list-rent-job' component={ListTCV} />
        <AdminTemplate exact path='/admin/list-rent-job/add' component={AddTCV} />
        <AdminTemplate exact path='/admin/list-rent-job/edit/:id' component={EditTCV} />
        
        {/* người dùng */}
        <AdminTemplate exact path='/admin/list-user' component={DanhSachUser} />
        <AdminTemplate exact path='/admin/list-user/add' component={ThemUser2} />
        <AdminTemplate exact path='/admin/list-user/add/upload-avatar' component={ThemUserUpAvatar} />
        <AdminTemplate exact path='/admin/list-user/edituser/:id' component={EditUser} />

        {/* bình luận */}
        
        <AdminTemplate exact path='/admin/list-comment' component={ListComment} />
        <AdminTemplate exact path='/admin/list-comment/add' component={AddComment} />
        <AdminTemplate exact path='/admin/list-comment/edit/:id' component={EditComment} />
        



        <AdminTemplate exact path='/admin/list-detail-job-type/add' component={AddDetail} />
        <AdminTemplate exact path='/admin/list-detail-job-type/add/upload-image-cover' component={AddImageCover} />
        <AdminTemplate exact path='/admin/list-detail-job-type/edit-job-group/:id' component={EditDetail} />
        <AdminTemplate exact path='/admin/list-detail-job-type/edit/edit-image-cover/:id' component={EditImageCover} />



        {/* Default Route */}
        <UserTemplate exact path='/' component={Home} />

        {/* Error Route */}
        <Route exact path='/error' component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;