import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CompactChipInputTextField from "Components/Assets/ReusableComp/CompactChipInputTextField";
import ImageUpload from "Components/Assets/ReusableComp/ImageUpload";

function SEO() {
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetakeyword] = useState([]);

  return (
    <>
      <Grid item xs={12} sm={12} md={5}>
        <Box mt={2} ml={2}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Search Engine Optimization (SEO)
          </Typography>
          <Typography>Search Engine Optimization (SEO)</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box width={"100%"}>
          <Paper elevation={3}>
            <Box px={4} py={3}>
              <Typography variant="h5" color={"var(--links)"} fontWeight={600}>
                ZAPERR
              </Typography>
              <TextField
                fullWidth
                label="Page Title"
                variant="outlined"
                size="small"
                value={pageTitle}
                sx={{ mt: 2 }}
                inputProps={{ maxLength: 60 }} // Set the maximum length
                helperText={`${pageTitle.length} / 60`} // Display the current character count
                onChange={(e) => {
                  if (e.target.value.length <= 60) {
                    setPageTitle(e.target.value);
                  }
                }}
              />
              <TextField
                fullWidth
                label="Meta Description"
                variant="outlined"
                size="small"
                value={metaDescription}
                sx={{ mt: 2 }}
                inputProps={{ maxLength: 160 }} // Set the maximum length
                helperText={`${metaDescription.length} / 160`} // Display the current character count
                onChange={(e) => {
                  if (e.target.value.length <= 160) {
                    setMetaDescription(e.target.value);
                  }
                }}
                multiline
                rows={2}
              />
              <Box sx={{ mt: 2 }}>
                <CompactChipInputTextField
                  chips={metaKeyword}
                  setChips={setMetakeyword}
                />
              </Box>
              <Grid
                container
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid item mr={1}>
                  <ImageUpload />
                </Grid>
                <Grid item m={1} alignSelf={"flex-end"}>
                  <Button variant="contained">Save Image</Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}

export default SEO;
