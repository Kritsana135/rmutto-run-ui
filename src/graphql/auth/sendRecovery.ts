import { gql } from '@apollo/client';

export const SEND_RECOVERY_DOCUMENT = gql`
  mutation SendResetPassEmail($input: ResetPassEmailInput!) {
    sendResetPassEmail(input: $input)
  }
`;

export interface ISendRecoveryInput {
  email: string;
}

export interface ISendRecoveryReq {
  input: ISendRecoveryInput;
}
