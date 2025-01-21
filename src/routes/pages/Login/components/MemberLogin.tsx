import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Form verileri için interface tanımı
interface ILoginFormInputs {
  email: string;
  password: string;
}

// API'ye gönderilecek veriler için interface tanımı
interface ILoginApiData {
  username: string;
  password: string;
  api_key: string;
}

// Form validation şeması
const schema = yup.object().shape({
  email: yup.string().email("Geçerli bir email giriniz").required("Email alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

function MemberLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: ILoginFormInputs) => {
    try {
      const dataForApi: ILoginApiData = {
        username: formData.email,
        password: formData.password,
        api_key: "370718"
      };

      const response = await fetch("https://fe1111.projects.academy.onlyjs.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForApi),
      });

      const jsonResponse = await response.json();
      
      localStorage.setItem("access_token", jsonResponse.access_token);
      localStorage.setItem("refresh_token", jsonResponse.refresh_token);

      if (response.ok) {
        console.log("Giriş başarılı:", jsonResponse);
      } else {
        console.error("Giriş hatası:", jsonResponse);
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <FormGroup className="mb-3" controlId="loginEmail">
          <FormLabel>E-Posta</FormLabel>
          <FormControl
            type="email"
            placeholder="E-posta adresinizi girin"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </FormGroup>
        <FormGroup className="mb-3" controlId="loginPassword">
          <FormLabel>Şifre</FormLabel>
          <FormControl 
            type="password" 
            placeholder="Şifrenizi girin" 
            {...register("password")}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </FormGroup>

        <div className="text-end mb-3">
          <a href="#" className="text-decoration-none">
            Şifremi Unuttum?
          </a>
        </div>

        <Button variant="dark" type="submit" className="w-100">
          GİRİŞ YAP
        </Button>
      </form>
    </>
  );
}

export default MemberLogin;
