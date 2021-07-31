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
