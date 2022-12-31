import React, { useContext } from "react";
import Nav from "./AdminNav";
import amiris from "../amiris.webp";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";

function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between text-md h-20  w-full top-0  shadow-md">
      <img src={amiris} alt="logo" className=" pl-10 h-1/2" />
      <Nav />
      <button
        onClick={() => logout()}
        className="pr-10 flex items-center p-7 hover:text-red-500 delay-150 ease-in-out transition hover:scale-125 hover:animate-pulse"
      >
        ออกจากระบบ
        <ArrowRightOnRectangleIcon className="h-5 w-5 " />
      </button>
    </div>
  );
}

export default AdminNavbar;
