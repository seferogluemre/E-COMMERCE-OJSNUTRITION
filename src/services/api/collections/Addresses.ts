import { useToastStore } from "../../../store/toast/ToastStore";
import { createAxiosInstance } from "../axios";
import { BASE_URL } from "./Auth";
import { getAccessToken } from "./storage";

export interface UserAddress {
  title: string;
  first_name: string;
  last_name: string;
  full_address: string;
  city: string;
  district: string;
  id: string;
  phone_number: string;
  region: {
    name: string;
    id: number;
  };
  subregion: {
    name: string;
    id: number;
  };
}

export interface City {
  name: string;
  id: number;
}

export interface District {
  name: string;
  id: number;
}

export const fetchAddresses = async (
  setAddresses: (addresses: UserAddress[]) => void,
  setUserAddress: (address: UserAddress) => void,
  setShowForm: (show: boolean) => void
) => {
  try {
    const api = createAxiosInstance();
    const response = await api.get("/users/addresses", {
      params: {
        limit: 10,
        offset: 0,
      },
    });
    setAddresses(response.data.data.results);
    if (response.data.data.results.length > 0) {
      const firstAddress = response.data.data.results[0];
      setUserAddress({
        title: firstAddress.title,
        first_name: firstAddress.first_name,
        last_name: firstAddress.last_name,
        full_address: firstAddress.full_address,
        city: firstAddress.region?.name || "",
        district: firstAddress.subregion?.name || "",
        phone_number: firstAddress.phone_number,
        id: firstAddress.id,
        region: firstAddress.region || { name: "", id: 0 },
        subregion: firstAddress.subregion || { name: "", id: 0 }
      });
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    setShowForm(true);
  }
};

export const handleSubmitAddress = async (
  formData: UserAddress,
  cities: City[],
  districts: District[],
  setShowForm?: (show: boolean) => void,
  setAddresses?: (addresses: UserAddress[]) => void,
  setUserAddress?: (address: UserAddress) => void,
  fetchAddresses?: (
    setAddresses?: (addresses: UserAddress[]) => void,
    setUserAddress?: (address: UserAddress) => void,
    setShowForm?: (show: boolean) => void
  ) => Promise<void>
) => {
  const formattedPhone = `+90${formData.phone_number.replace(/^\+90/, "")}`;
  const fullAddress = formData.full_address;

  const addressData = {
    title: formData.title,
    country_id: 226,
    region_id: cities.find((city: City) => city.name === formData.city)?.id,
    subregion_id: districts.find(
      (district: District) => district.name === formData.district
    )?.id,
    full_address: fullAddress,
    phone_number: formattedPhone,
    first_name: formData.first_name,
    last_name: formData.last_name,
  };
  console.log("Gönderilen adres bilgisi");

  try {
    const api = createAxiosInstance();
    const response = await api.post("/users/addresses", addressData);
    if (response.status === 200) {
      console.log("Adres başarıyla kaydedildi.");
      if (setShowForm) setShowForm(false);
      if (fetchAddresses && setAddresses && setUserAddress && setShowForm) {
        fetchAddresses(setAddresses, setUserAddress, setShowForm);
      }
    } else {
      console.error("Adres kaydedilemedi:", response.data);
      useToastStore.getState().showToast("Hesabınıza adres eklendi", "success");
    }
  } catch (error) {
    console.error("Adres gönderilirken hata oluştu:", error);
    useToastStore
      .getState()
      .showToast("Adres oluşturulamadı Alanları kontrol ediniz", "error");
  }
};

export const deleteAddress = async (addressId: string) => {
  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      const response = await fetch(`${BASE_URL}/users/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Adres bilginiz silinemedi");
      }

      useToastStore.getState().showToast("Adres bilginiz silindi", "success");
    }
  } catch (error) {
    console.error("Ürün silme hatası:", error);
    useToastStore
      .getState()
      .showToast("Adres silinirken bir hata oluştu", "error");
  }
};

// Adres güncelleme
export const updateUserAddress = async (addressData: UserAddress) => {
  try {
    const api = createAxiosInstance();

    const newAddressData = {
      title: addressData.title,
      country_id: 226,
      region_id: addressData.region.id,
      subregion_id: addressData.subregion.id,
      full_address: addressData.full_address,
      phone_number: addressData.phone_number,
      first_name: addressData.first_name,
      last_name: addressData.last_name,
    };

    const response = await api.put(
      `/users/addresses/${addressData.id}`,
      newAddressData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    useToastStore
      .getState()
      .showToast("Adres bilgileriniz başarıyla güncellendi", "success");
    return response.data;
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Adres Bilgileriniz güncellenirken bir hata oluştu", "error");
    console.error("Adres bilgileriniz güncellenirken hata oluştu", error);
    throw error;
  }
};
