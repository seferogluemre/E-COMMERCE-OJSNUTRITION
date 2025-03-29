export interface ILoginFormInputs {
    email: string;
    password: string;
}

export interface MemberLoginProps {
    onLoginSuccess: () => void;
}

export interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}