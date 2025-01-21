import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../../../services/api/products";
import { setAuthUser } from "../../../../services/api/collections/storage";

// Form verileri için interface tanımı
interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// API'ye gönderilecek veriler için interface tanımı
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password2: string;
  api_key: string;
}

// Form validation şeması
const schema = yup.object().shape({
  firstName: yup.string().required("Ad alanı zorunludur"),
  lastName: yup.string().required("Soyad alanı zorunludur"),
  email: yup.string().email("Geçerli bir email giriniz").required("Email alanı zorunludur"),
  password: yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Şifre alanı zorunludur"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: IFormInputs) => {
    try {
      const dataForApi: User = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password2: formData.password,
        api_key: "370718"
      };

      const response = await fetch(BASE_URL+"/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForApi),
      });

      const jsonResponse = await response.json();
      if (response.ok) {
        setAuthUser(jsonResponse.data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3 mb-3">
          <div className="col-6">
            <FormGroup controlId="registerFirstName">
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
            <FormGroup controlId="registerLastName">
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

        <FormGroup className="mb-3" controlId="registerEmail">
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

        <FormGroup className="mb-4" controlId="registerPassword">
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
    </>
  );
}

export default Signup;