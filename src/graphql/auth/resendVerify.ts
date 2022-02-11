import { gql } from '@apollo/client';

export const RESEND_VERIFY_DOCUMENT = gql`
  mutation ResendVerify($email: String!) {
    resendVerify(email: $email)
  }
`;
