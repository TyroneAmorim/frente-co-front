export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  birthDate: Date;
  cpf: string;
  addressText: string;
  city: string;
  state: string;
}
