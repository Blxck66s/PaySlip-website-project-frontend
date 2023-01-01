import React, { useContext, useState } from "react";
import {
  PlusCircleIcon,
  XCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { EmployeeContext } from "../contexts/employeeContext";

function AdminAddPayroll({ input, setSelectedEmployee, handleChangeInput }) {
  const { createSalary, getSpecificEmployeeSalaries } =
    useContext(EmployeeContext);
  const [addingStatus, setAddingStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Earnings, setEarnings] = useState({
    Salary: 0,
    OverTime: 0,
    Commision: 0,
    AllowanceCostOfLivings: 0,
    Bonus: 0,
    OthersEarnings: 0,
  });
  const [Deductions, setDeductions] = useState({
    SocialSecurityFund: 0,
    IncomeTax: 0,
    AbsentLeaveLate: 0,
    OthersDeductions: 0,
  });

  const handleChangeEarnings = (e) => {
    setEarnings({ ...Earnings, [e.target.name]: e.target.value });
  };
  const handleChangeDeductions = (e) => {
    setDeductions({ ...Deductions, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await createSalary(
        input.PayrollPeriod,
        input.PaymentDate,
        input.Employee,
        Earnings,
        Deductions
      );
      await getSpecificEmployeeSalaries(input.Employee).then((res) => {
        setSelectedEmployee(res);
      });
      setSuccess(true);

      setTimeout(() => {
        setAddingStatus(false);
      }, 1000);
    } catch (error) {
      console.log(error.response.data.message);
      error.response.data.message === "this month already had data" &&
        alert("เดือนนี้มีข้อมูลแล้ว โปรดเลือกเดือนใหม่");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
      }, 1000);
    }
  };

  return (
    <div>
      {input.Employee && (
        <>
          <div
            className={`flex  shadow-md justify-center ${
              addingStatus
                ? "bg-red-400 hover:bg-red-500"
                : "bg-blue-400 hover:bg-blue-500"
            } text-white rounded-sm rounded-l-none  transition ease-in-out `}
          >
            <button
              className="flex gap-1 p-2 justify-center  items-center  w-full hover:animate-pulse"
              onClick={() => {
                input.Employee && setAddingStatus(!addingStatus);
              }}
            >
              {addingStatus ? (
                <>
                  close <XCircleIcon className="w-4" />
                </>
              ) : (
                <>
                  Add Payroll <PlusCircleIcon className="w-4" />
                </>
              )}
            </button>
          </div>
          <div
            className={`flex flex-wrap justify-evenly transition-all ease-out duration-300   ${
              addingStatus ? "h-fit  p-2 " : "h-0 opacity-0 invisible "
            } `}
          >
            <div className="basis-full p-2 text-center">
              <div className="flex justify-center text-center text-md">
                <div className="text-right p-2">
                  <div className=" ">รอบเงินเดือน : </div>
                  <div className=" ">วันที่จ่าย : </div>
                </div>
                <div className="text-left p-2">
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-30 h-5"
                      type="month"
                      name="PayrollPeriod"
                      value={input.PayrollPeriod}
                      onChange={(e) => {
                        handleChangeInput(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-30 h-5"
                      type="date"
                      name="PaymentDate"
                      value={input.PaymentDate}
                      onChange={(e) => {
                        handleChangeInput(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/2 max-md:basis-full p-2 text-center">
              เงินได้
              <div className="flex justify-center text-center text-sm">
                <div className="w-1/2 text-right p-2">
                  <div className=" ">เงินเดือน : </div>
                  <div className=" ">โอที : </div>
                  <div className=" ">คอมมิชชั่น : </div>
                  <div className=" ">ค่าเบี้ยเลี้ยง/ค่าครองชีพ :</div>
                  <div className=" ">โบนัส : </div>
                  <div className=" ">เงินได้อื่นๆ : </div>
                </div>
                <div className="w-1/2 text-left p-2">
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="Salary"
                      value={Earnings.Salary}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="OverTime"
                      value={Earnings.OverTime}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="Commision"
                      value={Earnings.Commision}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="AllowanceCostOfLivings"
                      value={Earnings.AllowanceCostOfLivings}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="Bonus"
                      value={Earnings.Bonus}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Earnings"
                      type="number"
                      name="OthersEarnings"
                      value={Earnings.OthersEarnings}
                      onChange={(e) => {
                        handleChangeEarnings(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/2 max-md:basis-full p-2 text-center">
              รายการหัก
              <div className="flex justify-center  text-center text-sm">
                <div className="w-1/2 text-right p-2">
                  <div className=" ">ประกันสังคม : </div>
                  <div className=" ">ภาษีเงินได้ : </div>
                  <div className=" ">ขาด/ลา/มาสาย : </div>
                  <div className=" ">รายการหักอื่นๆ : </div>
                </div>
                <div className="w-1/2 text-left p-2">
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Deductions"
                      type="number"
                      name="SocialSecurityFund"
                      value={Deductions.SocialSecurityFund}
                      onChange={(e) => {
                        handleChangeDeductions(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Deductions"
                      type="number"
                      name="IncomeTax"
                      value={Deductions.IncomeTax}
                      onChange={(e) => {
                        handleChangeDeductions(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Deductions"
                      type="number"
                      name="AbsentLeaveLate"
                      value={Deductions.AbsentLeaveLate}
                      onChange={(e) => {
                        handleChangeDeductions(e);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="border rounded-sm  border-slate-100 hover:border-blue-400 w-24 h-5"
                      parent="Deductions"
                      type="number"
                      name="OthersDeductions"
                      value={Deductions.OthersDeductions}
                      onChange={(e) => {
                        handleChangeDeductions(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end max-md:justify-center max-md:pr-0 pr-12 pt-2">
                <button
                  onClick={() => handleSave()}
                  className={`flex justify-center items-center w-16 max-md:w-20 h-8 shadow-md  bg-blue-400 hover:bg-blue-500 text-white rounded-md  transition ease-in-out
                  ${success && "bg-green-400 hover:bg-green-400"}
                  `}
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
          </div>
        </>
      )}
    </div>
  );
}

export default AdminAddPayroll;
