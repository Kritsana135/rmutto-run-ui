import { gql } from '@apollo/client';
import { IProfile } from 'src/graphql/profile';

export const PROFILE_DOCUMENT = gql`
  query Me {
    me {
      firstName
      lastName
      phoneNumber
      address
      id
      email
      bio
    }
  }
`;

export interface ProfileRes {
  me: IProfile;
}
