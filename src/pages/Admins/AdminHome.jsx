import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../contexts/employeeContext";
import downloadPDF from "../../Utils/downloadPDF";
import moment from "moment";
import {
  ArrowDownTrayIcon,
  TrashIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import AdminAddPayroll from "../../components/AdminAddPayroll";
import AdminAddEmployee from "../../components/AdminAddEmployee";
import AdminDeleteEmployee from "../../components/AdminDeleteEmployee";

function AdminHome() {
  const {
    getEmployee,
    getSpecificEmployeeSalaries,
    deleteEmployee,
    deleteSalary,
  } = useContext(EmployeeContext);
  const [employees, setEmployees] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const [input, setInput] = useState({
    PayrollPeriod: moment().format("yyyy-MM"),
    PaymentDate: moment().format("yyyy-MM-DD"),
    Employee: "",
  });
  const fetch = async () => {
    await getEmployee()
      .then((res) => {
        setEmployees(res.map((item) => ({ ...item, status: false })));
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
  }, [getEmployee]);
  useEffect(() => {}, [selectedEmployee]);

  const handleClick = (index) => {
    setSelectedEmployee(
      selectedEmployee.map((item) => {
        if (selectedEmployee.indexOf(item) === index) {
          Object.assign(item, {
            status: !item.status,
          });
          return item;
        } else return item;
      })
    );
  };
  const handleClickEmployee = async (item, index, e) => {
    const newYear = [];
    await getSpecificEmployeeSalaries(item._id).then((res) => {
      setSelectedEmployee(
        res.map((item) => {
          !newYear.includes(moment(item.PayrollPeriod).format("YYYY")) &&
            newYear.push(moment(item.PayrollPeriod).format("YYYY"));
          return { ...item, status: false };
        })
      );

      setYears([...newYear]);
      setSelectedYear("");
      handleChangeInput(e);
      setEmployees(
        employees.map((item) => {
          if (employees.indexOf(item) === index) {
            Object.assign(item, {
              status: !item.status,
            });
            return item;
          } else
            Object.assign(item, {
              status: false,
            });
          return item;
        })
      );
    });
  };

  // const handleClickYear = (year) => {
  //   setSelectedEmployee(
  //     selectedEmployee.map((item) => {
  //       if (moment(item.PayrollPeriod).format("YYYY") === year) {
  //         return { ...item, status: false };
  //       }
  //     })
  //   );
  // };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  //md:flex-row max-md:items-center md:justify-center  md:w-4/5
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl m-auto  mt-10  h-fit ">
      <div className="w-full md:w-1/5 md:min-w-[170px]  h-fit  shadow-md bg-white">
        {loading ? (
          <div></div>
        ) : (
          <>
            <AdminAddEmployee fetch={fetch} />
            <AdminDeleteEmployee
              fetch={fetch}
              deleteStatus={deleteStatus}
              setDeleteStatus={setDeleteStatus}
            />
            {employees
              .map((item, index) => {
                return (
                  <div
                    className={` px-3  shadow-sm min-h-[40px] w-full   relative ${
                      input.Employee === item._id
                        ? "bg-blue-400 text-white  hover:bg-blue-400"
                        : "hover:bg-slate-200"
                    }`}
                    key={index}
                  >
                    <button
                      className="w-full text-left align-middle pt-2"
                      name="Employee"
                      value={item._id}
                      onClick={(e) => handleClickEmployee(item, index, e)}
                    >
                      {item.nameENG}
                    </button>

                    <button
                      className={` absolute right-0 top-0 flex justify-center items-center w-14 h-full   bg-red-400 hover:bg-red-500  text-white shadow-sm text-sm 
                          transition-all delay-100 ease-in-out
                          ${
                            deleteStatus
                              ? " opacity-100  "
                              : "opacity-0 w-0  invisible "
                          }
                          `}
                      onClick={() => {
                        if (
                          window.confirm(
                            `???????????????????????????????????????????????????????????????????????????????????? ${
                              item.nameENG ? item.nameENG : item.nameTH
                            } ????????????????????? ?`
                          )
                        ) {
                          deleteEmployee(item._id);
                          setEmployees(
                            employees.filter(
                              (filteritem) =>
                                filteritem._id !== item._id && filteritem
                            )
                          );
                        }
                      }}
                    >
                      {deleteStatus ? "delete" : ""}
                    </button>

                    <div
                      className={`flex flex-wrap justify-start transition-all ease-out duration-300 text-sm   ${
                        employees[index].status && years.length > 1
                          ? "h-fit  p-2 gap-1 "
                          : "h-0 opacity-0 invisible "
                      } `}
                    >
                      {years.length > 1 &&
                        years
                          .sort()
                          .reverse()
                          .map((item, index) => (
                            <div key={index}>
                              <button
                                value={item}
                                className={`border border-slate-200 px-2 rounded-lg hover:bg-blue-500 ${
                                  selectedYear === item &&
                                  "bg-blue-500 border-none"
                                }`}
                                onClick={() => setSelectedYear(item)}
                              >
                                {item}
                              </button>
                            </div>
                          ))}
                    </div>
                  </div>
                );
              })
              .reverse()}
          </>
        )}
      </div>
      <div className="w-full md:w-4/5 h-fit md:min-w-[730px] bg-white  shadow-md border-l-2 border-blue-400">
        <AdminAddPayroll
          input={input}
          handleChangeInput={handleChangeInput}
          setSelectedEmployee={setSelectedEmployee}
        />
        {selectedEmployee
          ? selectedEmployee
              .filter((item) =>
                selectedYear
                  ? moment(item.PayrollPeriod).format("YYYY") === selectedYear
                  : item
              )
              .sort((a, b) => moment(a.PayrollPeriod) - moment(b.PayrollPeriod))
              .map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex p-2 gap-2 shadow-md justify-around max-md:text-sm">
                      <div className={`flex  `}>
                        <button onClick={() => handleClick(index)}>
                          <ChevronRightIcon
                            className={`w-7 ${
                              selectedEmployee[index].status &&
                              "rotate-90 text-blue-500 "
                            } transition ease-out  duration-200 hover:scale-150`}
                          />
                        </button>
                      </div>
                      <div className="flex flex-col ">
                        <div>????????????????????????????????????</div>
                        <div>
                          {moment(item.PayrollPeriod).format("MM / YYYY")}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div>??????????????????????????????</div>
                        <div>
                          {moment(item.PaymentDate).format("DD / MM / YYYY")}
                        </div>
                      </div>

                      <div className="flex md:gap-10 gap-5">
                        <button
                          onClick={() => {
                            downloadPDF(selectedEmployee, index);
                          }}
                        >
                          <ArrowDownTrayIcon className="w-7 text-green-400 transition-all ease-in-out hover:scale-150" />
                        </button>

                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `??????????????????????????????????????????????????? ${moment(
                                  item.PayrollPeriod
                                ).format("MM/YYYY")} ?`
                              )
                            ) {
                              deleteSalary(item._id);
                              setSelectedEmployee(
                                selectedEmployee.filter(
                                  (filteritem) =>
                                    filteritem._id !== item._id && filteritem
                                )
                              );
                            }
                          }}
                        >
                          <TrashIcon className="w-7 text-red-400 transition-all ease-in-out hover:scale-150" />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`flex max-md:flex-col max-md:items-center justify-center transition-all ease-out duration-300   ${
                        selectedEmployee[index].status
                          ? "h-fit  p-2 "
                          : "h-0 opacity-0 invisible "
                      } `}
                    >
                      <div className=" w-full text-center">
                        <div className="bg-slate-100">?????????????????????</div>
                        <div className="flex text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">??????????????????????????? : </div>
                            <div className=" ">???????????? : </div>
                            <div className=" ">?????????????????????????????? : </div>
                            <div className=" ">??????????????????????????????????????????/????????????????????? :</div>
                            <div className=" ">??????????????? : </div>
                            <div className=" ">???????????????????????????????????? : </div>
                          </div>
                          <div className="w-1/2 text-left pl-1">
                            <div>{item.Earnings.Salary.toLocaleString()}</div>
                            <div>{item.Earnings.OverTime.toLocaleString()}</div>
                            <div>
                              {item.Earnings.Commision.toLocaleString()}
                            </div>
                            <div>
                              {item.Earnings.AllowanceCostOfLivings.toLocaleString()}
                            </div>
                            <div>{item.Earnings.Bonus.toLocaleString()}</div>
                            <div>
                              {item.Earnings.OthersEarnings.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full  text-center">
                        <div className="bg-slate-100">???????????????????????????</div>
                        <div className="flex text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">????????????????????????????????? : </div>
                            <div className=" ">????????????????????????????????? : </div>
                            <div className=" ">?????????/??????/??????????????? : </div>
                            <div className=" ">?????????????????????????????????????????? : </div>
                          </div>
                          <div className="w-1/2 text-left pl-1">
                            <div>
                              {item.Deductions.SocialSecurityFund.toLocaleString()}
                            </div>
                            <div>
                              {item.Deductions.IncomeTax.toLocaleString()}
                            </div>
                            <div>
                              {item.Deductions.AbsentLeaveLate.toLocaleString()}
                            </div>
                            <div>
                              {item.Deductions.OthersDeductions.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full text-center">
                        <div className="bg-slate-100">?????????????????????????????????</div>
                        <div className="flex text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">????????????????????????????????? : </div>
                            <div className=" ">????????????????????????????????????????????? : </div>
                            <div className=" ">????????????????????????????????????????????????????????? :</div>
                            <div className=" ">?????????????????????????????? : </div>
                            <div className=" ">???????????????????????????????????? : </div>
                            <div className=" ">???????????????????????????????????? : </div>
                          </div>
                          <div className="w-1/2 text-left pl-1">
                            <div>
                              {item.Totals.YTDearnings.toLocaleString()}
                            </div>
                            <div>
                              {item.Totals.YTDIncomeTaxs.toLocaleString()}
                            </div>
                            <div>
                              {item.Totals.AccumulatedSSF.toLocaleString()}
                            </div>
                            <div>
                              {item.Totals.TotalEarnings.toLocaleString()}
                            </div>
                            <div>
                              {item.Totals.TotalDeductions.toLocaleString()}
                            </div>
                            <div>{item.Totals.NetIncome.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })

              .reverse()
          : ""}
      </div>
    </div>
  );
}

export default AdminHome;
