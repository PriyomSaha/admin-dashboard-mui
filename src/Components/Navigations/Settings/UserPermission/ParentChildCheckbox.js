import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const ParentChildCheckbox = ({
  parent,
  children,
  perms,
  setPerms,
  defaultChecked,
}) => {
  // State to track whether the parent checkbox is checked
  const [parentChecked, setParentChecked] = useState(false);

  // State to track the checked status of child checkboxes
  const [childChecked, setChildChecked] = useState(
    Array(children.length).fill(false)
  );

  useEffect(() => {
    // Calculate parent checkbox state based on child checkboxes
    if (childChecked.every((checked) => checked)) {
      setParentChecked(true); // If all child checkboxes are checked, set parent to checked
    } else if (childChecked.some((checked) => checked)) {
      setParentChecked(false); // If at least one child checkbox is checked, set parent to indeterminate
    } else {
      setParentChecked(false); // If no child checkbox is checked, set parent to unchecked
    }
  }, [childChecked]);

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

  useEffect(() => {
    setPerms([]);
    if (!defaultChecked) {
      handleParentChange();
    }

    return () => {
      // Reset states and cleanup when component unmounts
      setParentChecked(false);
      setChildChecked(Array(children.length).fill(false));
    };
  }, [defaultChecked]);
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
