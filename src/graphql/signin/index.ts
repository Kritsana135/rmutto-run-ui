import { gql } from '@apollo/client';

export const LOGIN_DOCUMENT = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      code
      message
      payload {
        accessToken
        userId
      }
    }
  }
`;

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginReq {
  input: ILoginInput;
}

export interface ILoginRes {
  login: {
    code: string;
    message: string;
    payload: {
      accessToken: string;
      userId: string;
    };
  };
}
