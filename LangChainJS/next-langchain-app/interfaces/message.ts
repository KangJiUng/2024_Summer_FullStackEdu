export interface IMessage {
  user_type: UserType;
  message: string;
  send_date: string;
}

export enum UserType {
  USER = "User",
  BOT = "Bot",
}

export interface ISendMessage {
  role: string;
  message: string;
}
