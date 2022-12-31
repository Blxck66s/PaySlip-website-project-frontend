import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="flex items-center text-lg">
      <NavLink
        to="/home"
        className={` p-7 hover:text-blue-500 delay-150 ease-in-out transition hover:scale-125  hover:animate-pulse ${({
          isActive,
        }) => (isActive ? "active" : "")}`}
      >
        หน้าหลัก
      </NavLink>
      <NavLink
        to="/history"
        className={`p-7 hover:text-blue-500 delay-150 ease-in-out transition hover:scale-125 hover:animate-pulse  ${({
          isActive,
        }) => (isActive ? "active" : "")}`}
      >
        ประวัติทั้งหมด
      </NavLink>
    </div>
  );
}

export default Nav;
