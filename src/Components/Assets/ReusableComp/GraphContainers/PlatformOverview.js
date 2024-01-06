import { Box, Paper, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { data4 } from "./data";
import { theme } from "Components/UI/themes";

export const PlatformOverview = () => {
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
          Platform
        </Typography>
      </Box>
      <ResponsivePie
        data={data4}
        margin={{ top: 55, right: 50, bottom: 0, left: 50 }}
        innerRadius={0.4}
        padAngle={0.9}
        cornerRadius={5}
        activeOuterRadiusOffset={2}
        // borderColor={{
        //   from: "color",
        //   modifiers: [["darker", 0.2]],
        // }}
        enableArcLinkLabels={false}
        enableArcLabels={true}
        arcLabel="id"
        arcLabelsRadiusOffset={0.4}
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 80,
            translateY: -50,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 20,
            itemTextColor: "rgba(0, 0, 0, .5)",
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            itemOpacity: 0.9,
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
        ]}
      />
    </Paper>
  );
};
