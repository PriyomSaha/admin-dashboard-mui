// import React, { useState, useEffect } from "react";
// import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

// const ParentChildCheckbox = ({
//   parent,
//   children,
//   perms,
//   setPerms,
//   defaultChecked,
// }) => {
//   // State to track whether the parent checkbox is checked
//   const [parentChecked, setParentChecked] = useState(false);

//   // State to track the checked status of child checkboxes
//   const [childChecked, setChildChecked] = useState(
//     Array(children.length).fill(false)
//   );

//   useEffect(() => {
//     // Calculate parent checkbox state based on child checkboxes
//     if (childChecked.every((checked) => checked)) {
//       setParentChecked(true); // If all child checkboxes are checked, set parent to checked
//     } else if (childChecked.some((checked) => checked)) {
//       setParentChecked(false); // If at least one child checkbox is checked, set parent to indeterminate
//     } else {
//       setParentChecked(false); // If no child checkbox is checked, set parent to unchecked
//     }
//   }, [childChecked]);

//   // Handle change for the parent checkbox
//   const handleParentChange = () => {
//     if (!defaultChecked) {
//       setParentChecked(!defaultChecked);
//       setChildChecked(Array(children.length).fill(!defaultChecked));
//     } else {
//       if (!parentChecked) {
//         // When parent checkbox is checked
//         setParentChecked(true);
//         setChildChecked(Array(children.length).fill(true)); // Set all child checkboxes to checked

//         // Remove unchecked children from perms array
//         const newPerms = perms.filter((perm) => !children.includes(perm));

//         // Update permissions array to include parent and children
//         setPerms([
//           ...newPerms,
//           ...children.map((child) => `${parent}-${child}`),
//         ]);
//       } else {
//         // When parent checkbox is unchecked
//         setParentChecked(false);
//         setChildChecked(Array(children.length).fill(false)); // Set all child checkboxes to unchecked
//         const newPerms = perms.filter((perm) => !perm.includes(parent));

//         setPerms([...newPerms]);
//       }
//     }
//   };

//   // Handle change for individual child checkboxes
//   const handleChildChange = (index) => {
//     if (!defaultChecked)
//       setChildChecked(Array(children.length).fill(!defaultChecked));
//     else {
//       const newChildChecked = [...childChecked];
//       newChildChecked[index] = !newChildChecked[index]; // Toggle the checked status of the clicked child checkbox
//       setChildChecked(newChildChecked);

//       if (newChildChecked[index]) {
//         // If child checkbox is checked, update permissions array
//         setPerms([...perms, `${parent}-${children[index]}`]);
//       } else {
//         // If child checkbox is unchecked, remove corresponding permissions from array
//         setPerms(
//           perms.filter(
//             (item) =>
//               item !== children[index] &&
//               item !== `${parent}-${children[index]}`
//           )
//         );
//       }
//     }
//   };
//   useEffect(() => {
//     if (!defaultChecked) {
//       handleParentChange();
//     }

//     return () => {
//       // Reset states and cleanup when component unmounts
//       setParentChecked(false);
//       setChildChecked(Array(children.length).fill(false));
//     };
//   }, [defaultChecked]);
//   return (
//     <FormGroup>
//       {/* Parent checkbox */}
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={parentChecked}
//             onChange={handleParentChange}
//             indeterminate={
//               childChecked.some((checked) => checked) && !parentChecked
//             } // Set indeterminate state based on child checkboxes
//             value={parent}
//           />
//         }
//         label={<b>{parent}</b>}
//       />
//       {/* Child checkboxes */}
//       {children.map((child, index) => (
//         <FormControlLabel
//           key={index}
//           control={
//             <Checkbox
//               checked={childChecked[index]}
//               onChange={() => handleChildChange(index)}
//               sx={{
//                 ml: 2,
//                 "&.Mui-checked": {
//                   color: "green",
//                 },
//               }}
//             />
//           }
//           label={child}
//         />
//       ))}
//     </FormGroup>
//   );
// };

// export default ParentChildCheckbox;
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

  // Handle change for the parent checkbox
  const handleParentChange = () => {
    if (!defaultChecked) {
      setParentChecked(!defaultChecked);
      setChildChecked(Array(children.length).fill(!defaultChecked));
    } else {
      if (!parentChecked) {
        // When parent checkbox is checked
        setParentChecked(true);
        setChildChecked(Array(children.length).fill(true)); // Set all child checkboxes to checked

        // Remove unchecked children from perms array
        const newPerms = perms.filter((perm) => !children.includes(perm));

        // Update permissions array to include parent and children
        setPerms([
          ...newPerms,
          ...children.map((child) => `${parent}-${child}`),
        ]);
      } else {
        // When parent checkbox is unchecked
        setParentChecked(false);
        setChildChecked(Array(children.length).fill(false)); // Set all child checkboxes to unchecked
        const newPerms = perms.filter((perm) => !perm.includes(parent));

        setPerms([...newPerms]);
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

      if (newChildChecked[index]) {
        // If child checkbox is checked, update permissions array
        setPerms([...perms, `${parent}-${children[index]}`]);
      } else {
        // If child checkbox is unchecked, remove corresponding permissions from array
        setPerms(
          perms.filter(
            (item) =>
              item !== children[index] &&
              item !== `${parent}-${children[index]}`
          )
        );
      }
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
