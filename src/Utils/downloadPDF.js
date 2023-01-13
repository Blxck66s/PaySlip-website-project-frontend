import React from "react";
import moment from "moment";
import { jsPDF } from "jspdf";
import { font } from "./THSarabunNew-normal";
import paySlip from "./paySlip.jpg";

const downloadPDF = (selectedEmployee, index) => {
  let info = {};
  const doc = new jsPDF({
    orientation: "landscape",
  });
  doc.addFileToVFS("MyFont.ttf", font);
  doc.addFont("MyFont.ttf", "MyFont", "normal");
  doc.setFont("MyFont");
  doc.addImage(paySlip, "JPEG", 0, 0, 297, 210);

  selectedEmployee.map((item) => {
    if (selectedEmployee.indexOf(item) === index) {
      return (info = item);
    }
  });
  //Header
  doc.setFontSize(20);
  doc.text(moment(info.PayrollPeriod).format("YYYY"), 243, 92);
  doc.text(moment(info.PayrollPeriod).format("MM/YYYY"), 140, 33.5);
  doc.text(moment(info.PaymentDate).format("DD/MM/YYYY"), 140, 47);
  doc.text(
    moment(info.Employee.employmentDate).format("DD/MM/YYYY"),
    140,
    60.5
  );
  doc.text(info.Employee.bankAccount, 140, 74.5);
  doc.text(info.Employee.employeeCode, 227, 33.5);
  doc.text(
    info.Employee.nameTH ? info.Employee.nameTH.trim() : info.Employee.nameENG,
    227,
    48
  );
  doc.text(info.Employee.department, 227, 74.5);
  doc.text(info.Employee.position, 227, 60.5);
  //Earnings
  doc.text(String(info.Earnings.Salary.toLocaleString()), 70, 108);
  doc.text(String(info.Earnings.OverTime.toLocaleString()), 70, 121);
  doc.text(String(info.Earnings.Commision.toLocaleString()), 70, 133);
  doc.text(
    String(info.Earnings.AllowanceCostOfLivings.toLocaleString()),
    70,
    146
  );
  doc.text(String(info.Earnings.Bonus.toLocaleString()), 70, 158.5);
  doc.text(String(info.Earnings.OthersEarnings.toLocaleString()), 70, 171);
  //Deductions
  doc.text(
    String(info.Deductions.SocialSecurityFund.toLocaleString()),
    160,
    108
  );
  doc.text(String(info.Deductions.IncomeTax.toLocaleString()), 160, 121);
  doc.text(String(info.Deductions.AbsentLeaveLate.toLocaleString()), 160, 133);
  doc.text(String(info.Deductions.OthersDeductions.toLocaleString()), 160, 146);
  //Totals
  doc.text(String(info.Totals.YTDearnings.toLocaleString()), 246, 108);
  doc.text(String(info.Totals.YTDIncomeTaxs.toLocaleString()), 246, 121);
  doc.text(String(info.Totals.AccumulatedSSF.toLocaleString()), 246, 133);
  doc.text(String(info.Totals.TotalEarnings.toLocaleString()), 246, 146);
  doc.text(String(info.Totals.TotalDeductions.toLocaleString()), 246, 158.5);
  doc.text(String(info.Totals.NetIncome.toLocaleString()), 246, 171);
  doc.save(
    `${
      String(moment(info.PayrollPeriod).format("MM-YYYY")) +
      "_" +
      info.Employee.nameENG
    }.pdf`
  );
};

export default downloadPDF;
