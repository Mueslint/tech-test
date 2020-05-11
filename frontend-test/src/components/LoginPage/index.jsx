import React, { useState } from "react";

import { ReactComponent as Logo } from "../../img/loginlogo.svg";

import { Flex, Column, Box } from "..";
import { fetchCurrentUser } from "../../utils/fetchers";

export const LoginPage = ({ setUser }) => {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () =>
    fetchCurrentUser({ identifiant, password }, setUser);
  return (
    <Flex width="100%" justifyContent="center">
      <Column p={20} height={200}>
        <Box pb={20}>
          <Logo />
        </Box>
        <Box pb={10}>
          <label className="label">Identifiant </label>
          <input
            className="input"
            type="text"
            onChange={(e) => setIdentifiant(e.target.value)}
          />
        </Box>
        <Box pb={10}>
          <label className="label">Password </label>
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box py={10}>
          <button
            className="button is-primary is-fullwidth"
            onClick={handleLogin}
          >
            Log in
          </button>
        </Box>
      </Column>
    </Flex>
  );
};
