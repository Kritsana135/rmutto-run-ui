import { gql } from '@apollo/client';

export const APPROVAL_PROGRESS_DOCUMENT = gql`
  mutation ApproveProgress($input: ApproveTransactionInput!) {
    approveProgress(input: $input)
  }
`;

export interface ApprovalProgressReq {
  input: {
    id: string;
    isApprove: boolean;
    rejectReason: string | undefined;
  };
}
