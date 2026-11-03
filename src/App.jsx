
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Page/Home";
import User from "./Page/User";
import Men from "./Page/Men";
import Women from "./Page/Women";
import Kids from "./Page/Kids";
import Dashboard from "./Page/Dashboard";
import Top_Product from "./Page/Top_Product";
import New_Arrivals from "./Page/New_Arrivals";

import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import GlobalLoader from "./component/GlobalLoader";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC LOGIN ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="top-product" element={<Top_Product />} />
            <Route path="new-arrivals" element={<New_Arrivals />} />

          </Route>
        </Route>

        {/* INVALID ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <GlobalLoader />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
