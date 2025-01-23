import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createAxiosInstance } from "../../../../services/api/axios";

function AccountInfo() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const api = createAxiosInstance();
        const response = await api.get("/users/my-account");
        const data = response.data.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>*Ad</Form.Label>
          <Form.Control type="text" name="first_name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Soyad</Form.Label>
          <Form.Control type="text" name="last_name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <img src="https://flagcdn.com/w20/tr.png" alt="TR" width="20" />
              +90
            </span>
            <Form.Control type="tel" name="phone_number" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Email</Form.Label>
          <Form.Control type="email" name="email" disabled />
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

        <Button variant="primary" size="lg" type="submit">
          Kaydet
        </Button>
      </Form>
    </div>
  );
}

export default AccountInfo;
