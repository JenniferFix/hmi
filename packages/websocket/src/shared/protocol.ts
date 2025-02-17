import { Message } from "./types";

export const serializeMessage = (message: Message) => {
  return JSON.stringify(message);
};

export const deserializeMessage = (data: string) => {
  return JSON.parse(data);
};
