import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../../../services/api/collections/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../../../../components/ToastNotification/Notification";

// Form verileri için interface tanımı
interface ILoginFormInputs {
  email: string;
  password: string;
}

// Form validation şeması
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

interface MemberLoginProps {
  onLoginSuccess: () => void;
}

function MemberLogin({ onLoginSuccess }: MemberLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const [notification, setNotification] = useState({
    type: "success" as const,
    message: "Başarıyla giriş yapıldı",
    isVisible: false,
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (formData: ILoginFormInputs) => {
    try {
      setLoginError(null);
      const apiKey = "370718";
      const result = await login(formData.email, formData.password, apiKey);
      if (result.success) {
        localStorage.setItem(
          "NotificationMessage",
          JSON.stringify({
            type: "success",
            message: "Girişiniz yapıldı hoşgeldiniz",
            timestamp: new Date().getTime(),
          })
        );
        onLoginSuccess();
        navigate("/");
      } else {
        setLoginError(
          "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol ediniz."
        );
        console.error("Giriş hatası:", result.error);
      }
    } catch (error) {
      setLoginError("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      console.error("Bir hata oluştu:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && (
          <div className="alert alert-danger mb-3" role="alert">
            {loginError}
          </div>
        )}
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

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
    </>
  );
}

export default MemberLogin;
