import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Reusing CSS as a component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
