import React from "react";
import BannerTable from "./BannerTable";
import AddEditBanner from "./AddEditBanner";

function Banners() {
  return (
    <>
      <BannerTable />
      {/* Add/Edit Banner Modal */}
      <AddEditBanner />
    </>
  );
}

export default Banners;
