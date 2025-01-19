import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-router-dom";

function Signup() {
    const [key, setKey] = useState<string>('login');

    return <>
        <Form>
            <div className="row g-3 mb-3">
                <div className="col-6">
                    <FormGroup controlId="registerFirstName">
                        <FormLabel>Ad</FormLabel>
                        <FormControl type="text" placeholder="" required />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup controlId="registerLastName">
                        <FormLabel>Soyad</FormLabel>
                        <FormControl type="text" placeholder="" required />
                    </FormGroup>
                </div>
            </div>

            <FormGroup className="mb-3" controlId="registerEmail">
                <FormLabel>E-Posta</FormLabel>
                <FormControl type="email" placeholder="" required />
            </FormGroup>

            <FormGroup className="mb-4" controlId="registerPassword">
                <FormLabel>Şifre</FormLabel>
                <FormControl type="password" placeholder="" required />
            </FormGroup>

            <Button variant="dark" type="submit" className="w-100 mb-3">
                ÜYE OL
            </Button>
            <div className="text-center">
                <span className="text-muted">Zaten hesabınız var mı? </span>
                <a href="#" onClick={(e) => { e.preventDefault(); setKey('login'); }} className="text-decoration-none">
                    Giriş Yap
                </a>
            </div>
        </Form>

    </>
}

export default Signup;