import { ComponentBody } from "Components/UI/GlobalStyles";
import React from "react";
import Search from "../Search";
import CardsHolder from "./CardsHolder";
import CommissionReportHeadingExportButton from "./CommissionReportHeadingExportButton";
import ReviewTable from "./ReviewsTable";

function Reports() {
  return (
    <>
      <ComponentBody>
        <Search />
        <CardsHolder />
        <CommissionReportHeadingExportButton />
        <ReviewTable />
      </ComponentBody>
    </>
  );
}

export default Reports;
