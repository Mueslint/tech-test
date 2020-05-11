import request from "../request";

export const fetchCurrentUser = async ({ identifiant, password }, setUser) => {
  const { session_token } = await request({
    endpoint: "auth",
    body: { identifiant, password },
    method: "POST",
  });

  setUser({ identifiant, token: session_token });
};
