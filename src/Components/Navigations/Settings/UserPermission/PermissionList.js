import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useInvitedUserStore } from "Components/Assets/StateManagement";
import { theme } from "Components/UI/themes";
import React, { useEffect, useState } from "react";
import CheckboxList from "./CheckboxList";

function PermissionList({ permissions, setPermissions }) {
  // Define a list of permissions with parent and child items
  const list = [
    { Merchants: ["Merchants", "Category", "Product"] }, // Example: "Merchants" is a parent category with child items
    { Orders: ["Orders"] }, // Example: "Orders" is a parent category with no child items
    { Reports: ["Reports", "Export Reports"] }, // Example: "Reports" with child items
  ];

  // State to track if "Select All" is checked or not
  const [isSelectAll, setIsSelectAll] = useState(false);

  const isInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.isInvitedUserModalOpen
  );

  const totalPermsCount = Object.keys(list).length;
  const handleSelectAll = () => {
    if (!isSelectAll) {
      // If "Select All" was checked
      const updatedPerms = [];

      // Loop through each parent permission category
      list.forEach((item) => {
        const [parent, children] = Object.entries(item)[0];
        const parentPermissions = [];

        children.forEach((child) => {
          const childPermission = `${parent}-${child}`;
          if (!permissions.includes(childPermission)) {
            // If the child permission is not in the selected permissions, add it
            setPermissions((prevPerms) => [...prevPerms, childPermission]);
          }
          parentPermissions.push(child);
        });

        updatedPerms.push({ [parent]: parentPermissions }); // Add an object with parent and child permissions to the array
      });

      setPermissions(updatedPerms); // Set the modified permissions structure as an array of objects
    } else {
      setPermissions([]);
    }
    setIsSelectAll(!isSelectAll);
  };

  useEffect(() => {
    if (permissions.length === totalPermsCount) handleSelectAll();
  }, [isInvitedUserModalOpen]);

  useEffect(() => {
    if (permissions.length === totalPermsCount) setIsSelectAll(true);
  }, [permissions.length]);
  // if (permissions.length === null) setPermissions([]);
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
          <Checkbox checked={isSelectAll} onChange={() => handleSelectAll()} />
        }
        label={!isSelectAll ? <b>Select All</b> : <b>DeSelect All</b>}
      />
      {/* Map through each permission category and render ParentChildCheckbox */}

      {list.map((item, index) => {
        const [parent, children] = Object.entries(item)[0];
        return (
          <div key={index}>
            <CheckboxList
              parent={parent}
              children={children}
              perms={permissions}
              setPerms={setPermissions}
              defaultChecked={!isSelectAll}
            />
          </div>
        );
      })}
    </>
  );
}

export default PermissionList;
