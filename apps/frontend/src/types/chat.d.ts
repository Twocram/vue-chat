export type Message = {
  id: string;
  text: string;
  chatId: string;
  createdAt: string;
  userId: string;
};

export type ChatListItem = {
  id: string;
  lastMessage: Message;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
  createdAt: Date;
};
