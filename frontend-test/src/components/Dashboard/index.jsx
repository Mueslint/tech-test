import React, { useState } from "react";

import { Flex, Column } from "../Flex";

import { StreamDashboard } from "../../views/StreamDashboard";
import { TrafficActivityDashboard } from "../../views/TrafficActivityDashboard";
import { NotificationsDashboard } from "../../views/NotificationsDashboard";

import { Menu } from "./Menu";
import request from "../../utils/request";

export const Dashboard = ({ user, setUser }) => {
  const [activeSection, setActiveSection] = useState("main");

  const handleLogout = async () => {
    await request(
      {
        endpoint: "logout",
        body: {},
        method: "POST",
      },
      user.token
    );
    setUser(null);
  };

  // TODO: handle clients with 'no data'
  if (user.identifiant === "shinynewclient") {
    return (
      <Flex width="100%" height="100%">
        <Menu setActiveSection={setActiveSection} handleLogout={handleLogout} />
        <Column>
          {activeSection === "notifications" && (
            <NotificationsDashboard user={user} />
          )}
        </Column>
      </Flex>
    );
  }

  return (
    <Flex width="100%" height="100%">
      <Menu setActiveSection={setActiveSection} handleLogout={handleLogout} />
      <Column>
        {activeSection === "main" && <StreamDashboard user={user} />}
        {activeSection === "notifications" && (
          <NotificationsDashboard user={user} />
        )}
        {activeSection === "24h" && (
          <TrafficActivityDashboard user={user} timeRange={activeSection} />
        )}
        {activeSection === "1w" && (
          <TrafficActivityDashboard user={user} timeRange={activeSection} />
        )}
        {activeSection === "alltime" && (
          <TrafficActivityDashboard user={user} timeRange={activeSection} />
        )}
      </Column>
    </Flex>
  );
};
