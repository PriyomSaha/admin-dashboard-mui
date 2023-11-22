import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import SMS from "./SMS";
import "Components/UI/app.css";
import Email from "./Email/Email";
import { modifyEvent } from "Components/Assets/ReusableComp/Editor/utils/modifyEmptyContent";

function EventSettings({
  eventName,
  eventDescription,
  setEventDescription,
  isModalOpen,
  setIsModalOpen,
}) {
  const [selected, setSelected] = useState("SMS");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [tags, setTags] = useState([]);
  const [emailDescription, setEmailDescription] = useState();
  const [smsDescription, setSmsDescription] = useState();

  useEffect(() => {
    setSmsDescription(eventDescription);
    setSelected("SMS");
    setEmailDescription(modifyEvent(eventDescription));
  }, [eventDescription]);

  return (
    <Modal open={isModalOpen} sx={FullScreenModalContainer}>
      <Box>
        <Box sx={FullScreenModalHeader}>
          <Typography variant="h6">{eventName}</Typography>

          <IconButton
            aria-label="close"
            onClick={() => setIsModalOpen(!isModalOpen)}
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
          <Box mb={2}>
            <Button
              onClick={() => setSelected("SMS")}
              variant={selected === "SMS" ? "contained-dark" : "outlined-dark"}
            >
              SMS
            </Button>
            <Button
              onClick={() => setSelected("EMAIL")}
              variant={
                selected === "EMAIL" ? "contained-dark" : "outlined-dark"
              }
            >
              EMAIL
            </Button>
          </Box>
          {selected === "SMS" ? (
            <SMS
              smsDescription={smsDescription}
              setSmsDescription={setSmsDescription}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              country={country}
              setCountry={setCountry}
              tags={tags}
              setTags={setTags}
            />
          ) : (
            <Email
              emailDescription={emailDescription}
              setEmailDescription={setEmailDescription}
            />
          )}
          <Box mt={4}>
            <SaveCancelButtons
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventSettings;
