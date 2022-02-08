export interface ChatModel {
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
  };
  reciver: {
    id: string;
    firstName: string;
    lastName: string;
  };
}


