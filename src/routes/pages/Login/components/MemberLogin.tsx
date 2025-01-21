import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-router-dom";

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IApiData {
  email: string;
  password: string;
  api_key: string;
}

function MemberLogin() {

  const onSubmit = async (formData: IFormInputs) => {
    try {
      const dataForApi: IApiData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password2: formData.password,
        api_key: "370718"
      };

      const response = await fetch("https://fe1111.projects.academy.onlyjs.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForApi),
      });

      const jsonResponse = await response.json();
      
      if (response.ok) {
        // Başarılı kayıt işlemi
        console.log("Kayıt başarılı:", jsonResponse);
      } else {
        // Hata durumu
        console.error("Kayıt hatası:", jsonResponse);
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };




  return (
    <>
      <Form onSubmit={onSubmit(onSubmit)}> 
        <FormGroup className="mb-3" controlId="loginEmail">
          <FormLabel>E-Posta</FormLabel>
          <FormControl
            type="email"
            placeholder="E-posta adresinizi girin"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="loginPassword">
          <FormLabel>Şifre</FormLabel>
          <FormControl type="password" placeholder="Şifrenizi girin" required />
        </FormGroup>

        <div className="text-end mb-3">
          <a href="#" className="text-decoration-none">
            Şifremi Unuttum?
          </a>
        </div>

        <Button variant="dark" type="submit" className="w-100">
          GİRİŞ YAP
        </Button>
      </Form>
    </>
  );
}
export default MemberLogin;
