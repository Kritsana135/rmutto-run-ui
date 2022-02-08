export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  km: number;
  id: string;
  bio: string;
}

export interface IUserProps {
  user: IUser;
}
