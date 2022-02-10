import { gql } from '@apollo/client';

export const CHANGE_PASS_DOCUMENT = gql`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;

export interface IChangePassReq {
  newPassword: string;
  oldPassword: string;
}
