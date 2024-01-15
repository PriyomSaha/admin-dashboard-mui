import { Box, Button } from "@mui/material";
import React from "react";
import { CSVLink } from "react-csv";

function Export({ data, headers, fileName }) {
  return (
    <>
      <CSVLink data={data} headers={headers} filename={`${fileName}.csv`}>
        <hr />
        {/* Save button */}
        <Button
          variant="contained-dark"
          sx={{
            float: "right",
            position: "relative",
          }}
        >
          Save
        </Button>
      </CSVLink>
    </>
  );
}

export default Export;
