import axios from "axios";
import { createContext } from "react";

export const EmployeeContext = createContext();

function EmployeeContextProvider({ children }) {
  const getEmployee = async () => {
    const res = await axios.get("https://payslipnode.onrender.com/employee/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.data.employees;
  };

  const deleteEmployee = async (eid) => {
    const res = await axios.delete(
      `https://payslipnode.onrender.com/employee/${eid}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return res.data.employees;
  };

  const deleteSalary = async (eid) => {
    const res = await axios.delete(
      `https://payslipnode.onrender.com/salary/${eid}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return res.data.employees;
  };

  const getSpecificEmployeeSalaries = async (eid, year) => {
    const res = await axios.get(
      `https://payslipnode.onrender.com/salary/${eid}?year=${year || ""}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return res.data.Salaries;
  };

  const createSalary = async (
    PayrollPeriod,
    PaymentDate,
    Employee,
    Earnings,
    Deductions
  ) => {
    const res = await axios.post(
      `https://payslipnode.onrender.com/salary/`,
      { PayrollPeriod, PaymentDate, Employee, Earnings, Deductions },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return res.data.newSalary;
  };

  return (
    <EmployeeContext.Provider
      value={{
        getEmployee,
        createSalary,
        getSpecificEmployeeSalaries,
        deleteEmployee,
        deleteSalary,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContextProvider;
