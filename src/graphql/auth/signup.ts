import { gql } from '@apollo/client';

export const SIGNUP_DOCUMENT = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      code
      message
      payload {
        id
      }
    }
  }
`;

export interface ISignupInputForm {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
}

export interface ISignUpRes {
  signup: {
    code: string;
    message: string;
    payload: {
      id: string;
    };
  };
}
