import React from "react";
import styled from "@emotion/styled";
import { color, layout, space, flexbox } from "styled-system";

import { Flex, Column } from "../Flex";

const MenuContainer = styled.aside`
  height: 100vh;
  background-color: #0a3758;
  color: #f5f8fa;
`;

const MenuHeader = styled(Flex)`
  border-bottom: 1px solid #c6ecff;
  padding: 20px;
  margin-bottom: 10px;
`;

const MenuItem = styled.button`
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 0.8rem;
  text-decoration: none;
  outline: none;
  ${color}
  ${layout}
  ${space}
  ${flexbox}
`;

const MenuItems = styled(Column)`
  height: 100%;
`;

const MenuLabel = ({ children }) => (
  <p
    className="menu-label"
    style={{
      color: "#f5f8fa",
      paddingLeft: "10px",
      marginTop: "30px",
      fontSize: "0.9em",
    }}
  >
    {children}
  </p>
);

export const Menu = ({ setActiveSection, handleLogout }) => {
  return (
    <MenuContainer className="menu" width={1 / 5}>
      <MenuHeader>Front-end Test Dashboard</MenuHeader>
      <MenuItems>
        <MenuLabel>Stream Monitoring</MenuLabel>
        <MenuItem p={20} onClick={() => setActiveSection("main")}>
          Stream stats
        </MenuItem>
        <MenuLabel>Traffic Monitoring</MenuLabel>
        <MenuItem p={20} onClick={() => setActiveSection("24h")}>
          Last 24 hours
        </MenuItem>
        <MenuItem p={20} onClick={() => setActiveSection("1w")}>
          Last week
        </MenuItem>
        <MenuItem p={20} onClick={() => setActiveSection("alltime")}>
          All time
        </MenuItem>
        <MenuLabel>Account</MenuLabel>
        <MenuItem p={20} onClick={() => setActiveSection("notifications")}>
          Notifications
        </MenuItem>
        <MenuItem p={80} onClick={() => handleLogout()}>
          Deconnexion
        </MenuItem>
      </MenuItems>
    </MenuContainer>
  );
};
