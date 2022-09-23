export interface User {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface UserRegister {
  name: string;
  eMail: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface DatabaseUser {
  name: string;
  email: string;
  image: string;
  id: string;
  password: string;
}
