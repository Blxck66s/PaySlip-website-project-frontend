import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../contexts/employeeContext";
import downloadPDF from "../../Utils/downloadPDF";
import moment from "moment";
import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../contexts/AuthContext";

function UserHome() {
  const { getSpecificEmployeeSalaries } = useContext(EmployeeContext);
  const { user } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    const fetch = async () => {
      const newYear = [];
      await getSpecificEmployeeSalaries(user._id)
        .then((res) => {
          setSelectedEmployee(
            res.map((item) => {
              !newYear.includes(moment(item.PayrollPeriod).format("YYYY")) &&
                newYear.push(moment(item.PayrollPeriod).format("YYYY"));
              return { ...item, status: false };
            })
          );
          setYears([...newYear]);
        })
        .then(() => setLoading(false));
    };
    fetch();
  }, [getSpecificEmployeeSalaries]);

  return (
    <div className="flex flex-col w-full items-center justify-center mt-10 ">
      <div className="flex  w-full md:w-4/5 max-w-[1000px] justify-start gap-2 p-2">
        {years.length > 1 &&
          years
            .sort()
            .reverse()
            .map((item, index) => (
              <div key={index}>
                <button
                  value={item}
                  className={`border bg-white border-slate-200 px-2 rounded-lg hover:bg-blue-500 ${
                    selectedYear === item && "bg-blue-500 border-none"
                  }`}
                  onClick={() => setSelectedYear(item)}
                >
                  {item}
                </button>
              </div>
            ))}
      </div>
      <div className="w-full rounded-md md:w-4/5 max-w-[1000px] h-fit bg-white  shadow-md border-l-2 border-blue-400">
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
                    <div className="flex p-2 gap-2 shadow-md justify-around">
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
                        <div>รอบเงินเดือน</div>
                        <div>
                          {moment(item.PayrollPeriod).format("MM / YYYY")}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div>วันที่จ่าย</div>
                        <div>
                          {moment(item.PaymentDate).format("DD / MM / YYYY")}
                        </div>
                      </div>

                      <div className="flex gap-10">
                        <button
                          onClick={() => {
                            downloadPDF(selectedEmployee, index);
                          }}
                        >
                          <ArrowDownTrayIcon className="w-7 text-green-400 transition-all ease-in-out hover:scale-150" />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`flex max-sm:flex-col justify-evenly transition-all ease-out duration-300   ${
                        selectedEmployee[index].status
                          ? "h-fit  p-2 "
                          : "h-0 opacity-0 invisible "
                      } `}
                    >
                      <div className=" text-center">
                        <div className="bg-slate-100">เงินได้</div>
                        <div className="flex  text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">เงินเดือน : </div>
                            <div className=" ">โอที : </div>
                            <div className=" ">คอมมิชชั่น : </div>
                            <div className=" ">ค่าเบี้ยเลี้ยง/ค่าครองชีพ :</div>
                            <div className=" ">โบนัส : </div>
                            <div className=" ">เงินได้อื่นๆ : </div>
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
                      <div className=" text-center">
                        <div className="bg-slate-100">รายการหัก</div>
                        <div className="flex min-w-[200px] text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">ประกันสังคม : </div>
                            <div className=" ">ภาษีเงินได้ : </div>
                            <div className=" ">ขาด/ลา/มาสาย : </div>
                            <div className=" ">รายการหักอื่นๆ : </div>
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
                      <div className=" text-center">
                        <div className="bg-slate-100">สะสมประจำปี</div>
                        <div className="flex text-center text-sm">
                          <div className="w-1/2 text-right">
                            <div className=" ">เงินได้สะสม : </div>
                            <div className=" ">ภาษีเงินได้สะสม : </div>
                            <div className=" ">เงินประกันสังคมสะสม :</div>
                            <div className=" ">รวมเงินได้ : </div>
                            <div className=" ">รวมรายการหัก : </div>
                            <div className=" ">เงินได้สุทธิ : </div>
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

export default UserHome;
