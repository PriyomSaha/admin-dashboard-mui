import React from "react";
import { FaChartLine } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { GiCancel } from "react-icons/gi";
import { LuPackageCheck } from "react-icons/lu";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";

function CardsHolder() {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xl={2} md={3} sm={6} xs={12}>
          <Paper elevation={4}>
            <Stack
              direction={"column"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={1}
            >
              <FaChartLine size={40} color={theme.palette.grey[800]} />
              <Typography color={theme.palette.grey[500]}>
                Total Sales
              </Typography>
              <Box mt={2} />
              <Typography
                variant={"h5"}
                fontWeight={680}
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                ₹ 1,00,039.00
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xl={2} md={3} sm={6} xs={12}>
          <Paper elevation={4}>
            <Stack
              direction={"column"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={1}
            >
              <LuBadgePercent size={40} color={theme.palette.grey[800]} />
              <Typography color={theme.palette.grey[500]}>
                Total Commission
              </Typography>
              <Box mt={2} />
              <Typography variant={"h5"} fontWeight={680}>
                ₹ 5000.00
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xl={2} md={3} sm={6} xs={12}>
          <Paper elevation={4}>
            <Stack
              direction={"column"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={1}
            >
              <LuPackageCheck size={40} color={theme.palette.grey[800]} />
              <Typography color={theme.palette.grey[500]}>
                Total Orders
              </Typography>
              <Box mt={2} />
              <Typography variant={"h5"} fontWeight={680}>
                50000
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xl={2} md={3} sm={6} xs={12}>
          <Paper elevation={4} sx={{ minWidth: "1vw" }}>
            <Stack
              direction={"column"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={1}
            >
              <GiCancel size={40} color={theme.palette.grey[800]} />
              <Typography color={theme.palette.grey[500]}>
                Cancelled Orders
              </Typography>
              <Box mt={2} />
              <Typography variant={"h5"} fontWeight={680}>
                58
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CardsHolder;
