import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import React from "react";

function SearchEngineOptimization() {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Commission ConfigurationSearch Engine Optimization (SEO)
      </Typography>
      <Typography variant="h7" color={theme.palette.grey[700]}>
        Unleash your SEO potential. Boost SEO ranking. Dominate search results.
      </Typography>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 1,
          p: 2,
          mt: 1,
          background: theme.palette.grey[100],
        }}
      >
        <Typography //sx={{ mb: 2 }}
          color="primary"
          letterSpacing={1}
          variant="h6"
          fontWeight={600}
        >
          Merchant Name
        </Typography>

        <Grid container my={1} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Page Title"
              variant="outlined"
              size="small"
              helperText="Not more than 60 words {value} / 60"
            />

            <Grid container item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                fullWidth
                label="Meta Keyword"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} rowSpan={2}>
            <TextField
              fullWidth
              label="Meta Description"
              variant="outlined"
              multiline
              rows={4}
              size="small"
              helperText="Not more than 160 words {value} / 160"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default SearchEngineOptimization;
