import { gql } from '@apollo/client';

export const CREATE_APP_DOCUMENT = gql`
  mutation CreateApp($input: AppInput!) {
    saveApp(input: $input) {
      id
      goalKm
      startDate
      endDate
      eventName
      isUsed
    }
  }
`;

export interface IAppInput {
  goalKm?: number;
  startDate?: Date;
  endDate?: Date;
  eventName: string;
  eventKey: string;
}

export interface IApp {
  id?: string;
  goalKm: number;
  startDate: Date;
  endDate: Date;
  eventName: string;
  isUsed?: boolean;
}

export interface IAppRes {
  app: IApp;
}
