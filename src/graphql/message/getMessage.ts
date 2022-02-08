import { gql } from '@apollo/client';
import { ChatModel } from './message';

export const CHAT_DOCUMENT = gql`
  query GetChat($otherId: String!) {
    getChat(otherId: $otherId) {
      content
      createdAt
      sender {
        id
        firstName
        lastName
      }
      reciver {
        id
        firstName
        lastName
      }
    }
  }
`;

export interface ChatRes {
  getChat: [ChatModel];
}