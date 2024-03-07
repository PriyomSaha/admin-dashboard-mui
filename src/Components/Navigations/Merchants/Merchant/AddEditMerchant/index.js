import React, { useEffect, useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { MdClose } from "react-icons/md";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import MerchantDetails from "./MerchantDetails";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import CommissionConfiguration from "./CommissionConfiguration";
import SearchEngineOptimization from "./SearchEngineOptimization";
import {
  useMerchantStore,
  useSnackbarStore,
} from "Components/Assets/StateManagement";
import axios from "axios";
import { getCookie, updateDataInTable } from "Components/Assets/UIServices";

const AddEditMerchant = ({
  id,
  setId,
  email,
  setEmail,
  name,
  setName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  postalCode,
  setPostalCode,
  status,
  setStatus,
  orderType,
  setOrderType,
  deliveryBy,
  setDeliveryBy,
  merchantCategory,
  setMerchantCategory,
  businessType,
  setBusinessType,
  commisionType,
  setCommisionType,
  commisionValue,
  setCommisionValue,
  commisionCondition,
  setCommisionCondition,
}) => {
  // Access state and functions from the merchant store using custom hooks
  const isMerchantModalOpen = useMerchantStore(
    (state) => state.isMerchantModalOpen
  );
  const setIsMerchantModalOpen = useMerchantStore(
    (state) => state.setIsMerchantModalOpen
  );
  const merchantType = useMerchantStore((state) => state.merchantType);

  const setAllMerchants = useMerchantStore((state) => state.setAllMerchants);
  const merchants = useMerchantStore((state) => state.allMerchants);

  const setIsMerchantsLoading = useMerchantStore(
    (state) => state.setIsMerchantsLoading
  );

  // Accessing alert snackbar data from global state
  const setShowSnackbar = useSnackbarStore((state) => state.setShowSnackbar);
  const setSnackbarMessage = useSnackbarStore(
    (state) => state.setSnackbarMessage
  );
  const setSnackbarType = useSnackbarStore((state) => state.setSnackbarType);

  // URL for merchant API
  const merchantsUrl =
    process.env.REACT_APP_BASE_URL_TEST_BACKEND +
    process.env.REACT_APP_MERCHANTS;

  // API key for authentication
  const API_KEY = process.env.REACT_APP_API_KEY;

  const runOnSave = async () => {
    // await setIsCategoriesLoading();

    // Request header for authentication
    const requestHeader = {
      "X-API-Key": API_KEY,
    };
    // Request body with merchant data
    const requestBody = {
      adminId: getCookie("uid"),
      name,
      email,
      phone: phoneNumber,
      categories: merchantCategory,
      businessType,
      location: [
        {
          address: {
            address1: address,
            city,
            state,
            country,
            postalCode,
          },
        },
      ],
      deliveryBy,
      orderType,
      status,
      commissionType: {
        type: commisionType,
        value: parseInt(commisionValue),
        condition: commisionCondition,
      },
    };
    if (merchantType.toUpperCase() === "ADD") {
      try {
        // Make a POST request to add a new Merchant
        const resp = await axios.post(merchantsUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsMerchantModalOpen();
          setEmail("");
          setName("");
          setPhoneNumber("");
          setCountry("IN");
          setAddress("");
          setState("");
          setCity("");
          setPostalCode(0);
          setStatus("inactive");
          setOrderType([]);
          setDeliveryBy("merchant");
          setMerchantCategory([]);
          setBusinessType("");
          setCommisionType("percentage");
          setCommisionValue(0);
          setCommisionCondition("Collected");

          // // Update list of merchants
          // getCategories();
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in adding Merchant...");
      }
    } else {
      try {
        requestBody.id = id;
        // Make a POST request to add a new Merchant
        const resp = await axios.put(merchantsUrl, requestBody, {
          headers: requestHeader,
        });
        if (!resp.error) {
          // Show success message
          setShowSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage(resp.data.message);
          // Close modal and reset form fields
          setIsMerchantModalOpen();
          setEmail("");
          setName("");
          setPhoneNumber("");
          setCountry("IN");
          setAddress("");
          setState("");
          setCity("");
          setPostalCode(0);
          setStatus("inactive");
          setOrderType([]);
          setDeliveryBy("merchant");
          setMerchantCategory([]);
          setBusinessType("");
          setCommisionType("percentage");
          setCommisionValue(0);
          setCommisionCondition("Collected");

          updateDataInTable(merchants, requestBody, id);
        }
      } catch (error) {
        // Show error message if request fails
        setShowSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Error in adding Merchant...");
      }
    }
  };

  // Function to fetch products from the server
  const getMerchants = async () => {
    await setIsMerchantsLoading();
    try {
      const requestHeader = {
        "X-API-Key": API_KEY,
      };
      // Make a GET request to fetch products
      const resp = await axios.get(`${merchantsUrl}/${getCookie("uid")}`, {
        headers: requestHeader,
      });
      // Reverse the order of products and update the state
      setAllMerchants(resp.data.data.reverse());
      console.log(resp.data.data.reverse());
    } catch (error) {
      console.log(error); // Log any errors
    } finally {
      await setIsMerchantsLoading(); // Update loading state
    }
  };

  useEffect(() => {
    getMerchants();
  }, []);

  return (
    <>
      <Modal open={isMerchantModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">{merchantType} Merchant</Typography>

            <IconButton
              aria-label="close"
              onClick={() => setIsMerchantModalOpen()}
              sx={{
                position: "absolute",
                right: 10,
                top: 5,
                color: (theme) => theme.palette.grey[500],
                display: "flex",
                alignSelf: "center",
              }}
            >
              <MdClose />
            </IconButton>
          </Box>
          <Box sx={FullScreenModalContent}>
            <Box>
              <MerchantDetails
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                country={country}
                setCountry={setCountry}
                state={state}
                setState={setState}
                city={city}
                setCity={setCity}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                status={status}
                setStatus={setStatus}
                orderType={orderType}
                setOrderType={setOrderType}
                deliveryBy={deliveryBy}
                setDeliveryBy={setDeliveryBy}
                merchantCategory={merchantCategory}
                setMerchantCategory={setMerchantCategory}
                businessType={businessType}
                setBusinessType={setBusinessType}
              />
            </Box>
            <Box>
              <CommissionConfiguration
                commisionType={commisionType}
                setCommisionType={setCommisionType}
                commisionValue={commisionValue}
                setCommisionValue={setCommisionValue}
                commisionCondition={commisionCondition}
                setCommisionCondition={setCommisionCondition}
              />
            </Box>
            <Box>{/* <SearchEngineOptimization /> */}</Box>
            <Box mt={4}>
              <SaveCancelButtons
                isModalOpen={isMerchantModalOpen}
                setIsModalOpen={setIsMerchantModalOpen}
                runOnSave={runOnSave}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditMerchant;
