import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useInvitedUserStore } from "Components/Assets/StateManagement";

const ParentChildCheckbox = ({
  parent,
  children,
  perms,
  setPerms,
  defaultChecked,
}) => {
  const isInvitedUserModalOpen = useInvitedUserStore(
    (state) => state.isInvitedUserModalOpen
  );

  // State to track whether the parent checkbox is checked
  const [parentChecked, setParentChecked] = useState(false);

  // State to track the checked status of child checkboxes
  const [childChecked, setChildChecked] = useState(
    Array(children.length).fill(false)
  );

  useEffect(() => {
    // Calculate parent checkbox state based on child checkboxes
    if (childChecked.every((checked) => checked)) {
      setParentChecked(true);
    } else if (childChecked.some((checked) => checked)) {
      setParentChecked(false);
    } else {
      setParentChecked(false);
    }
  }, [childChecked]);

  useEffect(() => {
    // Initialize the parent and child checkboxes based on perms prop
    if (perms && perms.length > 0) {
      const parentPerm = perms.find((perm) => Object.keys(perm)[0] === parent);
      if (parentPerm) {
        const checkedChildren = parentPerm[parent];
        setParentChecked(true);
        setChildChecked(
          children.map((child) => checkedChildren.includes(child))
        );
      }
    }
  }, [isInvitedUserModalOpen]);

  useEffect(() => {
    // setPerms([]);
    if (!defaultChecked) {
      handleParentChange();
    }
    return () => {
      // Reset states and cleanup when component unmounts
      setParentChecked(false);
      setChildChecked(Array(children.length).fill(false));
    };
  }, [defaultChecked]);

  const handleParentChange = () => {
    if (!defaultChecked) {
      setParentChecked(!defaultChecked);
      setChildChecked(Array(children.length).fill(!defaultChecked));
    } else {
      if (!parentChecked) {
        // When parent checkbox is checked
        setParentChecked(true);
        setChildChecked(Array(children.length).fill(true)); // Set all child checkboxes to checked

        setPerms((prevPerms) => {
          const existingParentIndex = prevPerms.findIndex(
            (item) => Object.keys(item)[0] === parent
          );

          const uniqueChildren = Array.from(
            new Set([
              ...(existingParentIndex !== -1
                ? prevPerms[existingParentIndex][parent]
                : []),
              ...children,
            ])
          );

          const updatedParent = {
            [parent]: uniqueChildren.map((child) => `${child}`),
          };

          if (existingParentIndex !== -1) {
            // If the parent object already exists, update its children array
            prevPerms.splice(existingParentIndex, 1, updatedParent);
            return [...prevPerms];
          } else {
            // If the parent object doesn't exist, create a new one
            return [...prevPerms, updatedParent];
          }
        });
      } else {
        // When parent checkbox is unchecked
        setParentChecked(false);
        setChildChecked(Array(children.length).fill(false)); // Set all child checkboxes to unchecked

        setPerms((prevPerms) =>
          prevPerms.filter((perm) => Object.keys(perm)[0] !== parent)
        );
      }
    }
  };

  // Handle change for individual child checkboxes
  const handleChildChange = (index) => {
    if (!defaultChecked)
      setChildChecked(Array(children.length).fill(!defaultChecked));
    else {
      const newChildChecked = [...childChecked];
      newChildChecked[index] = !newChildChecked[index]; // Toggle the checked status of the clicked child checkbox
      setChildChecked(newChildChecked);

      const selectedChildren = children.filter(
        (child, i) => newChildChecked[i]
      );

      setPerms((prevPerms) => {
        const updatedPerms = prevPerms.filter(
          (item) => Object.keys(item)[0] !== parent
        );

        if (selectedChildren.length > 0) {
          // If at least one child checkbox is checked
          updatedPerms.push({ [parent]: selectedChildren });
        }

        return updatedPerms;
      });
    }
  };

  return (
    <FormGroup>
      {/* Parent checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={parentChecked}
            onChange={handleParentChange}
            indeterminate={
              childChecked.some((checked) => checked) && !parentChecked
            } // Set indeterminate state based on child checkboxes
            value={parent}
          />
        }
        label={<b>{parent}</b>}
      />
      {/* Child checkboxes */}
      {children.map((child, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={childChecked[index]}
              onChange={() => handleChildChange(index)}
              sx={{
                ml: 2,
                "&.Mui-checked": {
                  color: "green",
                },
              }}
            />
          }
          label={child}
        />
      ))}
    </FormGroup>
  );
};

export default ParentChildCheckbox;
