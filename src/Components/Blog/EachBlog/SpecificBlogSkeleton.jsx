import React from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const BlogSkeleton = () => {
  return (
    <div style={{ width: "100%", margin: "5px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "flex-end",
          justifyContent: "right",
        }}
      >
        {/* Title */}
        <Skeleton variant="text" width="80px" />

        {/* Image */}
        <Skeleton variant="rectangular" width="100%" height={200} />

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="rectangular" width="100%" height={80} />
        </Box>
      </Box>
    </div>
  );
};

export default BlogSkeleton;
