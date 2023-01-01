import React, { useState } from "react";
import {
  MinusCircleIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function AdminDeleteEmployee({ deleteStatus, setDeleteStatus }) {
  return (
    <div>
      <div
        className={`shadow-sm text-white ${
          deleteStatus
            ? "bg-red-400 hover:bg-red-500  "
            : "bg-blue-400 hover:bg-blue-500"
        } transition ease-in-out `}
      >
        <button
          className="flex items-center justify-center gap-1 p-1  w-full hover:scale-110 transition ease-in-out"
          onClick={() => {
            setDeleteStatus(!deleteStatus);
          }}
        >
          {deleteStatus ? (
            <>
              close <XCircleIcon className="w-4" />
            </>
          ) : (
            <>
              Remove Employee <MinusCircleIcon className="w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AdminDeleteEmployee;
