import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUserData, updateUserData, User } from "../../../../services/api/collections/auth";

function AccountInfo() {
  const [userData, setUserData] = useState<User>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
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
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = await updateUserData(userData);
      console.log("Updated user data:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>*Ad</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Soyad</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <img src="https://flagcdn.com/w20/tr.png" alt="TR" width="20" />
              +90
            </span>
            <Form.Control
              type="tel"
              name="phone_number"
              value={userData.phone_number || ""}
              onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Email</Form.Label>
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

        <Button variant="primary" onClick={handleSubmit} size="lg" type="submit">
          Kaydet
        </Button>
      </Form>
    </div>
  );
}

export default AccountInfo;