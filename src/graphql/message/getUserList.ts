import { gql } from '@apollo/client';
import { ChatModel } from './message';

export const LIST_OF_USER_DOCUMENT = gql`
  query GetListOfUser($name: String) {
    getListOfUser(name: $name) {
      id
      createdAt
      firstName
      lastName
      bio
    }
  }
`;

export interface ListOfUserRes {
  getListOfUser: [
    {
      id: string;
      createdAt: string;
      firstName: string;
      lastName: string;
      bio: string;
    }
  ];
}
