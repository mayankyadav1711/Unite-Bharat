import React, { useEffect, useState, useContext, useReducer, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar } from './components';
import {Alerts, CRD_Dashboard,CRD_Chat,Ecommerce, AdminUniversityList, CRD_Calendar, AdminUserList, AdminStacked, Pyramid, Customers, CRD_Kanban,CRD_GanttChart, Line, Area, Bar, AdminPieChart, Financial, ColorPicker, ColorMapping,ColorMapping2,ColorMapping3, Editor, AdminPieMethod } from './pages';
import './App.css';
import HomeHeader from "./components/Home-Header";
import CRD_NavBar  from "./components/CRD_NavBar";
import CRD_SideBar from "./components/CRD_SideBar";


const Home = lazy(() => import('./components/Home'));
const AuthLogin = lazy(() => import('./components/Auth-Login'));
const AuthSignup = lazy(() => import('./components/Auth-SignUp'));
const AuthOtp = lazy(() => import('./components/Auth-Otp'));
const AuthForgot = lazy(() => import('./components/Auth-Forgot'));
// const Alerts = lazy(() => import('./pages/Alerts'));
const HomeUploadProject = lazy(() => import('./components/Home-UploadProject'));
const AuthReset = lazy(() => import('./components/Auth-ResetPassword'));
const HomeLocked = lazy(() => import('./components/Home-Locked'));
const HomeViewCollege = lazy(() => import('./components/Home-ViewCollege'));
const CollegeList = lazy(() => import('./components/cglist'));
const HomeProjectList = lazy(() => import('./components/Home-ProjectList'));
const HomeViewProject = lazy(() => import('./components/Home-ViewProject'));
const HomeInvitation = lazy(() => import('./components/Home-Invitation'));
const HomeAccept = lazy(() => import('./components/Home-Accept'));
const HomeProjectCategoryList = lazy(() => import('./components/Home-ProjectCategoryList'));
const UserDashboard = lazy(() => import('./components/UserDashboard'));
const ViewProfile = lazy(() => import('./components/ViewProfile'));
import { reducer, initialState } from "./reducers/userReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from './contexts/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
export const UserContext = React.createContext();
const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full border-t-4 border-gray-500 border-opacity-25 h-16 w-16">
      <FontAwesomeIcon icon={faSpinner} size="3x" className="text-blue-500" />
    </div>
  </div>
);
const AdminRoute = ({ element }) => {
  

 

  return element;
};

const MainLayout = ({ children }) => {
  const { currentMode, currentColor, themeSettings, setThemeSettings } = useStateContext();

  return (
  <>    
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
     
      <div className="flex relative dark:bg-main-dark-bg">

        <div className="fixed right-4 bottom-4" style={{  }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
           
          </TooltipComponent>
        </div>
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg" style={{backgroundColor:'#fff' }}>
          <Sidebar />
        </div>
        <div
          className={
            'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-1200'
          }
        >
          <div className="fixed md:static  dark:bg-main-dark-bg navbar w-full" style={{backgroundColor:'#fff',height:'130px',borderBottomLeftRadius:'20px',borderEndEndRadius:'20px',boxShadow:'0px 5px 8.5px -10px black'}}>
            <Navbar />
          </div>
          <div>
       

            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
    </>
  );
};
const CRDLayout = ({ children }) => {
  const { currentMode, currentColor, themeSettings, setThemeSettings } = useStateContext();

  return (
  <>  
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
     
      <div className="flex relative dark:bg-main-dark-bg">

        <div className="fixed right-4 bottom-4" style={{ display: "none" }}>
          
        </div>
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg" style={{backgroundColor:'#fff'}}>
          <CRD_SideBar  />
        </div>
        <div
          className={
            'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-1200'
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full " style={{backgroundColor:'#fff',height:'130px',borderBottomLeftRadius:'20px',borderEndEndRadius:'20px',boxShadow:'0px 5px 8.5px -10px black'}}>
            <CRD_NavBar  />
          </div>
          <div>
            

            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
    </>
  );
};

const Routing = () => {
  const { setCurrentColor, setCurrentMode } = useStateContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const allowedPaths = [
      "/",
      "/login",
      "/register",
      "/otp",
      "/resetpassword",
      "/forgot",
    ]; // Add the paths that don't require login
    const isAllowedPath = allowedPaths.some((path) =>
      window.location.pathname.startsWith(path)
    );

    if (!user && !isAllowedPath) {
      navigate("/login");
    }
    dispatch({ type: "USER", payload: user });
  }, [dispatch, navigate]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <Routes>
      {/* Main layout with header, footer, and sidebar */}
      <Route
       path="/admin/*"
        element={
          <MainLayout>
            <Routes>
              <Route
                path="dashboard"
                element={<AdminRoute element={<Ecommerce />} />}
              />
              <Route
                path="admindashboardbasic"
                element={<AdminRoute element={<Ecommerce />} />}
              />
              <Route
                path="adminuniversitylist"
                element={<AdminRoute element={<AdminUniversityList />} />}
              />
              <Route
                path="adminuserslist"
                element={<AdminRoute element={<AdminUserList />} />}
              />
             
              
              
             
              
              <Route
                path="line"
                element={<AdminRoute element={<Line />} />}
              />
             
              
              <Route
                path="adminpiedomain"
                element={<AdminRoute element={<AdminPieChart />} />}
              />
              <Route
                path="adminpiemethod"
                element={<AdminRoute element={<AdminPieMethod />} />}
              />
              
              <Route
                path="color-mapping"
                element={<AdminRoute element={<ColorMapping />} />}
              />
              <Route
                path="color-mapping2"
                element={<AdminRoute element={<ColorMapping2 />} />}
              />
              <Route
                path="color-mapping3"
                element={<AdminRoute element={<ColorMapping3 />} />}
              />
              <Route
                path="pyramid"
                element={<AdminRoute element={<Pyramid />} />}
              />
              <Route
                path="adminstacked"
                element={<AdminRoute element={<AdminStacked />} />}
              />
               <Route
                path="alerts"
                element={<AdminRoute element={<Alerts />} />}
              />
            </Routes>
          </MainLayout>
        }
      />
      <Route
       path="/crd/*"
        element={
          <CRDLayout>
            <Routes>
              <Route
                path="dashboard"
                element={<AdminRoute element={<CRD_Dashboard />} />}
            />
              <Route
                path="kanban"
                element={<AdminRoute element={<CRD_Kanban />} />}
            />
              <Route
                path="calendar"
                element={<AdminRoute element={<CRD_Calendar />} />}
            />
              <Route
                path="ganttchart"
                element={<AdminRoute element={<CRD_GanttChart />} />}
            />
              <Route
                path="chat"
                element={<AdminRoute element={<CRD_Chat />} />}
            />
            </Routes>
          </CRDLayout>
        }
      />

      {/* Route for the Home component without the main layout */}
      <Route path="/" element={<Suspense fallback={<Spinner />}><Home /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<Spinner />}><AuthLogin /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<Spinner />}><AuthSignup /></Suspense>} />
      <Route path="/otp" element={<Suspense fallback={<Spinner />}><AuthOtp /></Suspense>} />
      <Route path="/forgot" element={<Suspense fallback={<Spinner />}><AuthForgot /></Suspense>} />
      <Route path="/update" element={<Suspense fallback={<Spinner />}><Alerts /></Suspense>} />
      <Route path="/uploadproject" element={<Suspense fallback={<Spinner />}><HomeUploadProject /></Suspense>} />
      <Route path="/resetpassword/:token" element={<Suspense fallback={<Spinner />}><AuthReset /></Suspense>} />
      <Route path="/notallowed" element={<Suspense fallback={<Spinner />}><HomeLocked /></Suspense>} />
      <Route path="/projectlist" element={<Suspense fallback={<Spinner />}><HomeProjectList /></Suspense>} />
      <Route path="/invitation" element={<Suspense fallback={<Spinner />}><HomeInvitation /></Suspense>} />
      <Route path="/projectcategorylist" element={<Suspense fallback={<Spinner />}><HomeProjectCategoryList /></Suspense>} />
      <Route path="/viewproject/:projectId" element={<Suspense fallback={<Spinner />}><HomeViewProject /></Suspense>} />
      <Route path="/userdashboard" element={<Suspense fallback={<Spinner />}><UserDashboard /></Suspense>} />
      <Route path="/viewcollege/:universityId" element={<Suspense fallback={<Spinner />}><HomeViewCollege /></Suspense>} />
      <Route path="/accept" element={<Suspense fallback={<Spinner />}><HomeAccept /></Suspense>} />
      <Route path="/cglist" element={<Suspense fallback={<Spinner />}><CollegeList /></Suspense>} />
      <Route path="/viewprofile/:id" element={<Suspense fallback={<Spinner />}><ViewProfile /></Suspense>} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
        <ToastContainer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
