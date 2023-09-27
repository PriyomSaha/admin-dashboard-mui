import React from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { data } from "./data";
import { FaInfoCircle } from "react-icons/fa";
import { Md10K } from "react-icons/md";

export const Orders = () => {
  const getOrderCounts = (data) => {
    const counts = {
      active: 0,
      completed: 0,
      cancelled: 0,
    };

    data.forEach((entry) => {
      const orderType = entry.id.toLowerCase();
      const totalCount = entry.data.reduce(
        (total, point) => total + point.y,
        0
      );
      counts[orderType] = totalCount;
    });

    return counts;
  };

  const totalCounts = getOrderCounts(data);
  const keys = ["completed", "active", "cancelled"];
  const colors = [
    "var(--order-completed-background)",
    "var(--order-pending-background)",
    "var(--order-cancelled-background)",
  ];
  // console.log(totalCount);
  const legends = [
    // Add an additional legend item for the total count
    {
      dataFrom: "keys",
      data: keys.map((id, index) => ({
        color: colors[index],
        label: `${id.charAt(0).toUpperCase() + id.slice(1)} : ${
          totalCounts[id]
        }`,
      })),
      anchor: "top-right",
      direction: "column",
      justify: true,
      translateY: -75,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 100,
      itemHeight: 20,
      itemOpacity: 0.9,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [
        {
          on: "hover",
          style: {
            itemBackground: "rgba(0, 0, 0, .03)",
            itemOpacity: 1,
          },
        },
      ],
    },
  ];
  return (
    <Grid item xs={12} sm={12} md={12} lg={4}>
      <Paper elevation={3} className="graphContainer">
        <Box
          textTransform={"capitalize"}
          sx={{ position: "absolute" }}
          pl={2}
          pt={1}
        >
          <Typography
            variant="h5"
            align="left"
            fontWeight={600}
            textTransform={"capitalize"}
            sx={{ position: "absolute" }}
            alignItems={"center"}
          >
            Orders
          </Typography>

          <Typography sx={{ mt: 4 }}>
            Total :{" "}
            {totalCounts.active + totalCounts.cancelled + totalCounts.completed}
          </Typography>
        </Box>
        {/* <Tooltip title="Add" arrow>
            <IconButton sx={{ mt: 1, ml: 12, position: "relative" }}>
              <FaInfoCircle size={"15px"} />
            </IconButton>
          </Tooltip> */}
        <ResponsiveLine
          data={data}
          colors={{ datum: "color" }}
          margin={{ top: 80, right: 20, bottom: 50, left: 50 }}
          // xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            //   reverse: false,
          }}
          // yFormat=" >-.2f"
          // enableGridX={false}
          // enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            // tickValues: 5,
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            // tickFormat: () => {},
            legend: "Count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ from: "color" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={legends}
          // tooltip={CustomTooltip}
          enableSlices="x"
        />
      </Paper>
    </Grid>
  );
};

export default Orders;
