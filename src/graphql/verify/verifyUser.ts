import { gql } from '@apollo/client';

export const VERIFY_USER_DOCUMENT = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      code
      message
    }
  }
`;

export interface IVerifyUserReq {
  token: string;
}

export interface IVerifyUserRes {
  verifyUser: {
    code: string;
    message: string;
  };
}
