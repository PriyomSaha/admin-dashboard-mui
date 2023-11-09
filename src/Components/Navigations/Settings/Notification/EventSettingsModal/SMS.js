import React from "react";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";
import Countries from "Components/Assets/ReusableComp/Countries";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import PhoneInput from "react-phone-input-2";
import { FullScreenModalContent } from "Components/Assets/GlobalStyles";

function SMS({
  eventDescription,
  setEventDescription,
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
                <Button variant="contained">Add</Button>
              </Grid>
            </Grid>
          </Box>
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
                <Box m={1}>{eventDescription}</Box>
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
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default SMS;
