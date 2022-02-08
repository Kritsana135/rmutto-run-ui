import { gql } from '@apollo/client';
import { IPagination } from 'src/graphql/base';

export const PROGRESS_TRANSACTION_DOCUMENT = gql`
  query ProgressTransaction($input: ProgressTransactionInput) {
    progressTransaction(input: $input) {
      pagination {
        page
        perPage
        totalItems
      }
      payload {
        id
        km
        isApprove
        image
        createdAt
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export type Status = 'REJECT' | 'ALL' | 'PENDING' | 'APPROVE';

export interface IProgressTransactionRes {
  progressTransaction: {
    pagination: IPagination;
    payload: [
      {
        id: string;
        km: number;
        isApprove: boolean;
        image: string;
        createdAt: Date;
        user: {
          id: string;
          firstName: string;
          lastName: string;
        };
      }
    ];
  };
}

export interface IProgressTransactionReq {
  input: {
    page: number;
    perPage: number;
    displayName: string;
    status: Status;
  };
}
