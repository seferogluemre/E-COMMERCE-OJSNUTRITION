import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createAxiosInstance } from "../../../../services/api/axios";

function AccountInfo() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    marketing_consent: false
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const api = createAxiosInstance();
        const response = await api.get('/users/my-account');
        const data = response.data.data;
        setUserData(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Telefon numarası kontrolü
    const phoneNumber = formData.phone_number?.replace(/\D/g, ''); 
    if (phoneNumber && phoneNumber.length !== 11) {
      alert('Telefon numarası 11 haneli olmalıdır!');
      return;
    }

    try {
      const api = createAxiosInstance();
      await api.put('/users/my-account', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: phoneNumber, // Temizlenmiş telefon numarasını gönder
        marketing_consent: formData.marketing_consent
      });
      alert('Bilgileriniz başarıyla güncellendi!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Bilgileriniz güncellenirken bir hata oluştu!');
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="content-area">
      <h3 className="mb-4">Hesap Bilgilerim</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>*Ad</Form.Label>
          <Form.Control 
            type="text" 
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Soyad</Form.Label>
          <Form.Control 
            type="text" 
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
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
              value={formData.phone_number}
              onChange={handleInputChange}
              pattern="[0-9]{11}"
              placeholder="05XXXXXXXXX"
              maxLength={11}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            name="marketing_consent"
            checked={formData.marketing_consent}
            onChange={handleInputChange}
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
