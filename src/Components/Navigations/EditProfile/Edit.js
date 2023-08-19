import React from "react";
import { useEditProfileStore } from "Components/Assets/StateManagement";
import { Modal } from "@mui/material";
import { FullScreenModalContainer } from "Components/Assets/GlobalStyles";

function Edit() {
  const setIsEditProfile = useEditProfileStore(
    (state) => state.setIsEditProfile
  );
  const isEditProfile = useEditProfileStore((state) => state.isEditProfile);
  return (
    <>
      <Modal open={isEditProfile} sx={FullScreenModalContainer}>
        Kire
      </Modal>
    </>
  );
}

export default Edit;
