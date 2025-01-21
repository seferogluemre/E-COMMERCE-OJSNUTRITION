import { BASE_URL } from "../products";
import { setTokenAndAuthUser, setAuthUser, getAccessToken, removeTokenAndAuthUser } from "./storage";

interface LoginApiData {
  username: string;
  password: string;
  api_key: string;
}

interface RegisterApiData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  api_key: string;
}

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const login = async (email: string, password: string) => {
  try {
    const dataForApi: LoginApiData = {
      username: email,
      password: password,
      api_key: "370718"
    };

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForApi),
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      setTokenAndAuthUser(jsonResponse.access_token, jsonResponse.refresh_token);
      return { success: true, data: jsonResponse };
    } else {
      return { success: false, error: jsonResponse };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const register = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const dataForApi: RegisterApiData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      password2: formData.password,
      api_key: "370718"
    };

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForApi),
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      setAuthUser(jsonResponse.data);
      return { success: true, data: jsonResponse };
    } else {
      return { success: false, error: jsonResponse };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const logout = () => {
  removeTokenAndAuthUser();
};
