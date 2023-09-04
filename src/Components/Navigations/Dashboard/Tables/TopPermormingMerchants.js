import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TableImage } from "Components/Assets/GlobalStyles";
import { getTopMerchants } from "Components/Assets/UIServices";
import React from "react";
import ShopFallBack from "Components/UI/Images/ShopFallBack.svg";

function TopPermormingMerchants() {
  const [merchants, setMerchants] = React.useState([]);

  const columns = [
    { id: "img", label: "Photo", minWidth: 20 },
    {
      id: "merchant",
      label: "Merchant",
      minWidth: 200,
    },
    {
      id: "orders",
      label: "Orders",
      minWidth: 20,
      align: "center",
    },
  ];
  React.useEffect(() => {
    setMerchants(getTopMerchants());
  }, []);
  return (
    <>
      <Grid item xs={12} sm={12} md={6}>
        <Paper elevation={3}>
          <Typography variant="h5" align="left" pl={2} pt={1} fontWeight={600}>
            Top Performing Merchants
          </Typography>
          <TableContainer
            sx={{
              minHeight: 410,
              maxHeight: 500,
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: 600, textTransform: "uppercase" }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {merchants.map((value) => (
                  <TableRow>
                    <TableCell>
                      {
                        <img
                          src={
                            value.imgUri.length == 0
                              ? ShopFallBack
                              : value.imgUri
                          }
                          alt="Shop View"
                          style={TableImage}
                        />
                      }
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://admin.zaperr.com/m/${value.merchantId}/dashboard`}
                      >
                        {value.merchant}
                      </a>
                    </TableCell>
                    <TableCell align="center">{value.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
}

export default TopPermormingMerchants;
