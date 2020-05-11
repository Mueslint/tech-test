import React, { useState, useEffect } from "react";
import "tui-chart/dist/tui-chart.css";

import { Box, Column } from "../components";
import { useNotifications } from "../utils/hooks";

const NotificationSubpart = ({ notifications }) => {
  const typeToClass = {
    note: "is-primary",
    warning: "is-warning",
    error: "is-danger",
  };
  return (
    <Column>
      {notifications.length === 0 && (
        <p>There is no active notifications in this section</p>
      )}
      {notifications &&
        notifications.map(({ type, message }, index) => (
          <div
            key={`notification-${index}`}
            className={`notification ${typeToClass[type]}`}
          >
            {message}
          </div>
        ))}
    </Column>
  );
};

export const NotificationsDashboard = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [errors, setErrors] = useState([]);

  const { status: notificationStatus, data: notifications } = useNotifications(
    user.token
  );

  useEffect(() => {
    async function sortNotifications() {
      if (notificationStatus === "success") {
        setNotes(notifications.filter(({ type, _ }) => type === "note"));
        setWarnings(notifications.filter(({ type, _ }) => type === "warning"));
        setErrors(notifications.filter(({ type, _ }) => type === "error"));
      }
    }
    sortNotifications();
  }, [notifications, notificationStatus]);

  return (
    <Column p={20} height="100%">
      <Box pb={20} style={{ fontFamily: "oswald", color: "#0A3758" }}>
        <h1 className="title is-1">Notifications dashboard</h1>
      </Box>

      {notificationStatus === "success" && (
        <Column>
          <Box p={20}>
            <h2 className="subtitle">Notes</h2>
            <NotificationSubpart notifications={notes} />
          </Box>
          <Box p={20}>
            <h2 className="subtitle">Warnings</h2>
            <NotificationSubpart notifications={warnings} />
          </Box>
          <Box p={20}>
            <h2 className="subtitle">Errors</h2>
            <NotificationSubpart notifications={errors} />
          </Box>
        </Column>
      )}
    </Column>
  );
};
