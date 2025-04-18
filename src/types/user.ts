export interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    image_url: string | null;
    email_verified_at: string | Date | null;
    password: string;
    account_type: "free" | "premium" | "admin" | "artist";
    is_active: boolean;
    remember_token: string | null;
    created_at: string | Date;
    updated_at: string | Date;
}

// For user login (public facing)
export interface LoginUserDto {
    email?: string;
    username?: string;
    password: string;
}

// For user registration (public facing)
export interface RegisterUserDto {
    username: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

// For user profile updates (excluding sensitive fields)
export interface UpdateProfileDto {
    email?: string;
    phone?: string;
    image_url?: string | null;
}

// For admin user management
export interface AdminUpdateUserDto {
    username?: string;
    email?: string;
    phone?: string;
    account_type?: "free" | "premium" | "admin";
    is_active?: boolean;
}

// Safe user representation for API responses
export interface SafeUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    image_url: string | null;
    email_verified_at: string | Date | null;
    account_type: "free" | "premium" | "admin";
    is_active: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}

// For login responses (extends SafeUser with token)
export interface AuthUser extends SafeUser {
    user?: User;
    access_token: string;
    expires_at: string | Date;
    token_type: string;
}

// For password reset/change operations
export interface PasswordChangeDto {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}
