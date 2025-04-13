export interface LoginFormData {
    username?: string;
    email?: string;
    password: string;
}

export interface SignupFormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}
