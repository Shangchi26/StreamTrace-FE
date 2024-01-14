import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./Loading";
const Provider = lazy(() => import("./pages/Provider"));
const Channel = lazy(() => import("./pages/Channel"));
const Package = lazy(() => import("./pages/Package"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyVideo = lazy(() => import("./pages/MyVideo"));
const Admin = lazy(() => import("./admin/pages/Admin"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const User = lazy(() => import("./admin/pages/User"));
const Order = lazy(() => import("./admin/pages/Order"));
const Profile = lazy(() => import("./pages/Profile"));
const Video = lazy(() => import("./pages/Video"));
const Main = lazy(() => import("./pages/Main"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const AdminLogin = lazy(() => import("./admin/auth/Login"));
const VideoManage = lazy(() => import("./admin/pages/Video"));
const PackageManage = lazy(() => import("./admin/pages/Package"));
import { UserProvider } from "./context/UserContext";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Main />}>
                <Route index element={<Home />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/provider" element={<Provider />}>
                  <Route index element={<Channel />} />
                  <Route path="/provider/package" element={<Package />} />
                  <Route path="/provider/video" element={<MyVideo />} />
                  <Route path="/provider/upload-video" element={<UploadVideo />} />
                </Route>
                <Route path="/checkout/:packageId" element={<Checkout />} />
                <Route path="/user-profile" element={<Profile />} />
              </Route>
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="/admin/user-manage" element={<User />} />
                <Route path="/admin/video-manage" element={<VideoManage />} />
                <Route path="/admin/all-order" element={<Order />} />
                <Route
                  path="/admin/package-manage"
                  element={<PackageManage />}
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
