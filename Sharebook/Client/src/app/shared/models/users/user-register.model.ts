export interface UserRegister {
  displayName: string;
  email: string;
  password?: string;
  birthday: {
    month: string,
    day: string,
    year: string,
  };
}
