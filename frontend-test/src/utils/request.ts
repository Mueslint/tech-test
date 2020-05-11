import { DetailedError } from "./detailedError";

type method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface GetDataType {
  method: method;
  endpoint: string;
  body?: object;
}

export const createDetailedError = (detail: any) => new DetailedError(detail);

export const request = async (
  { endpoint, body, method }: GetDataType,
  session_token?: string
): Promise<any> => {
  const url = new URL(`http://localhost:3001/${endpoint}`);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const options: any = {
    method,
    headers,
  };

  if (method === "POST") {
    if (endpoint === "auth") {
      options.body = JSON.stringify(body);
    } else {
      options.body = JSON.stringify({ ...body, session_token });
    }
  }

  const response = await fetch(url.toString(), options);
  if (endpoint === "logout") return;
  if (response.ok) {
    return await response.json();
  }
  throw createDetailedError(await response.json());
};

export default request;
