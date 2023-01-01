import React, { useContext, useState } from "react";
import moment from "moment";
import {
  PlusCircleIcon,
  XCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";

function AdminAddEmployee({ fetch }) {
  const { register } = useContext(AuthContext);
  const [addingStatus, setAddingStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addInput, setAddInput] = useState({
    nameTH: "",
    nameENG: "",
    department: "",
    employmentDate: moment().format("yyyy-MM-DD"),
    employeeCode: "",
    bankAccount: "",
    username: "",
    password: "",
    position: "",
  });
  const [placeHolder, setPlaceHolder] = useState({
    nameTH: "",
    nameENG: "",
    department: "",
    employeeCode: "",
    bankAccount: "",
    username: "",
    password: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChangeAddInput = (e) => {
    setAddInput({ ...addInput, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const validationError = {
      nameTH: "",
      nameENG: "",
      department: "",
      employeeCode: "",
      bankAccount: "",
      username: "",
      password: "",
      position: "",
    };

    for (const [key, value] of Object.entries(addInput)) {
      if (key === "nameTH" && !/^[\sก-๛]+$/.test(value)) {
        validationError[key] = "เฉพาะตัวอักษร ก-ฮ เท่านั้น";
      }
      if (key === "nameENG" && !/^[\sa-zA-Z]+$/.test(value)) {
        validationError[key] = "เฉพาะตัวอักษร A-Z เท่านั้น";
      }
      if (
        (key === "department" || key === "position") &&
        !/^[\sa-zA-Zก-๛]+$/.test(value)
      ) {
        validationError[key] = "เฉพาะตัวอักษร A-Z และ ก-ฮ เท่านั้น";
      }
      if (value.trim() === "") {
        validationError[key] = "ช่องนี้เว้นว่างไม่ได้";
      }
    }

    setPlaceHolder({ ...placeHolder, ...validationError });

    const empty = {};

    for (const [key, value] of Object.entries(addInput)) {
      if (key !== "employmentDate" && validationError[key] !== "") {
        empty[key] = "";
      }
    }

    setAddInput({ ...addInput, ...empty });

    for (const [key, value] of Object.entries(validationError)) {
      if (value.trim() !== "") {
        return;
      }
    }

    try {
      setLoading(true);
      await register(addInput);
      setSuccess(true);
      setTimeout(() => {
        setAddingStatus(false);
      }, 1000);
      fetch();
    } catch (error) {
      if (error.response.data.message.match("employeeCode_1 dup key")) {
        setPlaceHolder({ ...placeHolder, employeeCode: "รหัสพนักงานซ้ำ" });
        setAddInput({ ...addInput, employeeCode: "" });
      }
      if (error.response.data.message.match("username_1 dup key")) {
        setPlaceHolder({ ...placeHolder, username: "username ซ้ำ" });
        setAddInput({ ...addInput, username: "" });
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
      }, 1000);
    }
  };

  return (
    <div>
      <div
        className={`shadow-sm text-white ${
          addingStatus
            ? "bg-red-400 hover:bg-red-500  "
            : "bg-blue-400 hover:bg-blue-500"
        } transition ease-in-out `}
      >
        <button
          className="flex items-center justify-center gap-1 p-1  w-full hover:scale-110 transition ease-in-out"
          onClick={() => {
            setAddingStatus(!addingStatus);
          }}
        >
          {addingStatus ? (
            <>
              close <XCircleIcon className="w-4" />
            </>
          ) : (
            <>
              Add Employee <PlusCircleIcon className="w-4" />
            </>
          )}
        </button>
      </div>
      <div
        className={`flex flex-wrap justify-evenly transition-all ease-out duration-300 text-sm   ${
          addingStatus
            ? "h-fit  p-2 gap-1 shadow-md "
            : "h-0 opacity-0 invisible "
        } `}
      >
        <div>รหัสพนักงาน</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="employeeCode"
          placeholder={placeHolder.employeeCode}
          value={addInput.employeeCode}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>ชื่อภาษาอังกฤษ</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="nameENG"
          placeholder={placeHolder.nameENG}
          value={addInput.nameENG}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>ชื่อภาษาไทย</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="nameTH"
          placeholder={placeHolder.nameTH}
          value={addInput.nameTH}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>ตำแหน่ง</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="position"
          placeholder={placeHolder.position}
          value={addInput.position}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>แผนก</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="department"
          placeholder={placeHolder.department}
          value={addInput.department}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>วันเริ่มงาน</div>
        <input
          className="text-sm border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="date"
          name="employmentDate"
          value={addInput.employmentDate}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>ชื่อธนาคาร และ เลขที่บัญชี </div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="bankAccount"
          placeholder={placeHolder.bankAccount}
          value={addInput.bankAccount}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>username</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="username"
          placeholder={placeHolder.username}
          value={addInput.username}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <div>password</div>
        <input
          className="border rounded-sm  border-slate-200 hover:border-blue-400 w-40 h-5"
          type="text"
          name="password"
          placeholder={placeHolder.password}
          value={addInput.password}
          onChange={(e) => {
            handleChangeAddInput(e);
          }}
        />
        <button
          className={`flex justify-center items-center w-16 m-2 h-7 shadow-md  bg-blue-400 hover:bg-blue-500 text-white rounded-md  transition ease-in-out ${
            success && "bg-green-400 hover:bg-green-400"
          }`}
          onClick={() => {
            handleSave();
          }}
        >
          {success ? (
            <CheckIcon className="w-4" />
          ) : loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className=" w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            "save"
          )}
        </button>
      </div>
    </div>
  );
}

export default AdminAddEmployee;
