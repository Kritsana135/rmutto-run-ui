import { gql } from '@apollo/client';

export const LEADERBOARD_DOCUMENT = gql`
  query LeaderBoard($input: PaginationInput) {
    leaderBoard(input: $input) {
      pagination {
        page
        perPage
        totalItems
      }
      payload {
        displayName
        km
        id
        no
        bio
      }
    }
  }
`;

export interface LeaderboardReq {
  input: {
    page: number;
    perPage: number;
  };
}

export interface LeaderboardRes {
  leaderBoard: {
    pagination: {
      page: number;
      perPage: number;
      totalItems: number;
    };
    payload: [
      {
        displayName: string;
        km: number;
        id: string;
        no: number;
        bio: string;
      }
    ];
  };
}
