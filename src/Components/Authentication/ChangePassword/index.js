import React, { useState } from "react";
import OtpInput from "./OtpInput";
import NewPasswordInput from "./NewPasswordInput";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

function ChangePassword() {
  const [isOtpValidated, setisOtpValidated] = useState(false);

  return (
    <>
      {isOtpValidated ? (
        <NewPasswordInput />
      ) : (
        <OtpInput setisOtpValidated={setisOtpValidated} />
      )}
    </>
  );
}

export default ChangePassword;
