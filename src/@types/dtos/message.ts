export interface Message {
  id: string;
  message: string;
  username?: string;
  color?: string;
  reply?: Message | null;
  time?: string;
  room_id?: string;
  type: 'user' | 'system' | string;
  socket_id?: string;
};