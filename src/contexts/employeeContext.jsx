import axios from "axios";
import { createContext } from "react";

export const EmployeeContext = createContext();

function EmployeeContextProvider({ children }) {
  const getEmployee = async () => {
    const res = await axios.get("http://localhost:3001/employee/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.data.employees;
  };

  const getSpecificEmployeeSalaries = async (eid, year) => {
    const res = await axios.get(
      `http://localhost:3001/salary/${eid}?year=${year || ""}`,
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
      `http://localhost:3001/salary/`,
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContextProvider;
