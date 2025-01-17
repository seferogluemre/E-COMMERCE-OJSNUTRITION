import { Form, Button } from "react-bootstrap";

function AccountInfo() {
  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>*Ad</Form.Label>
          <Form.Control type="text" defaultValue="Gülşah" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Soyad</Form.Label>
          <Form.Control type="text" defaultValue="Seferoğlu" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <img src="https://flagcdn.com/w20/tr.png" alt="TR" width="20" />
              +90
            </span>
            <Form.Control type="tel" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue="gulsahseferoglu1@gmail.com"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
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
