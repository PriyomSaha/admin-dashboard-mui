import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const ActionItemList = ({
  actionItemsList,
  deleteItemFromList,
  recordType,
}) => {
  const emptyList = (length) => {
    if (length === 0) {
      return (
        <TableRow style={{ textAlign: "center" }}>
          <TableCell colSpan={6} align="center">
            <Typography variant="body2">
              <b>No Records</b> to show
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">{recordType}</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emptyList(actionItemsList.length)}
            {actionItemsList.map((actionItem, i) => (
              <TableRow key={i + 1}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{actionItem}</TableCell>

                <TableCell align="center">
                  <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItemFromList(i)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ActionItemList;

{
  /* <tbody>
  {emptyList(actionItemsList.length)}
  {actionItemsList.map((actionItem, i) => (
    <tr key={i + 1}>
      <td>{i + 1}</td>
      <td>{actionItem}</td>

      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteActionItemFromState(i)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  ))}
</tbody>; */
}
