import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { cookieExists, getCookie } from "./Helper/CookieHelper";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// Lazy-loaded components
const Layout = lazy(() => import("./Components/Layout/Layout"));
const MianPage = lazy(() => import("./Components/MainPage/MianPage"));
const Login = lazy(() => import("./Components/Login/Login"));
const Blog = lazy(() => import("./Components/Blog/Blog"));
const Teachers = lazy(() => import("./Components/Teachers/Teachers"));
const IslamicCourse = lazy(() => import("./Components/MainCourses/IslamicCourse"));
const ArabicCourse = lazy(() => import("./Components/MainCourses/ArabicCourse"));
const QuranCourse = lazy(() => import("./Components/MainCourses/QuranCourse"));
const FAQs = lazy(() => import("./Components/FAQs/FAQs"));
const SignUp = lazy(() => import("./Components/SignUp/signUp"));
const Scholarships = lazy(() => import("./Components/Scholarships/Scholarships"));
const Qualitycontent = lazy(() => import("./Components/Qualitycontent/Qualitycontent"));
const Teachingmethod = lazy(() => import("./Components/TeachingMethodology/Teachingmethod"));
const ArabicDetailedCourses = lazy(() => import("./Components/DetailedCourses/ArabicDetailedCourses"));
const IslamicDetailedCourses = lazy(() => import("./Components/DetailedCourses/IslamicDetailedCourses"));
const QuranDetailedCourses = lazy(() => import("./Components/DetailedCourses/QuranDetailedCourses"));
const FamilyDashboard = lazy(() => import("./Components/FamilyDashboard/FamilyReport"));
const JoinAsTeacher = lazy(() => import("./Components/JoinAsTeacher/JoinAsTeacher"));
const FreeTrial = lazy(() => import("./Components/Free-Trial/FreeTrial"));
const ResetPassword = lazy(() => import("./Components/ResetPassword/ResetPassword"));
const PaymentReport = lazy(() => import("./Components/FamilyDashboard/PaymentReport"));
const Profile = lazy(() => import("./Components/FamilyDashboard/Profile"));
const UpdateProfile = lazy(() => import("./Components/FamilyDashboard/UpdateProfile"));
const ChangePassword = lazy(() => import("./Components/FamilyDashboard/ChangePassword"));
const ChangeEmail = lazy(() => import("./Components/FamilyDashboard/ChangeEmail"));
const LayoutFamily = lazy(() => import("./Components/LayoutFamily/LayoutFamily"));
const PaymentSuccess = lazy(() => import("./Components/FamilyDashboard/PaymentSuccess"));
const PaymentFailure = lazy(() => import("./Components/FamilyDashboard/PaymentFailure"));
const TheCourse = lazy(() => import("./Components/DetailedCourses/EachCourse/The-course-itself"));
const TheBlog = lazy(() => import("./Components/Blog/EachBlog/The-blog-itself"));

// ========================= PROTECTED ROUTE =========================
const isAuthenticated = () => {
  console.log(cookieExists("refreshToken"));
  if (cookieExists("AccessToken") === false) {
    return false;
  } else {
    return true;
  }
};

const ProtectedRoute = ({ element, path }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{element}</>;
};
// ========================= PROTECTED ROUTE =========================

async function loginWithRefreshToken() {
  try {
    const res = await axios.post(
      `https://el-burhanacademy.azurewebsites.net/Authentication/FamilyLoginWithCookie`,
      {
        refreshToken: getCookie("refreshToken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    sessionStorage.setItem("AccessToken", res.data.token);
    sessionStorage.setItem("refreshToken", res.data.refreshToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function App() {
  useEffect(() => {
    if (cookieExists("refreshToken") === false) {
      return;
    }
    loginWithRefreshToken();
  }, []);

  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <MianPage /> },
        { path: "/login", element: <Login /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/arabic", element: <ArabicCourse /> },
        { path: "/arabic-courses", element: <ArabicDetailedCourses /> },
        { path: "/islamic-courses", element: <IslamicDetailedCourses /> },
        { path: "/quran-courses", element: <QuranDetailedCourses /> },
        { path: "/islamic", element: <IslamicCourse /> },
        { path: "/quran", element: <QuranCourse /> },
        { path: "/scholarships", element: <Scholarships /> },
        { path: "/quality-assurance", element: <Qualitycontent /> },
        { path: "/teaching-methodology", element: <Teachingmethod /> },
        { path: "/blog", element: <Blog /> },
        { path: "/teachers", element: <Teachers /> },
        { path: "/faqs", element: <FAQs /> },
        { path: "/free-trial", element: <FreeTrial /> },
        { path: "/join-as-teacher", element: <JoinAsTeacher /> },
        { path: "/The-course-itself", element: <TheCourse /> },
        { path: "/The-course-itself/:courseID", element: <TheCourse /> },
        { path: "/The-blog-itself/:blogID", element: <TheBlog /> },
      ],
    },
    {
      path: "",
      element: <LayoutFamily />,
      children: [
        { path: "/FamilyDashboard", element: <ProtectedRoute element={<FamilyDashboard />} /> },
        { path: "/payment-report", element: <ProtectedRoute element={<PaymentReport />} /> },
        { path: "/FamilyDashboard/profile", element: <ProtectedRoute element={<Profile />} /> },
        { path: "/FamilyDashboard/updateProfile", element: <ProtectedRoute element={<UpdateProfile />} /> },
        { path: "/FamilyDashboard/updateEmail", element: <ProtectedRoute element={<ChangeEmail />} /> },
        { path: "/FamilyDashboard/ChangePassword", element: <ProtectedRoute element={<ChangePassword />} /> },
      ],
    },
    { path: "/payment-success", element: <ProtectedRoute element={<PaymentSuccess />} /> },
    { path: "/payment-failed", element: <ProtectedRoute element={<PaymentFailure />} /> },
  ]);

  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
