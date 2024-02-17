import React, { useEffect, useState } from "react";
import ParentChildCheckbox from "./ParentChildCheckbox"; // Importing a custom component for handling parent-child checkboxes
import { Checkbox, FormControlLabel, Typography } from "@mui/material"; // Importing Material-UI components
import { theme } from "Components/UI/themes"; // Importing a theme
import { useInvitedUserStore } from "Components/Assets/StateManagement";

function PermissionList({ perms, setPerms }) {
  // Define a list of permissions with parent and child items
  const list = {
    Merchants: ["Merchants", "Category", "Product"], // Example: "Merchants" is a parent category with child items
    Orders: ["Orders"], // Example: "Orders" is a parent category with no child items
    Reports: ["Reports", "Export Reports"], // Example: "Reports" with child items
  };

  // State to track if "Select All" is checked or not
  const [isSelectAll, setIsSelectAll] = useState(true);

  const isInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.isInvitedUserModalOpen
  );

  const totalPermsCount = Object.keys(list).length;

  // Function to handle the "Select All" checkbox
  const handleSelectAll = async () => {
    await setIsSelectAll(!isSelectAll); // Toggle the "Select All" state

    if (isSelectAll) {
      // If "Select All" was checked
      const updatedPerms = [];

      // Loop through each parent permission category
      for (const parent in list) {
        const children = list[parent];
        const parentPermissions = [];

        children.forEach((child) => {
          const childPermission = `${parent}-${child}`;
          if (!perms.includes(childPermission)) {
            // If the child permission is not in the selected permissions, add it
            setPerms((prevPerms) => [...prevPerms, childPermission]);
          }
          parentPermissions.push(child);
        });

        updatedPerms.push({ [parent]: parentPermissions }); // Add an object with parent and child permissions to the array
      }

      setPerms(updatedPerms); // Set the modified permissions structure as an array of objects
    } else {
      // If "Select All" was unchecked, clear all permissions
      setPerms([]);
    }
  };

  useEffect(() => {
    if (perms.length === totalPermsCount) handleSelectAll();

    return () => {
      if (perms.length === totalPermsCount) handleSelectAll();
    };
  }, [isInvitedUserModalOpen]);

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
        label={isSelectAll ? <b>Select All</b> : <b>DeSelect All</b>}
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
