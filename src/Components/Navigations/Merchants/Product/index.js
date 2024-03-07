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
      />
    </>
  );
}

export default Product;
