import { ComponentBody } from "Components/UI/GlobalStyles";
import React from "react";
import ReviewsTable from "./ReviewsTable";
import Search from "../Search";

function Review() {
  return (
    <>
      <ComponentBody>
        <Search />
        <ReviewsTable />
      </ComponentBody>
    </>
  );
}

export default Review;
