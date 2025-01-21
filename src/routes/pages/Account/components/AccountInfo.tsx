import { Form, Button } from "react-bootstrap";
import { getAuthUser } from "../../../../services/api/collections/storage";

function AccountInfo() {
  const userDataString = getAuthUser();
  const userData = userDataString ? JSON.parse(userDataString) : {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };

  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>*Ad</Form.Label>
          <Form.Control type="text" defaultValue={userData.first_name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Soyad</Form.Label>
          <Form.Control type="text" defaultValue={userData.last_name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <img src="https://flagcdn.com/w20/tr.png" alt="TR" width="20" />
              +90
            </span>
            <Form.Control type="tel" defaultValue={userData.phone} />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={userData.email}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            checked={userData.marketingConsent}
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

        <Button variant="primary" size="lg">
          Kaydet
        </Button>
      </Form>
    </div>
  );
}

export default AccountInfo;
