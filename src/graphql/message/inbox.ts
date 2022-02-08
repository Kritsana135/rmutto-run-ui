import { gql } from '@apollo/client';

export const INBOX_DOCUMENT = gql`
  query Inbox {
    inbox {
      user {
        id
        firstName
        lastName
      }
      lastMessage {
        sender {
          id
          firstName
          lastName
        }
        content
      }
    }
  }
`;

export interface InboxRes {
  inbox: [
    {
      user: {
        id: string;
        firstName: string;
        lastName: string;
      };
      lastMessage: {
        sender: {
          id: string;
          firstName: string;
          lastName: string;
        };
        content: string;
      };
    }
  ];
}
