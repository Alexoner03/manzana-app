export interface LoginResponse {
    user:  User;
    token: string;
}

export interface User {
    id:       number;
    name:     string;
    lastName: string;
    email:    string;
    isAdmin:  boolean;
    foods:    Food[];
}

export interface Food {
    id:          number;
    description: string;
    name:        string;
    imagePath:   string;
}

export interface ErrorResponse {
    message: string;
    errors:  Errors;
}

export interface Errors {
    name?:     string[];
    lastName?: string[];
    email?:    string[];
    password?: string[];
}
