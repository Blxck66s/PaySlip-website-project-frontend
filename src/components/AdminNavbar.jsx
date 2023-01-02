import React, { useContext } from "react";
import amiris from "../amiris.png";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";

function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between text-md h-20  w-full top-0   ">
      <img src={amiris} alt="logo" className="max-md:pl-2 pl-10 h-full" />

      <button
        onClick={() => logout()}
        className="pr-10 max-md:pr-2 max-md:p-2 flex items-center p-7 text-white hover:text-red-500 delay-150 ease-in-out transition hover:scale-125 hover:animate-pulse"
      >
        ออกจากระบบ
        <ArrowRightOnRectangleIcon className="h-5 w-5 " />
      </button>
    </div>
  );
}

export default AdminNavbar;
