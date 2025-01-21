import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      // Form datasını API'nin beklediği formata dönüştürüyoruz
      const dataForApi = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password2: formData.password, // Şifre doğrulama için aynı şifreyi gönderiyoruz
        api_key: "370718"  // api_key olarak değiştirildi
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
        <div className="text-center">
          <span className="text-muted">Zaten hesabınız var mı? </span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setKey("login");
            }}
            className="text-decoration-none"
          >
            Giriş Yap
          </a>
        </div>
      </form>
    </>
  );
}

export default Signup;