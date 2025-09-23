import axios from "axios";
import type { AxiosError } from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/",
});

const getToken = async () => {
  let token = await window.localStorage.getItem("access_token");
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  return token;
};

const refreshAccessToken = async () => {
  try {
    let refresh = (await window.localStorage.getItem("refresh_token")) || null;
    if (refresh && refresh.startsWith('"') && refresh.endsWith('"')) {
      refresh = refresh.slice(1, -1);
    }
    const response = await request.post("auth/token/refresh/", {
      refresh,
    });
    const newAccessToken = response.data.tokens.access;
    await window.localStorage.setItem("access_token", newAccessToken);
    console.log("Đổi token");
    console.log(response);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token", error);
  }
};
const requestWithTokenRefresh = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  data?: Record<string, unknown> | FormData,
  options: Record<string, unknown> = {}
) => {
  let token = await getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    return await request({
      method,
      url: path,
      data,
      // headers,
      ...options,
    });
  } catch (error) {
    const err = error as AxiosError;
    if (err.response && err.response.status === 403) {
      token = await refreshAccessToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        return await request({
          method,
          url: path,
          data,
          headers,
          ...options,
        });
      }
    }
    throw error;
  }
};

export const getMethod = (
  path: string,
  options: Record<string, unknown> = {}
) => {
  return requestWithTokenRefresh("GET", path, undefined, options).then(
    (response) => response.data
  );
};

export const postMethod = (
  path: string,
  data: Record<string, unknown> | FormData,
  options: Record<string, unknown> = {}
) => {
  return requestWithTokenRefresh("POST", path, data, options).then(
    (response) => response.data
  );
};

export const putMethod = (
  path: string,
  data: Record<string, unknown>,
  options: Record<string, unknown> = {}
) => {
  return requestWithTokenRefresh("PUT", path, data, options).then(
    (response) => response.data
  );
};

export const deleteMethod = (
  path: string,
  options: Record<string, unknown> = {}
) => {
  return requestWithTokenRefresh("DELETE", path, undefined, options).then(
    (response) => response.data
  );
};

export default request;
