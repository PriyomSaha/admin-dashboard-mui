import React, { useState } from "react";
import ParentChildCheckbox from "./ParentChildCheckbox"; // Importing a custom component for handling parent-child checkboxes
import { Checkbox, FormControlLabel, Typography } from "@mui/material"; // Importing Material-UI components
import { theme } from "Components/UI/themes"; // Importing a theme

function PermissionList({ perms, setPerms }) {
  // Define a list of permissions with parent and child items
  const list = {
    Merchants: ["Merchants", "Category", "Product"], // Example: "Merchants" is a parent category with child items
    Orders: ["Orders"], // Example: "Orders" is a parent category with no child items
    Dashboard: ["Dashboard"], // Example: "Dashboard" is another parent category
    Reports: ["Reports", "Export Reports"], // Example: "Reports" with child items
  };

  // State to track if "Select All" is checked or not
  const [isSelectAll, setIsSelectAll] = useState(!false);

  // Function to handle the "Select All" checkbox
  const handleSelectAll = async () => {
    await setIsSelectAll(!isSelectAll); // Toggle the "Select All" state
    await setPerms([]); // Clear the selected permissions

    if (isSelectAll) {
      // If "Select All" was checked
      await setPerms([...perms]); // Restore the previous permissions

      // Loop through each parent permission category
      for (const parent in list) {
        const children = list[parent];
        children.forEach((child) => {
          const childPermission = `${parent}-${child}`;
          if (!perms.includes(childPermission)) {
            // If the child permission is not in the selected permissions, add it
            setPerms((prevPerms) => [...prevPerms, childPermission]);
          }
        });
      }
    } else {
      // If "Select All" was unchecked, clear all permissions
      setPerms([]);
    }
  };

  return (
    <>
      {/* Section Title */}
      <Typography variant="h6" fontWeight={600}>
        Permissions
      </Typography>

      {/* Description */}
      <Typography variant="h7" color={theme.palette.grey[700]}>
        This user member will have the following permissions
      </Typography>
      <br />

      {/* "Select All" checkbox */}
      <FormControlLabel
        control={
          <Checkbox checked={!isSelectAll} onChange={() => handleSelectAll()} />
        }
        label={<b>Select All</b>}
      />

      {/* Map through each permission category and render ParentChildCheckbox */}
      {Object.keys(list).map((key) => (
        <div key={key}>
          <ParentChildCheckbox
            parent={key}
            children={list[key]}
            perms={perms}
            setPerms={setPerms}
            defaultChecked={isSelectAll}
          />
        </div>
      ))}
    </>
  );
}

export default PermissionList;
