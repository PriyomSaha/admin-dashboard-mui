import React, { useState } from "react";
import ProductTable from "./ProductTable";
import AddEditProduct from "./AddEditProduct";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

function Product() {
  const [productId, setProductid] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productAvailability, setProductAvailability] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [selectedCategories, setSelectedCategory] = useState([]);

  // State variables to manage Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false); // Whether to show Snackbar or not
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message displayed in Snackbar
  const [snackbarType, setSnackbarType] = useState("info"); // Type of Snackbar: 'success' or 'error'

  return (
    <>
      <ProductTable
        productId={productId}
        setProductid={setProductid}
        productName={productName}
        setProductName={setProductName}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productAvailability={productAvailability}
        setProductAvailability={setProductAvailability}
        productImage={productImage}
        setProductImage={setProductImage}
        selectedCategories={selectedCategories}
        setSelectedCategory={setSelectedCategory}
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        snackbarType={snackbarType}
        setSnackbarType={setSnackbarType}
      />
      <AddEditProduct
        productId={productId}
        productName={productName}
        setProductName={setProductName}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productAvailability={productAvailability}
        setProductAvailability={setProductAvailability}
        productImage={productImage}
        setProductImage={setProductImage}
        selectedCategories={selectedCategories}
        setSelectedCategory={setSelectedCategory}
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

export default Product;
