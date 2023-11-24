import React, { useState } from "react";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";
import Countries from "Components/Assets/ReusableComp/Countries";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import PhoneInput from "react-phone-input-2";
import { FullScreenModalContent } from "Components/UI/GlobalStyles";
import ToastAlert from "Components/Assets/ReusableComp/ToastAlert";
import ActionItemList from "./ActionItemList";

function SMS({
  smsDescription,
  setSmsDescription,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  tags,
  setTags,
}) {
  const tagStyle = {
    backgroundColor: theme.palette.grey[300],
    borderRadius: "5px",
    padding: theme.spacing(1),
    minHeight: "200px",
    width: FullScreenModalContent.maxWidth / 2,
  };

  const tagList = [
    "Delicious",
    "Hot",
    "Cold",
    "Chilled",
    "LowCalorie",
    "Yummy",
    "Nutritious",
    "Delightful",
    "Mouthwatering",
    "Scrumptious",
    "Savory",
    "Delectable",
    "Flavorful",
    "Tempting",
    "Succulent",
    "Luscious",
    "Divine",
    "Palatable",
    "Appetizing",
    "Gastronomic",
    "Exquisite",
    "Tantalizing",
    "TastyTreats",
    "Irresistible",
    "Satisfying",
    "Decadent",
    "GourmetFood",
    "SoulFood",
    "FoodFusion",
    "Sensational",
    "Epicurean",
    "FoodMagic",
    "Eatable",
    "Nourishing",
    "Wholesome",
    "FlavorExplosion",
    "FoodFantasy",
    "Deliciousness",
    "FlavorsOfTheWorld",
    "CulinaryArt",
    "FoodAdventure",
    "EatingWell",
    "YumYum",
    "Gastronomy",
    "EdibleArt",
    "FoodVibes",
    "Savoring",
    "FoodJourney",
    "FoodCrush",
    "GoodEats",
    "FoodieBliss",
    "FoodGoddess",
    "EatingGood",
    "TasteBudAdventure",
    "YummyEats",
    "TasteSensation",
    "FlavorJourney",
    "CheatDay",
    "DelightfulDishes",
    "HeavenlyBites",
    "SensoryDelight",
    "EatingExcellence",
    "FlavorMagic",
    "FoodieHaven",
    "DelishDishes",
    "DelectableDelights",
    "FlavorSensation",
    "TasteOfHeaven",
    "IndulgentTreats",
    "SatisfyCravings",
    "FoodieTherapy",
    "DelightInEveryBite",
    "FlavorsOfJoy",
    "GuiltlessPleasure",
    "FoodieAdventures",
    "ScrumptiousEats",
    "EpicureanDelights",
    "EdiblePleasure",
    "TasteSpectacular",
    "CulinaryDelights",
    "FeastForTheSenses",
    "TasteBudHeaven",
    "EpicureanExperience",
    "MouthwateringJourney",
    "DivineFlavors",
    "SavoryIndulgence",
    "FlavorFiesta",
    "EpicureanFeast",
    "FoodieGems",
    "GastronomicPleasure",
    "GourmetExperience",
    "SensoryJourney",
    "IndulgeInTaste",
    "FlavorsOfHappiness",
    "EatingBliss",
    "TasteSafari",
    "DelightfulDining",
    "TasteBudTreats",
    "ScrumptiousMoments",
    "FlavorfulTaste",
    "SensationalBites",
    "DelectableFeasts",
    "YummyDelights",
  ];

  // State to control whether the Snackbar is shown or hidden
  const [showSnackbar, setShowSnackbar] = useState(false);
  // State to store the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State to store the type of Snackbar, which can be 'success' or 'error'
  const [snackbarType, setSnackbarType] = useState(""); // 'success' or 'error'

  const [mobileList, setMobileList] = useState([]);

  const addNewPhoneNumberToList = () => {
    if (phoneNumber.length > 0) {
      if (!mobileList.includes(phoneNumber)) {
        setMobileList((prevList) => [...prevList, phoneNumber]);
        setShowSnackbar(true);
        setSnackbarMessage("Phone Number added");
        setSnackbarType("success");
      } else {
        setShowSnackbar(true);
        setSnackbarMessage("Phone Number already added  ");
        setSnackbarType("error");
      }
    } else {
      setShowSnackbar(true);
      setSnackbarMessage("Phone Number field cannot be blank");
      setSnackbarType("error");
    }
  };

  const deletePhoneNumberFromList = (index) => {
    try {
      const updatedList = [...mobileList];
      updatedList.splice(index, 1);
      setMobileList(updatedList);

      setShowSnackbar(true);
      setSnackbarMessage("Phone Number deleted");
      setSnackbarType("success");
    } catch {
      setShowSnackbar(true);
      setSnackbarMessage("Some error occured in deleting.");
      setSnackbarType("error");
    }
  };

  return (
    <>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color={theme.palette.grey[800]}>
              Enter recipients
            </Typography>
            <Typography variant="body2" color={theme.palette.grey[600]} mb={3}>
              Input Mobile Numbers
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3}>
                <Countries country={country} setCountry={setCountry} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <PhoneInput
                  country={country.toLowerCase()}
                  enableSearch={true}
                  countryCodeEditable={false}
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  placeHolder="Enter the phone number"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={addNewPhoneNumberToList}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <ActionItemList
            actionItemsList={mobileList}
            deleteItemFromList={deletePhoneNumberFromList}
            recordType="Phone"
          />
        </Paper>
      </Box>

      <Paper>
        <Box p={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ color: theme.palette.grey[700] }}>
              <Box sx={tagStyle}>
                <Typography variant="h6" align="center">
                  Preview
                </Typography>
                <Typography>Description</Typography>
                <Box m={1}>{smsDescription}</Box>
                <Typography>Tags</Typography>
                <Box m={1}>
                  {tags.map((item) => (
                    <>#{item} </>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={tagStyle}>
                <Typography mb={1}>Add Tag</Typography>
                <CompactChipInputSelect
                  totalList={tagList}
                  selectedItems={tags}
                  setSelectedItems={setTags}
                  inputLabelText="Tags"
                />
                <Typography mt={2} mb={1}>
                  Custom Message
                </Typography>
                <TextField
                  fullWidth
                  label="Enter Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  size="small"
                  value={smsDescription}
                  onChange={(e) => setSmsDescription(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <ToastAlert
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default SMS;
