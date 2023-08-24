import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { data3 } from "../data";

function Sales() {
  return (
    <Grid item xs={12} sm={12} md={12} lg={4}>
      <Paper elevation={3} className="graphContainer">
        <Typography
          variant="h5"
          align="left"
          pl={2}
          pt={1}
          fontWeight={600}
          textTransform={"capitalize"}
          sx={{ position: "absolute" }}
        >
          Sales
        </Typography>
        <ResponsiveLine
          data={data3}
          colors={{ datum: "color" }}
          margin={{ top: 80, right: 20, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </Paper>
    </Grid>
  );
}

export default Sales;
