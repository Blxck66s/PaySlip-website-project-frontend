import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AdminHome from "../pages/Admins/AdminHome";
import LoginPage from "../pages/LoginPage";
import UserHome from "../pages/Users/UserHome";

function Router() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
        user.admin ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<AdminHome />} />
          </Route>
        ) : (
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
          </Route>
        )
      ) : (
        <Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}

export default Router;
