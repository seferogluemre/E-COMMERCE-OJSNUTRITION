import { createAxiosInstance } from "../axios";

export const fetchAddresses = async (
  navigate: any,
  setAddresses: (addresses: any[]) => void,
  setUserAddress: (address: any) => void,
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
        phone: firstAddress.phone_number
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

export const handleSubmitAddress = async (formData, cities, districts, navigate, setShowForm, fetchAddresses) => {
  const formattedPhone = `+90${formData.phone.replace(/^\+90/, "")}`;
  const fullAddress = `${formData.address}, ${formData.district}, ${formData.city}`;

  const addressData = {
    title: formData.title,
    country_id: 226,
    region_id: cities.find(city => city.name === formData.city)?.id,
    subregion_id: districts.find(district => district.name === formData.district)?.id,
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
      fetchAddresses(navigate);
    } else {
      console.error("Adres kaydedilemedi:", response.data);
    }
  } catch (error) {
    console.error("Adres gönderilirken hata oluştu:", error);
  }
}; 