import React from "react";
import {TextField, InputAdornment, IconButton, Typography, Grid} from "@mui/material";
import { useState } from "react";
import { MdClear, MdSearch } from "react-icons/md";



function CustomerSearchBar() {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };
    

    const handleClearSearch = () => {
        setSearchText("");
    };

    return(
        <>
          <Typography
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
          alignItems="center"
          >
            <Grid container item xs={12}>
                <TextField
                size="small"
                placeholder="Search Customers ..."
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MdSearch/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchText && (
                                <IconButton edge="end" onClick={handleClearSearch}>
                                    <MdClear/>
                                </IconButton>
                            )}
                        </InputAdornment>
                    )
                }}
                ></TextField>
                
            </Grid>
          </Typography>
        </>
    );
}

export default CustomerSearchBar;