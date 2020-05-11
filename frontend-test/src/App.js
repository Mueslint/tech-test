import React, { useState } from "react";
import { ReactQueryConfigProvider } from "react-query";

import { LoginPage, Dashboard } from "./components";
import "bulma/css/bulma.css";

const queryConfig = {
  retry: false,
  refetchAllOnWindowFocus: false,
  refetchOnMount: true,
};

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <LoginPage setUser={setUser} />;
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Dashboard user={user} setUser={setUser} />
    </ReactQueryConfigProvider>
  );
}

export default App;
