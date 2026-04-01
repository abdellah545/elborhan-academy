import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function CardSkeleton() {
  return (
    <div style={{ width: "45%", margin: "5px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="text" width="80%" height={150} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      </Box>
    </div>
  );
}
