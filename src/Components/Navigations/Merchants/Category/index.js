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

  // State variables to manage Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false); // Whether to show Snackbar or not
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message displayed in Snackbar
  const [snackbarType, setSnackbarType] = useState("info"); // Type of Snackbar: 'success' or 'error'

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
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        snackbarType={snackbarType}
        setSnackbarType={setSnackbarType}
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
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        snackbarType={snackbarType}
        setSnackbarType={setSnackbarType}
      />
      {/* Render the ToastAlert component to display notifications */}
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default Category;
