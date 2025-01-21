import { User } from "../../../assets/components/type/type";

const ACCESS_TOKEN_STORAGE_KEY = "access_token";
const USER_STORAGE_KEY="user";
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

const isAuthenticated=false;



function setAccessToken(access_token: string) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access_token);
}

function setRefreshToken(refresh_token: string) {
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
}

export function setTokenAndAuthUser(
  access_token: string,
  refresh_token: string
) {
  setAccessToken(access_token);
  setRefreshToken(refresh_token);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function setAuthUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getAuthUser() {
  return localStorage.getItem(USER_STORAGE_KEY);
}

export function removeTokenAndAuthUser() {
  removeAccessToken();
  removeRefreshToken();
}