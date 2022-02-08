import { gql } from '@apollo/client';

export const UPLOAD_PROFILE_DOCUMENT = gql`
  mutation AddProfilePicture($picture: Upload!) {
    addProfilePicture(picture: $picture)
  }
`;
