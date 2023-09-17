import * as React from "react";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";

const types = ["Delivery", "Pickup", "Custom"];

export default function OrderType() {
  const [orderType, setOrderType] = React.useState([]);

  return (
    <CompactChipInputSelect
      totalList={types}
      selectedItems={orderType}
      setSelectedItems={setOrderType}
      inputLabelText="Select Order Type*"
    />
  );
}
