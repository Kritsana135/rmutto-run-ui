import { gql } from '@apollo/client';

export const RESET_PASS_DOCUMENT = gql`
  mutation ResetPass($input: ResetPassInput!) {
    resetPass(input: $input)
  }
`;

export interface IResetPassInput {
  input: {
    newPass: string;
    token: string;
  };
}
