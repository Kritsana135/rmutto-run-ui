import { gql } from '@apollo/client';

export const UPDATE_PROGRESS_DOCUMENT = gql`
  mutation UploadProgress($km: Float!, $picture: Upload!) {
    uploadProgress(km: $km, picture: $picture) {
      code
      message
    }
  }
`;

export interface IUpdateProgressRes {
  uploadProgress: {
    code: string;
    message: string;
  };
}
