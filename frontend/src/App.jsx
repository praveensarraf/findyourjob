import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ChangePassword from './components/shared/ChangePassword';
import Jobs from './components/candidates/jobs/Jobs';
import JobDescription from './components/candidates/jobs/JobDescription';
import Browse from './components/candidates/browse/Browse';
import Profile from './components/candidates/profile/Profile';
import ProfileEdit from './components/candidates/profile/ProfileEdit';
import SavedJobs from './components/candidates/jobs/SavedJobs';
import Companies from './components/admin/adminHome/Companies';
import AdminJobs from './components/admin/adminJobs/AdminJobs';
import CompanyCreate from './components/admin/adminHome/CompanyCreate';
import CompanySetUp from './components/admin/adminHome/CompanySetUp';
import PostJob from './components/admin/adminJobs/PostJob';
import Applicants from './components/admin/adminJobs/Applicants';
import AdminJobEdit from './components/admin/adminJobs/AdminJobEdit';
import AdminProfile from './components/admin/adminProfile/AdminProfile';
import AdminProfileEdit from './components/admin/adminProfile/AdminProfileEdit';
import NotFound from './components/NotFound';
import ProtectedAdminRoutes from './components/admin/ProtectedAdminRoutes';


const appRouter = createBrowserRouter([
  {
    path : '/login',
    element : <Login/>
  },

  {
    path : '/signup',
    element : <Signup/>
  },

  {
    path : '/',
    element : <Home/>
  },

  {
    path : '/jobs',
    element : <Jobs/>
  },

  {
    path : '/description/:id',
    element : <JobDescription/>
  },

  {
    path : '/bookmarks',
    element : <SavedJobs/>
  },

  {
    path : '/browse',
    element : <Browse/>
  },

  {
    path : '/profile',
    element : <Profile/>
  },

  {
    path : '/profile/edit',
    element : <ProfileEdit/>
  },

  {
    path : '/change-password',
    element : <ChangePassword/>
  },

  // Routes for Admin Panel
  
  {
    path : '/admin/companies',
    element : <ProtectedAdminRoutes><Companies/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/companies/create',
    element : <ProtectedAdminRoutes><CompanyCreate/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/companies/:id',
    element : <ProtectedAdminRoutes><CompanySetUp/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/jobs',
    element : <ProtectedAdminRoutes><AdminJobs/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/jobs/create',
    element : <ProtectedAdminRoutes><PostJob/></ProtectedAdminRoutes>
  },

  {
    path : '/:id/update',
    element : <ProtectedAdminRoutes><AdminJobEdit/></ProtectedAdminRoutes>
  },
  
  {
    path : '/admin/jobs/:id/applicants',
    element : <ProtectedAdminRoutes><Applicants/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/profile',
    element : <ProtectedAdminRoutes><AdminProfile/></ProtectedAdminRoutes>
  },

  {
    path : '/admin/profile/edit',
    element : <ProtectedAdminRoutes><AdminProfileEdit/></ProtectedAdminRoutes>
  },

  {
    path : '*',
    element : <NotFound/>
  },

]);

function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
