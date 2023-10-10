import { Box, Button, Stack, Typography } from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

function FormBuilder() {
  var options = {
    controlPosition: "left",
    disableFields: [
      "autocomplete",
      "paragraph",
      "hidden",
      "header",
      "checkbox-group",
      "button",
    ],
    controlOrder: ["text", "textarea", "number", "select"],
    disabledActionButtons: ["data", "save", "clear"],
  };

  const fbRef = useRef(null);
  var fb = useRef(null);

  useEffect(() => {
    fb = $(fbRef.current).formBuilder(options);
  }, []);

  return (
    <>
      <Box>
        <Box ref={fbRef} />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => fb.actions.clearFields()}
            color="error"
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => fb.actions.save()}
            color="success"
          >
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default FormBuilder;
