import { gql } from '@apollo/client';
import { IProfile } from 'src/graphql/profile';

export const UPDATE_PROFILE_DOCUMENT = gql`
  mutation UpdateMe($input: UpdateProfileInput!) {
    updateMe(input: $input) {
      id
      email
      firstName
      lastName
      phoneNumber
      address
      bio
    }
  }
`;

export interface IUpdateMeReq {
    input: IProfile
}
