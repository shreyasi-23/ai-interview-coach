export type Message = {
  id: number;
  role: 'coach' | 'user';
  text: string;
  time: string;
};