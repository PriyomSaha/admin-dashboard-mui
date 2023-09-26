import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, Grid, Paper, Typography,Tooltip, IconButton } from "@mui/material";
import { data3 } from "./data";
import { FaInfoCircle } from "react-icons/fa";

function Sales() {
  const getSalesCounts = (data) => {
    const counts = {
      sales: 0,
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
  const totalCounts = getSalesCounts(data3);

  const keys = ["sales"];
  const colors = [
    "var(--order-sales-background)",
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
      translateY: -65,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 75,
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
          Sales
        </Typography>
        
        <Typography sx={{ mt: 4 }}>
            Total :{" "}
            {totalCounts.sales}
          </Typography>
          </Box>
          {/*<Tooltip title="Add" arrow>
            <IconButton sx={{ mt: 1.25, ml: 11, position: "absolute" }}>
              <FaInfoCircle size={"15px"} />
            </IconButton>
          </Tooltip>*/}
        <ResponsiveLine
          data={data3}
          colors={{ datum: "color" }}
          margin={{ top: 80, right: 20, bottom: 50, left: 50 }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
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
          enableSlices="x"
          legends={legends}
        />
      </Paper>
    </Grid>
  );
}

export default Sales;
