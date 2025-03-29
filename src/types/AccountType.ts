export interface Country {
    id: number;
    name: string;
}

export interface CountriesResponse {
    status: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Country[];
    };
}

export interface UserAddress {
    title: string;
    first_name: string;
    last_name: string;
    full_address: string;
    city: string;
    district: string;
    phone_number: string;
    id: string;
    region: { id: number; name: string };
    subregion: { id: number; name: string };
}

export interface UserAddress {
    title: string;
    first_name: string;
    last_name: string;
    full_address: string;
    city: string;
    district: string;
    id: string;
    phone_number: string;
    region: {
        name: string;
        id: number;
    };
    subregion: {
        name: string;
        id: number;
    };
}

export interface City {
    name: string;
    id: number;
}

export interface District {
    name: string;
    id: number;
}

export interface User {
    first_name: string;
    last_name: string;
    phone_number: string | null;
    email: string;
}
export interface LoginApiData {
    username: string;
    password: string;
}

export interface RegisterApiData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    api_key: string;
}

export interface ChangePasswordData {
    old_password: string;
    password: string;
    password2: string;
}