import React, { useState } from "react";
import MerchantTable from "Components/Navigations/Merchants/Merchant/MerchantTable";
import AddEditMerchant from "./AddEditMerchant";

function Merchant() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [status, setStatus] = useState("inactive");
  const [orderType, setOrderType] = useState([]);
  const [deliveryBy, setDeliveryBy] = useState("merchant");
  const [merchantCategory, setMerchantCategory] = useState([]);
  const [businessType, setBusinessType] = useState("");
  const [commisionType, setCommisionType] = useState("percentage");
  const [commisionValue, setCommisionValue] = useState(0);
  const [commisionCondition, setCommisionCondition] = useState("Collected");

  return (
    <>
      <MerchantTable
        id={id}
        setId={setId}
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
        commisionType={commisionType}
        setCommisionType={setCommisionType}
        commisionValue={commisionValue}
        setCommisionValue={setCommisionValue}
        commisionCondition={commisionCondition}
        setCommisionCondition={setCommisionCondition}
      />
      <AddEditMerchant
        id={id}
        setId={setId}
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
        commisionType={commisionType}
        setCommisionType={setCommisionType}
        commisionValue={commisionValue}
        setCommisionValue={setCommisionValue}
        commisionCondition={commisionCondition}
        setCommisionCondition={setCommisionCondition}
      />
    </>
  );
}

export default Merchant;
