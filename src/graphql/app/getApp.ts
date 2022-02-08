import { gql } from '@apollo/client';

export const APP_DOCUMENT = gql`
  query App($eventKey: String!) {
    app(eventKey: $eventKey) {
      goalKm
      startDate
      endDate
      eventName
    }
  }
`;

export interface IAppReq {
    eventKey: string
}
