
import React from "react";
import { Form, Row, Col, Button, InputGroup, Image } from "react-bootstrap";
import { AddressFormProps } from "../../../types/PaymentTypes";

const AddressForm: React.FC<AddressFormProps> = ({
    formData,
    setFormData,
    selectedCity,
    setSelectedCity,
    cities,
    districts,
    onSubmit,
    onCancel,
    title,
    submitButtonText = "Kaydet"
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;
        setSelectedCity(selectedCity);
        setFormData((prev) => ({
            ...prev,
            city: selectedCity,
        }));
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict = e.target.value;
        setFormData((prev) => ({
            ...prev,
            district: selectedDistrict,
        }));
    };

    return (
        <Form onSubmit={onSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">{title}</h5>
                {onCancel && (
                    <Button variant="link" className="text-secondary p-0" onClick={onCancel}>
                        Vazgeç
                    </Button>
                )}
            </div>

            <Form.Group className="mb-3">
                <Form.Label>Adres Başlığı *</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Ad *</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Soyad *</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Telefon Numarası *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <Image src="/tr-flag.png" width={20} height={15} alt="TR" />
                        +90
                    </InputGroup.Text>
                    <Form.Control
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="5XX XXX XX XX"
                        required
                    />
                </InputGroup>
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>İl *</Form.Label>
                        <Form.Select name="city" value={selectedCity} onChange={handleCityChange} required>
                            <option value="">İl Seçiniz</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>İlçe *</Form.Label>
                        <Form.Select name="district" value={formData.district} onChange={handleDistrictChange} required>
                            <option value="">İlçe Seçiniz</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Tam Adres *</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="full_address"
                    value={formData.full_address}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
                {submitButtonText}
            </Button>
        </Form>
    );
};

export default AddressForm;