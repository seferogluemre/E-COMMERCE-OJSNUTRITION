import { BASE_URL } from "../products";
import {
  setTokenAndAuthUser,
  setAuthUser,
  getAccessToken,
  removeTokenAndAuthUser,
} from "./storage";

interface LoginApiData {
  username: string;
  password: string;
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

export const login = async (
  email: string,
  password: string,
  apiKey: string
) => {
  try {
    // API'ye gönderilecek veriler
    const dataForApi: LoginApiData & { api_key: string } = {
      username: email,
      password: password,
      api_key: apiKey, // Üçüncü parametre olarak apiKey eklendi
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
      setTokenAndAuthUser(
        jsonResponse.access_token,
        jsonResponse.refresh_token
      );
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
      api_key: "370718",
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
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      setAuthUser(userData);
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
  localStorage.removeItem("user");
};
