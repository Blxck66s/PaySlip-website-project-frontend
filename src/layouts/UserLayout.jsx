import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

function UserLayout() {
  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  );
}

export default UserLayout;
