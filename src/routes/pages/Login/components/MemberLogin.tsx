import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-router-dom";

function MemberLogin() {

    return <>
        <Form>
            <FormGroup className="mb-3" controlId="loginEmail">
                <FormLabel>E-Posta</FormLabel>
                <FormControl type="email" placeholder="E-posta adresinizi girin" required />
            </FormGroup>

            <FormGroup className="mb-3" controlId="loginPassword">
                <FormLabel>Şifre</FormLabel>
                <FormControl type="password" placeholder="Şifrenizi girin" required />
            </FormGroup>

            <div className="text-end mb-3">
                <a href="#" className="text-decoration-none">Şifremi Unuttum?</a>
            </div>

            <Button variant="dark" type="submit" className="w-100">
                GİRİŞ YAP
            </Button>
        </Form>

    </>
}
export default MemberLogin;