let accessToken = "";
let userId = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const setUserId = (id: string) => {
  userId = id;
};

export const getAccessToken = () => accessToken;
export const getUserId = () => userId;
