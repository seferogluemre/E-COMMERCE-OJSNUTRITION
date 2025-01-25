import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../../../../services/api/collections/auth";
import { useState } from "react";
import Notification from "../../../../components/layout/ToastNotification/Notification";

// Form verileri için interface tanımı
interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}



// Form validation şeması
const schema = yup.object().shape({
  firstName: yup.string().required("Ad alanı zorunludur"),
  lastName: yup.string().required("Soyad alanı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email alanı zorunludur"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre alanı zorunludur"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const [notification, setNotification] = useState({
    type: "success" as const,
    message: "Başarıyla giriş yapıldı",
    isVisible: false,
  });



  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const onSubmit = async (formData: IFormInputs) => {
    try {
      const result = await registerUser(formData);
      if (result.success) {
        setAlert({
          type: "success",
          message: "Kullanıcı kaydı başarıyla oluşturuldu!",
        });
        console.log("Kayıt başarılı:", result.data);
      } else {
        setAlert({
          type: "danger",
          message: `Kayıt hatası: ${result.error}`,
        });
        console.error("Kayıt hatası:", result.error);
      }
    } catch (error) {
      setAlert({
        type: "danger",
        message: "Bir hata oluştu, lütfen tekrar deneyiniz.",
      });
      console.error("Bir hata oluştu:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3 mb-3">
          <div className="col-6">
            <FormGroup controlId="signupFirstName">
              <FormLabel>Ad</FormLabel>
              <FormControl
                type="text"
                {...register("firstName")}
                isInvalid={!!errors.firstName}
              />
              {errors.firstName && (
                <div className="text-danger">{errors.firstName.message}</div>
              )}
            </FormGroup>
          </div>
          <div className="col-6">
            <FormGroup controlId="signupLastName">
              <FormLabel>Soyad</FormLabel>
              <FormControl
                type="text"
                {...register("lastName")}
                isInvalid={!!errors.lastName}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName.message}</div>
              )}
            </FormGroup>
          </div>
        </div>

        <FormGroup className="mb-3" controlId="signupEmail">
          <FormLabel>E-Posta</FormLabel>
          <FormControl
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </FormGroup>

        <FormGroup className="mb-4" controlId="signupPassword">
          <FormLabel>Şifre</FormLabel>
          <FormControl
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </FormGroup>

        <Button variant="dark" type="submit" className="w-100 mb-3">
          ÜYE OL
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

export default Signup;
