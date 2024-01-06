import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material";
import { data2 } from "Components/Assets/ReusableComp/GraphContainers/data";
import { FaInfoCircle } from "react-icons/fa";

export const DeliveryFee = () => {
  const getdeliverycounts = (data) => {
    const counts = {
      delivery: 0,
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
  const totalCounts = getdeliverycounts(data2);
  // return (
  //   <Paper elevation={3} className="graphContainer">
  //     <Box
  //       textTransform={"capitalize"}
  //       sx={{ position: "absolute" }}
  //       pl={2}
  //       pt={1}
  //     >
  //       <Typography
  //         variant="h5"
  //         align="left"
  //         pl={2}
  //         pt={1}
  //         fontWeight={600}
  //         textTransform={"capitalize"}
  //         sx={{ position: "absolute" }}
  //       >
  //         Deliveryfee
  //       </Typography>
  //       <Typography sx={{ mt: 4 }}>Total : ₹ {totalCounts.delivery}</Typography>
  //     </Box>
  //     <ResponsiveLine
  //       data={data2}
  //       colors={{ datum: "color" }}
  //       margin={{ top: 90, right: 20, bottom: 50, left: 50 }}
  //       xScale={{ type: "point" }}
  //       yScale={{
  //         type: "linear",
  //         min: "auto",
  //         max: "auto",
  //         stacked: true,
  //         reverse: false,
  //       }}
  //       yFormat=" >-.2f"
  //       axisTop={null}
  //       axisRight={null}
  //       axisBottom={{
  //         tickValues: 5,
  //         tickSize: 5,
  //         tickPadding: 5,
  //         tickRotation: 0,
  //         legend: "Time",
  //         legendOffset: 36,
  //         legendPosition: "middle",
  //       }}
  //       axisLeft={{
  //         tickValues: 5,
  //         tickSize: 5,
  //         tickPadding: 5,
  //         tickRotation: 0,
  //         legend: "Amount",
  //         legendOffset: -40,
  //         legendPosition: "middle",
  //       }}
  //       pointSize={10}
  //       pointColor={{ theme: "background" }}
  //       pointBorderWidth={2}
  //       pointBorderColor={{ from: "serieColor" }}
  //       pointLabelYOffset={-12}
  //       useMesh={true}
  //     />
  //   </Paper>
  // );

  return (
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
          Delivery&nbsp;Fee
        </Typography>

        <Typography sx={{ mt: 4 }}>Total : ₹ {totalCounts.delivery}</Typography>
      </Box>

      <ResponsiveLine
        data={data2}
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
        // legends={legends}
        // tooltip={CustomTooltip}
        enableSlices="x"
      />
    </Paper>
  );
};

export default DeliveryFee;
