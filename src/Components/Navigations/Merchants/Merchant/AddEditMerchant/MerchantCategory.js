import * as React from "react";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";

// List of available categories
const categories = [
  "Food",
  "Groceries & Dairy",
  "Breakfast & Tiffins",
  "Sea Food & Meat",
  "Snacks & Fastfood",
  "Pet Food & Accessories",
  "Bakery",
  "Flowers & Bouquets",
  "Stationery",
  "Pharmacy",
  "Clothing & Accessories",
  "Beverages",
  "Healthy Organics",
  "Novelties & Art",
  "Electronics",
  "Mother & Child Care",
];

export default function MerchantCategory() {
  const [merchantCategory, setMerchantCategory] = React.useState([]);
  return (
    <div>
      <CompactChipInputSelect
        totalList={categories}
        selectedItems={merchantCategory}
        setSelectedItems={setMerchantCategory}
        inputLabelText="Merchant Category*"
      />
    </div>
  );
}
