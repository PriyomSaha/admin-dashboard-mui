import React, { useState } from "react";
import ParentChildCheckbox from "./ParentChildCheckbox ";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";

function PermissionList({ perms, setPerms }) {
  const list = {
    Merchants: ["Merchants", "Category", "Product"],
    Orders: ["Orders"],
    Dashboard: ["Dashboard"],
    Reports: ["Reports", "Export Reports"],
  };
  const [isSelectAll, setIsSelectAll] = useState(!false);

  const handleSelectAll = async () => {
    await setIsSelectAll(!isSelectAll);
    await setPerms([]);

    if (isSelectAll) {
      await setPerms([...perms]);
      for (const parent in list) {
        const children = list[parent];
        children.forEach((child) => {
          const childPermission = `${parent}-${child}`;
          if (!perms.includes(childPermission)) {
            setPerms((prevPerms) => [...prevPerms, childPermission]);
          }
        });
      }
    } else {
      setPerms([]);
    }
  };
  return (
    <>
      <Typography variant="h6" fontWeight={600}>
        Permissions
      </Typography>
      <Typography variant="h7" color={theme.palette.grey[700]}>
        This user member will have following permissions
      </Typography>
      <br />
      {/* "Select All" checkbox */}
      <FormControlLabel
        control={
          <Checkbox checked={!isSelectAll} onChange={() => handleSelectAll()} />
        }
        label={<b>Select All</b>}
      />
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
