import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { BiMapPin, BiCheckCircle, BiCheck, BiPlus } from "react-icons/bi";
import { createAxiosInstance } from "../../../services/api/axios";
import {
    type UserAddress,
    type City,
    type District,
    updateUserAddress,
    handleSubmitAddress
} from "../../../services/api/collections/Addresses";
import AddressForm from "./AddressForm";
import { AddressStepProps } from "../../../types/PaymentTypes";
const AddressStep: React.FC<AddressStepProps> = ({
    isLoggedIn,
    userAddresses,
    selectedAddress,
    setSelectedAddress,
    fetchUserAddresses,
}) => {
    const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
    const [newlyAddedAddressId, setNewlyAddedAddressId] = useState<string | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [formData, setFormData] = useState<UserAddress>({
        title: "",
        first_name: "",
        last_name: "",
        full_address: "",
        city: "",
        district: "",
        phone_number: "",
        id: "",
        region: { name: "", id: 0 },
        subregion: { name: "", id: 0 },
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const api = createAxiosInstance();
                const response = await api.get("/world/region", {
                    params: {
                        "country-name": "turkey",
                        limit: 82,
                        offset: 0,
                    },
                });
                setCities(response.data.data.results);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedCity) {
                setDistricts([]);
                return;
            }
            try {
                const api = createAxiosInstance();
                const response = await api.get("/world/subregion", {
                    params: {
                        "region-name": selectedCity,
                        limit: 30,
                        offset: 0,
                    },
                });
                setDistricts(response.data.data.results);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistricts();
    }, [selectedCity]);

    const handleAddressSelect = (address: UserAddress) => {
        setSelectedAddress(address);
    };

    const handleEditAddress = (address: UserAddress) => {
        setEditingAddress(address);
        setFormData({
            title: address.title,
            first_name: address.first_name,
            last_name: address.last_name,
            full_address: address.full_address,
            city: address.city,
            district: address.district,
            phone_number: address.phone_number,
            id: address.id || "",
            region: address.region || { name: "", id: 0 },
            subregion: address.subregion || { name: "", id: 0 },
        });
        setSelectedCity(address.city);
    };

    const handleNewAddressClick = () => {
        setShowNewAddressForm(true);
        setFormData({
            title: "",
            first_name: "",
            last_name: "",
            full_address: "",
            city: "",
            district: "",
            phone_number: "",
            id: "",
            region: { name: "", id: 0 },
            subregion: { name: "", id: 0 },
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingAddress) {
            // Update existing address
            try {
                const updatedAddress = {
                    ...editingAddress,
                    title: formData.title,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    full_address: formData.full_address,
                    city: formData.city,
                    district: formData.district,
                    phone_number: formData.phone_number,
                };

                await updateUserAddress(updatedAddress);
                await fetchUserAddresses();
                setEditingAddress(null);
            } catch (error) {
                console.error("Error updating address:", error);
            }
        } else {
            // Save address to localStorage for guests
            const addressData = {
                ...formData,
                full_address: formData.full_address,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_number: formData.phone_number,
            };

            localStorage.setItem("guestAddress", JSON.stringify(addressData));
            setSelectedAddress(addressData);
        }
    };

    const handleNewAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const addressData = {
                ...formData,
                full_address: formData.full_address,
            };

            await handleSubmitAddress(
                addressData,
                cities,
                districts,
                setShowNewAddressForm,
                userAddresses,
                setSelectedAddress,
                fetchUserAddresses,
            );

            await fetchUserAddresses();
            const addresses = userAddresses;
            if (addresses && addresses.length > 0) {
                setNewlyAddedAddressId(addresses[0].id);
                setTimeout(() => setNewlyAddedAddressId(null), 5000);
            }
            setShowNewAddressForm(false);
        } catch (error) {
            console.error("Error adding new address:", error);
        }
    };

    const renderAddressList = () => (
        <>
            {userAddresses.map((address) => (
                <Card
                    key={address.id}
                    className={`mb-3 cursor-pointer ${selectedAddress?.id === address.id ? "border-primary bg-light" : ""}`}
                    onClick={() => handleAddressSelect(address)}
                >
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <BiMapPin className="text-secondary" size={20} />
                                <span className="text-danger fw-medium">{address.title}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                {newlyAddedAddressId === address.id && (
                                    <div className="d-flex align-items-center text-success">
                                        <BiCheck size={20} />
                                        <small>Yeni Eklendi</small>
                                    </div>
                                )}
                                {selectedAddress?.id === address.id && <BiCheckCircle className="text-primary" size={20} />}
                                <Button
                                    variant="link"
                                    className="p-0 text-primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditAddress(address);
                                    }}
                                >
                                    Adresi Düzenle
                                </Button>
                            </div>
                        </div>
                        <div className="mt-2 text-secondary">
                            <p className="fw-medium mb-1">
                                {address.first_name} {address.last_name}
                            </p>
                            <p className="mb-1">{address.full_address}</p>
                            <p className="mb-1">
                                {address.city} / {address.district}
                            </p>
                            <p className="text-primary mb-0">{address.phone_number}</p>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <Button
                variant="link"
                className="text-primary p-0 d-flex align-items-center gap-2"
                onClick={handleNewAddressClick}
            >
                <BiPlus size={16} />
                <span>Yeni Adres Ekle</span>
            </Button>
        </>
    );

    if (isLoggedIn) {
        if (editingAddress) {
            return (
                <AddressForm
                    formData={formData}
                    setFormData={setFormData}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities}
                    districts={districts}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setEditingAddress(null)}
                    title="Adres Düzenle"
                />
            );
        }

        if (showNewAddressForm) {
            return (
                <AddressForm
                    formData={formData}
                    setFormData={setFormData}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities}
                    districts={districts}
                    onSubmit={handleNewAddressSubmit}
                    onCancel={() => setShowNewAddressForm(false)}
                    title="Yeni Adres Ekle"
                />
            );
        }

        return renderAddressList();
    }

    // Guest user form
    return (
        <AddressForm
            formData={formData}
            setFormData={setFormData}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            districts={districts}
            onSubmit={handleFormSubmit}
            onCancel={() => { }}
            title="Teslimat Adresi"
            submitButtonText="Adresi Kaydet ve Devam Et"
        />
    );
};

export default AddressStep