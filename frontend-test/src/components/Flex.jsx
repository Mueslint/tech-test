import styled from "@emotion/styled";
import { flexbox } from "styled-system";
import { Box } from "./Box";

export const Flex = styled(Box)(
  {
    display: "flex",
  },
  flexbox
);

export const Column = styled(Flex)(
  {
    flexDirection: "column",
  },
  flexbox
);
