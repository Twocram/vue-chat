export type Message = {
  id: string;
  text: string;
  chatId: string;
  createdAt: string;
  userId: string;
};

export type Chat = {
  id: string;
  lastMessage: Message;
  name: string;
};
