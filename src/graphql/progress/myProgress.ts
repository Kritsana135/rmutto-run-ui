import { gql } from '@apollo/client';

export const MY_PROGRESS_DOCUMENT = gql`
  query MyProgress {
    myProgress {
      no
      km
    }
  }
`;

export interface IMyProgressRes {
  myProgress: {
    no: string;
    km: string;
  };
}
