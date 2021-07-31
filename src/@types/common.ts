export interface ISelectValue {
  label: string;
  value: string;
}

export interface IPerson {
  id: string | null;
  image?: string;
  name: string | null;
  blameCount: number;
}

export interface IBlameMessage {
  id: string;
  personId: string;
  imagesUrl: string[];
  message: string;
  voiceUrl: string | null;
}

export type PersonData = Omit<IPerson, "id">;
export type BlameMessageData = Omit<IBlameMessage, "id">;
