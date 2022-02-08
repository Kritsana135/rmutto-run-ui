import { gql } from '@apollo/client';
import { ChatModel } from './message';

export const SEND_MESSAGE_DOCUMENT = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      createdAt
      content
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

export interface SendMessageReq {
  input: {
    reciverId: string;
    content: string;
  };
}

export interface SendMessageRes {
  sendMessage: ChatModel;
}
