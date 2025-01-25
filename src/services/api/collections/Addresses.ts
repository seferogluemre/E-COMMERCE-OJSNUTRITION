import { useToastStore } from "../../../store/toast/ToastStore";
import { createAxiosInstance } from "../axios";
import { getAccessToken } from "./storage";
import { BASE_URL } from "../../../routes/pages/Products/components/types";

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
        firstName: firstAddress.first_name,
        lastName: firstAddress.last_name,
        address: firstAddress.full_address,
        city: firstAddress.region?.name || "",
        district: firstAddress.subregion?.name || "",
        phone: firstAddress.phone_number,
        id: firstAddress.id,
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
  setShowForm: (show: boolean) => void,
  fetchAddresses: (
    setAddresses: (addresses: UserAddress[]) => void,
    setUserAddress: (address: UserAddress) => void,
    setShowForm: (show: boolean) => void
  ) => Promise<void>
) => {
  const formattedPhone = `+90${formData.phone.replace(/^\+90/, "")}`;
  const fullAddress = `${formData.address}, ${formData.district}, ${formData.city}`;

  const addressData = {
    title: formData.title,
    country_id: 226,
    region_id: cities.find((city: City) => city.name === formData.city)?.id,
    subregion_id: districts.find(
      (district: District) => district.name === formData.district
    )?.id,
    full_address: fullAddress,
    phone_number: formattedPhone,
    first_name: formData.firstName,
    last_name: formData.lastName,
  };

  try {
    const api = createAxiosInstance();
    const response = await api.post("/users/addresses", addressData);
    if (response.status === 200) {
      console.log("Adres başarıyla kaydedildi.");
      setShowForm(false);
      fetchAddresses(setAddresses, setUserAddress, setShowForm);
    } else {
      console.error("Adres kaydedilemedi:", response.data);
    }
  } catch (error) {
    console.error("Adres gönderilirken hata oluştu:", error);
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

      useToastStore.getState().showToast("Adres bilginiz silindi");
      alert("Adres bilginiz silindi");
    }
  } catch (error) {
    console.error("Ürün silme hatası:", error);
    useToastStore.getState().showToast("Adres silinirken bir hata oluştu");
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
      .showToast("Adres bilgileriniz başarıyla güncellendi");
    alert("Adres bilgileriniz başarıyla güncellendi");
    return response.data; // Başarılıysa dönen yanıtı döndük
  } catch (error) {
    useToastStore
      .getState()
      .showToast("Adres Bilgileriniz güncellenirken bir hata oluştu");
    console.error("Adres bilgileriniz GÜNNCELLENİRKEN HATA OLUŞTU", error);
    throw error;
  }
};
