import React, { useState } from "react";
import CategoryTable from "./CategoryTable"; // Importing CategoryTable component
import AddEditCategory from "./AddEditCategory"; // Importing AddEditCategory component
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert"; // Importing ToastAlert component for displaying notifications

function Category() {
  // State variables to manage category data
  const [categoryId, setCategoryId] = useState(""); // Category ID
  const [categoryName, setCategoryName] = useState(""); // Category name
  const [categoryDescription, setCategoryDescription] = useState(""); // Category description
  const [categoryStatus, setCategoryStatus] = useState("0"); // Category status (active/inactive)
  const [categoryImage, setCategoryImage] = useState(null); // Category image
  const [categoryGroup, setCategoryGroup] = useState("V"); //Category Type Non-Veg (N) or Veg (V)

  return (
    <>
      {/* Render the CategoryTable component */}
      <CategoryTable
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryDescription={categoryDescription}
        setCategoryDescription={setCategoryDescription}
        categoryStatus={categoryStatus}
        setCategoryStatus={setCategoryStatus}
        categoryImage={categoryImage}
        setCategoryImage={setCategoryImage}
        categoryGroup={categoryGroup}
        setCategoryGroup={setCategoryGroup}
      />
      {/* Render the AddEditCategory component */}
      <AddEditCategory
        categoryId={categoryId}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryDescription={categoryDescription}
        setCategoryDescription={setCategoryDescription}
        categoryStatus={categoryStatus}
        setCategoryStatus={setCategoryStatus}
        categoryImage={categoryImage}
        setCategoryImage={setCategoryImage}
        categoryGroup={categoryGroup}
        setCategoryGroup={setCategoryGroup}
      />
    </>
  );
}

export default Category;
