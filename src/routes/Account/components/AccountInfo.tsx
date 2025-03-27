import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getUserData,
  updateUserData,
  User,
  changePassword,
  ChangePasswordData,
} from "../../../services/api/collections/Auth";
import { useToastStore } from "../../../store/toast/ToastStore";
import { BASE_URL } from "../../../services/api/collections/Auth";
interface Country {
  id: number;
  name: string;
}

interface CountriesResponse {
  status: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Country[];
  };
}

function AccountInfo() {
  const [userData, setUserData] = useState<User>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState<ChangePasswordData>({
    old_password: "",
    password: "",
    password2: "",
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    id: 223,
    name: "Turkey",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await getUserData();
      if (userResponse) {
        setUserData({
          first_name: userResponse.first_name || "",
          last_name: userResponse.last_name || "",
          phone_number: userResponse.phone_number || "",
          email: userResponse.email || "",
        });
      }
    };
    fetchUserData();
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/world/countries?limit=260`);
        const data: CountriesResponse = await response.json();
        if (data.status === "success" && Array.isArray(data.data.results)) {
          setCountries(data.data.results);
        } else {
          console.error("Invalid countries data format:", data);
          setCountries([]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = await updateUserData(userData);
      useToastStore
        .getState()
        .showToast("Hesap bilgileriniz başarıyla güncellendi", "success");
      console.log("Updated user data:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await changePassword(passwordForm);
      setShowPasswordModal(false);
      setPasswordForm({
        old_password: "",
        password: "",
        password2: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters from input
    let phoneNumber = e.target.value.replace(/\D/g, "");

    // Remove country code if user accidentally types it
    if (phoneNumber.startsWith("90")) {
      phoneNumber = phoneNumber.slice(2);
    }

    // Limit the length to 10 digits (standard phone number length without country code)
    phoneNumber = phoneNumber.slice(0, 10);

    setUserData({ ...userData, phone_number: phoneNumber });
  };

  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ad</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={(e) =>
              setUserData({ ...userData, first_name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Soyad</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={(e) =>
              setUserData({ ...userData, last_name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <div className="input-group">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="country-dropdown"
                className="d-flex align-items-center"
              >
                +90 {selectedCountry.name}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }}>
                {Array.isArray(countries) && countries.length > 0 ? (
                  countries.map((country) => (
                    <Dropdown.Item
                      key={country.id}
                      onClick={() => handleCountrySelect(country)}
                      className="d-flex align-items-center"
                    >
                      {country.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>Yükleniyor...</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              type="tel"
              name="phone_number"
              value={userData.phone_number || ""}
              onChange={handlePhoneNumberChange}
              placeholder="5XX XXX XX XX"
              maxLength={10}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            name="marketing_consent"
            label={
              <span>
                Kampanyalardan haberdar olmak için{" "}
                <a href="#" className="text-decoration-none">
                  Ticari Elektronik İleti Onayı
                </a>{" "}
                metnini okudum, onaylıyorum. Tarafımdan gönderilecek ticari
                elektronik iletileri almak istiyorum.
              </span>
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <div className="">
            <Button
              variant="outline-primary"
              onClick={() => setShowPasswordModal(true)}
            >
              <span>Şifre Değiştir</span>
            </Button>
          </div>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Kaydet
          </Button>
        </div>
      </Form>

      {/* Add Password Change Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Şifre Değiştir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Mevcut Şifre</Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.old_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    old_password: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Yeni Şifre</Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Yeni Şifre Tekrar</Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.password2}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    password2: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                İptal
              </Button>
              <Button variant="primary" type="submit">
                Şifre Değiştir
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AccountInfo;
