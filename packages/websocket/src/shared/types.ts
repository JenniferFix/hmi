export type Tag = string;

export interface TagValue<T = unknown> {
  timestamp: number;
  value: T;
}

export type ServerMessage =
  | {
      type: "tag-update";
      tag: Tag;
      value: TagValue;
    }
  | {
      type: "subscription-ack";
      tag: Tag;
      success: boolean;
    };

export type ClientMessage =
  | {
      type: "set-tag";
      tag: Tag;
      value: unknown;
    }
  | {
      type: "subscribe";
      tag: Tag;
    }
  | {
      type: "unsubscribe";
      tag: Tag;
    };

export type Message = ServerMessage | ClientMessage;
