import { createAxiosInstance } from "../axios";
import { BASE_URL } from "../../../routes/pages/Products/components/types";
import {
  setTokenAndAuthUser,
  setAuthUser,
  getAccessToken,
  getRefreshToken,
  removeTokenAndAuthUser,
} from "./storage";
import { useToastStore } from "../../../store/toast/ToastStore";

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

export interface User {
  first_name: string;
  last_name: string;
  phone_number: string | null;
  email: string;
}

export interface ChangePasswordData {
  old_password: string;
  password: string;
  password2: string;
}

export const isAuthenticated = () => {
  return !!getAccessToken();
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
      const userData: User = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: null,
      };
      setAuthUser(userData);
      useToastStore.getState().showToast("Kayıt işlemi başarıyla tamamlandı");
      return { success: true, data: jsonResponse };
    } else {
      useToastStore.getState().showToast("Kayıt işlemi başarısız oldu");
      return { success: false, error: jsonResponse };
    }
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Bir hata oluştu, lütfen tekrar deneyin");
    return { success: false, error };
  }
};

export const getUserData = async () => {
  try {
    const api = createAxiosInstance();
    const response = await api.get("/users/my-account");
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
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
      api_key: apiKey,
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
      const userResponse = await getUserData();
      setAuthUser(userResponse);
      useToastStore.getState().showToast("Giriş başarıyla yapıldı");
      return { success: true, data: jsonResponse };
    } else {
      useToastStore.getState().showToast("Giriş başarısız oldu");
      return { success: false, error: jsonResponse };
    }
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Bir hata oluştu, lütfen tekrar deneyin");
    return { success: false, error };
  }
};

export const updateUserData = async (userData: User) => {
  try {
    const api = createAxiosInstance();

    // Telefon numarasına +90 ekliyoruz
    const updatedPhoneNumber = `+90${userData.phone_number?.replace(
      /^\+90/,
      ""
    )}`;

    const response = await api.put(
      "/users/my-account",
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone_number: updatedPhoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    useToastStore.getState().showToast("Bilgileriniz başarıyla güncellendi");
    return response.data; // Başarılıysa dönen yanıtı döndük
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Bilgileriniz güncellenirken bir hata oluştu");
    console.error("KULLANICI GÜNNCELLENİRKEN HATA OLUŞTU", error);
    throw error;
  }
};

export const logout = () => {
  removeTokenAndAuthUser();
  localStorage.removeItem("user");
  useToastStore.getState().showToast("Başarıyla çıkış yapıldı");
  window.location.href = "/";
};

// Token yenileme fonksiyonu
export const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("Refresh token bulunamadı");
    }

    const response = await fetch(`${BASE_URL}/auth/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Token yenilenemedi");
    }
    const data = await response.json();

    // Yeni token'ları kaydet
    setTokenAndAuthUser(data.access_token, data.refresh_token);

    return data.access_token;
  } catch (error) {
    console.error("Token yenileme hatası:", error);
    useToastStore
      .getState()
      .showToast("Oturumunuz süresi doldu tekrar giriş yapınız", "error");
    removeTokenAndAuthUser();
    window.location.href = "/login";
    throw error;
  }
};

// Token kontrolü için utility fonksiyon
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // Unix timestamp'i milisaniyeye çevir
    return Date.now() >= expirationTime;
  } catch {
    return true;
  }
};
export { getAccessToken } from "./storage";

export const changePassword = async (passwordData: ChangePasswordData) => {
  try {
    const api = createAxiosInstance();
    const response = await api.post("/users/change-password", passwordData);
    useToastStore
      .getState()
      .showToast("Şifreniz başarıyla güncellendi", "success");
    return response.data;
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Şifre değiştirme işlemi başarısız oldu", "error");
    throw error;
  }
};
