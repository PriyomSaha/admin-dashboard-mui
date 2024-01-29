import React, { useState } from "react";
import OtpInput from "./OtpInput";
import NewPasswordInput from "./NewPasswordInput";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";

function ChangePassword() {
  const [isOtpValidated, setisOtpValidated] = useState(false);

  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState(""); // 'success' or 'error'

  return (
    <>
      {isOtpValidated ? (
        <NewPasswordInput
          setShowSnackbar={setShowSnackbar}
          setSnackbarType={setSnackbarType}
          setSnackbarMessage={setSnackbarMessage}
        />
      ) : (
        <OtpInput
          setisOtpValidated={setisOtpValidated}
          setShowSnackbar={setShowSnackbar}
          setSnackbarType={setSnackbarType}
          setSnackbarMessage={setSnackbarMessage}
        />
      )}

      {/* Display error or success message in a Snackbar */}
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default ChangePassword;
